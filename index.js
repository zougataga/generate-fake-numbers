// llx404 on github
const { Telegraf, Markup } = require('telegraf');
const db = require("quick.db");
const config = require("./config.json");
const client = new Telegraf(config.token);
const fs = require("fs");
const fetch = require("cross-fetch");

 process.on("unhandledRejection", err => { console.log(err); })

const PORT = 80;
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + '/views'));

app.get("/", async (req, res) => {
    res.send(`https://github.com/llx404`)
});

app.get(`/accepted/:id/:count`, async (req, res) => {
    const obj = req.params;
    let lg = "";
    const lang = await db.get(`lang_${obj.id}`);
    if (!lang || lang === "fr") lg = require("./views/lang/fr.js");
    else lg = require("./views/lang/en.js");
    if (!db.get(`paymentcour_${obj.id}`)) return res.json({ err: { error: lg.msg.error } });
    await db.add(`balance_${obj.id}`, obj.count);
    await db.delete(`paymentcour_${obj.id}`);
    await client.telegram.sendMessage(obj.id, lg.msg.succes);
    res.render(`index.ejs`, {
        code: lg.msg.accepted
    });
    const msg = `
    LOGS - RECHARGEMENT

👤 Nom d'utilisateur: <b>@${user.username}</b>
🗂 ID: <b><u>${user.id}</u></b>
⭐ Nomnre de crédits recharger: ${count}
`;
    await logs(msg)
});

client.start(async (msg) => {
    const user = msg.update.message.from;
    let lg = "";
    const lang = await db.get(`lang_${user.id}`);
    if (!lang || lang === "fr") lg = require("./views/lang/fr.js");
    else lg = require("./views/lang/en.js");
    let shop = "";
    config.shop.forEach(e => {
        shop += `${e.emoji} ► ${e.name}\n`;
    });
    const btn = Markup.inlineKeyboard([
        [Markup.button.callback(`💳 ${lg.button.recharge}`, "recharge"), Markup.button.callback(`🛍️ ${lg.button.shop}`, "shop")],
        [Markup.button.callback(`👤 ${lg.button.user}`, "user"), Markup.button.callback(`⚙️ ${lg.button.lang}`, "langue")],
    ]);
    return msg.replyWithHTML(await lg.start(user, shop), btn);
});

