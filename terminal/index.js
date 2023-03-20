const
    readlineSync = require('readline-sync'),
    generateFakeNumbers = require("generate-fake-numbers"),
    fs = require("fs");

require("colors");

base();
var count = dmdCount();
base();
var pays = dmdPays();
base();

new generateFakeNumbers({
    max: count, // 0/Undefined = Infinie
    pays: pays, //  Allpays: france, qatar, belgique, suisse, royaumeuni, paysbas, allemagne, espagne
}, (err, numbers) => {
    if (err) return console.log(err);
    // base();
    const i = (numbers?.i || 0);
    numbers = numbers?.numbers;
    if (numbers) {
        console.log(`[` + `${i}`.cyan + `/` + `${count}`.cyan + `]` + ` ${numbers}`.cyan);
        fs.appendFileSync("./result.txt", `${numbers}\n`, "utf-8")
    }
})

function base() {
    console.clear();
    console.log(`
 ██████╗ ███████╗███╗   ██╗███╗   ██╗██╗   ██╗███╗   ███╗
██╔════╝ ██╔════╝████╗  ██║████╗  ██║██║   ██║████╗ ████║
██║  ███╗█████╗  ██╔██╗ ██║██╔██╗ ██║██║   ██║██╔████╔██║
██║   ██║██╔══╝  ██║╚██╗██║██║╚██╗██║██║   ██║██║╚██╔╝██║
╚██████╔╝███████╗██║ ╚████║██║ ╚████║╚██████╔╝██║ ╚═╝ ██║
 ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝
                                                             
███╗   ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ██╗███████╗  
████╗  ██║██╔═══██╗██║   ██║██╔════╝██╔══██╗██║██╔════╝  
██╔██╗ ██║██║   ██║██║   ██║█████╗  ██████╔╝██║█████╗    
██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║██╔══╝    
██║ ╚████║╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██║██║       
╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝╚═╝       
`);
    console.log("-> ".cyan + "By " + "https://github.com/zougataga".cyan);
    if (count) console.log('-> '.cyan + 'Nombre de numéro a générer: ' + `${count === 0 ? "Infinie" : count}`.cyan);
    if (pays) console.log('-> '.cyan + 'Pays: ' + pays.map(e => `${e}`.cyan).join(", ").cyan);
    console.log("—————————————————————————————————————————————————————————————————")
}

function loading(obj, code) {
    let
        h = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
        i = 0,
        loader = setInterval(() => {
            i = (i > 3) ? 0 : i;
            console.clear();
            base();
            console.log(`${h[i]} `.cyan + obj?.text || "Aucune text");
            i++;
        }, 100);
    setTimeout(() => {
        console.clear();
        code();
        clearInterval(loader);
    }, obj?.time || 10000);
}


function dmdCount() {
    return (function getCount() {
        const count = readlineSync.question('-> '.cyan + 'Nombre de numero a generer (0 = Infinie) : ').trim();
        if (count != 0 && !Number(count)) {
            base();
            console.log('-> '.cyan + 'Merci d\'entrer un nombre valide !');
            return getCount()
        };
        return Number(count) || 0
    })()
}

function dmdPays() {
    return (function getPays() {
        let pays = readlineSync.question('-> '.cyan + 'Allpays: ' + 'france, '.cyan + 'qatar, '.cyan + 'belgique, '.cyan + 'suisse, '.cyan + 'royaumeuni, '.cyan + 'paysbas, '.cyan + 'allemagne, '.cyan + 'espagne'.cyan + '\nPays (suivie par ,) : ').trim();
        pays = pays?.split(",");
        if (!pays.length || pays.length == 0) {
            base();
            console.log('-> '.cyan + 'Merci d\'entrer une liste de pays valide !');
            return getPays()
        };
        return pays.map(e => e.trim().toLowerCase())
    })()
}