client.on("callback_query", async interaction => {
    const data = interaction.update.callback_query.data;
    const user = interaction.update.callback_query.from;
    let lg = "";
    const lang = await db.get(`lang_${user.id}`);
    if (!lang || lang === "fr") lg = require("./views/lang/fr.js");
    else lg = require("./views/lang/en.js");
    config.shop.forEach(async e => {
        if (data === e.name) {
            const balance = await db.get(`balance_${user.id}`) || 0.00;
            const btn = [
                [{ text: `🏠 ${lg.button.retour}`, callback_data: 'retour' }],
            ];
            if (balance < e.price) return await interaction.editMessageText(await lg.achat({ nobalance: true, e: e, user: user }), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
            let stock = [];
            let ln = "";
            fs.readFileSync(`./views/shop/${e.name}.txt`, 'utf-8').split(/\r?\n/).forEach((line) => {
                if (!line) return ln += "1";
                stock.push(line);
            });
            if (ln === "1") return await interaction.editMessageText(await lg.achat({ nostock: true, e: e, user: user }), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
            const result = stock[0];
            await interaction.editMessageText(await lg.achat({ succes: true, e: e, user: user, result: result }), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
            stock.splice(0, 1);
            const msgg = `
    LOGS - PAYEMENT SHOP
        
👤 Nom d'utilisateur: @${user.username}
🗂 ID: ${user.id}
⭐ Achat: ${e.name}
⭐ Result: ${result}
`;
            await logs(msgg)
            await db.add(`achat_${user.id}`, 1);
            await db.subtract(`balance_${user.id}`, e.price);
            return fs.writeFileSync(`./views/shop/${e.name}.txt`, stock.join("\n"), function (err) { if (err) throw new Error(err); });
        }
    });

    if (data === "user") {
        const balance = await db.get(`balance_${user.id}`) || 0.00;
        const achat = await db.get(`achat_${user.id}`) || 0;
        const btn = [
            [{ text: `🏠 ${lg.button.retour}`, callback_data: 'retour' }],
        ];
        return interaction.editMessageText(await lg.user(user, balance.toLocaleString(), achat), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
    } else if (data === "recharge") {
        if (db.get(`paymentcour_${user.id}`)) await db.delete(`paymentcour_${user.id}`);
        const btn = [
            [{ text: `🏠 ${lg.button.retour}`, callback_data: 'retour' }],
        ];
        await interaction.editMessageText(await lg.recharge({ prix: true }), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
        client.on('message', async (msg) => {
            const count = msg.message.text;
            if (count) {
                if (!Number(count)) return interaction.editMessageText(await lg.recharge({ error: true }), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
                const options = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "X-CC-Api-Key": config.coinbase.apikey,
                        "X-CC-Version": "2018-03-22",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: 'Payment: ' + user.id,
                        description: 'Autoshop Stampede',
                        redirect_url: `${config.domain}/accepted/${user.id}/${count}`,
                        local_price: {
                            amount: count,
                            currency: "USD"
                        },
                        pricing_type: "fixed_price",
                    }),
                };
                const response = await fetch(`https://api.commerce.coinbase.com/charges/`, options);
                const data = await response.json();
                await db.set(`paymentcour_${user.id}`, true)
                setTimeout(() => {
                    db.delete(`paymentcour_${user.id}`)
                }, 60000 * 10);
                await interaction.editMessageText(await lg.recharge({ succes: true, url: data.data.hosted_url }), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
            }
        });
    } else if (data === "shop") {
        const balance = await db.get(`balance_${user.id}`) || 0.00;
        let shopBtn = [];
        config.shop.forEach(e => {
            shopBtn.push({ text: `${e.emoji} ${e.name}`, callback_data: e.name })
        });
        const btn = [
            shopBtn.slice(0, shopBtn.length < 3 ? shopBtn.length : 3),
            shopBtn.slice(3, shopBtn.length < 6 ? shopBtn.length : 6),
            shopBtn.slice(6, shopBtn.length < 9 ? shopBtn.length : 9),
            shopBtn.slice(9, shopBtn.length < 12 ? shopBtn.length : 12),
            shopBtn.slice(12, shopBtn.length < 15 ? shopBtn.length : 15),
            [{ text: `🏠 ${lg.button.retour}`, callback_data: 'retour' }],
        ];
        return interaction.editMessageText(await lg.shop(user, balance.toLocaleString()), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
    } else if (data === "retour") {
        let shop = "";
        config.shop.forEach(e => {
            shop += `${e.emoji} ► ${e.name} (${e.price}€)\n`;
        });
        const btn = [
            [{ text: `💳 ${lg.button.recharge}`, callback_data: 'recharge' }, { text: `🛍️ ${lg.button.shop}`, callback_data: 'shop' }],
            [{ text: `👤 ${lg.button.user}`, callback_data: 'user' }, { text: `⚙️ ${lg.button.lang}`, callback_data: 'langue' }],
        ];
        return interaction.editMessageText(await lg.start(user, shop), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
    } else if (data === "langue") {
        const btn = [
            [{ text: `English`, callback_data: 'english' }, { text: `Français`, callback_data: 'français' }],
            [{ text: `🏠 ${lg.button.retour}`, callback_data: 'retour' }],
        ];
        return interaction.editMessageText(`⚙️ ${lg.msg.lang}`, { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
    } else if (data === "english") {
        await db.set(`lang_${user.id}`, "en");
        lg = require("./views/lang/en.js")
        let shop = "";
        config.shop.forEach(e => {
            shop += `${e.emoji} ► ${e.name} (${e.price}€)\n`;
        });
        const btn = [
            [{ text: `💳 ${lg.button.recharge}`, callback_data: 'recharge' }, { text: `🛍️ ${lg.button.shop}`, callback_data: 'shop' }],
            [{ text: `👤 ${lg.button.user}`, callback_data: 'user' }, { text: `⚙️ ${lg.button.lang}`, callback_data: 'langue' }],
        ];
        return interaction.editMessageText(await lg.start(user, shop), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
    } else if (data === "français") {
        await db.set(`lang_${user.id}`, "fr");
        lg = require("./views/lang/fr.js")
        let shop = "";
        config.shop.forEach(e => {
            shop += `${e.emoji} ► ${e.name} (${e.price}€)\n`;
        });
        const btn = [
            [{ text: `💳 ${lg.button.recharge}`, callback_data: 'recharge' }, { text: `🛍️ ${lg.button.shop}`, callback_data: 'shop' }],
            [{ text: `👤 ${lg.button.user}`, callback_data: 'user' }, { text: `⚙️ ${lg.button.lang}`, callback_data: 'langue' }],
        ];
        return interaction.editMessageText(await lg.start(user, shop), { parse_mode: 'HTML', reply_markup: { inline_keyboard: btn } });
    }
});


client.launch().then(e => {
    console.log(`BOT ON (${client.botInfo.username})`);
}).catch(() => {
    throw new Error('BOT_TOKEN introuvable ou invalide !')
});
app.listen(PORT, () => {
    console.log(`API ON`);
});

async function logs(msg) {
    const id = config.logs;
    await client.telegram.sendMessage(id, msg);
}