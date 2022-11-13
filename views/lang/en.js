const config = require("../../config.json");

module.exports = {
  button: {
    recharge: "Reload my account",
    retour: "Return to the menu",
    user: "Mon compte",
    shop: "Store",
    lang: "Change language",
    annuler: "Cancel payment",
  },

  start: async (user, shop) => {
    return `
🚀 Welcome to our <b>AutoShop</b>, @${user.username}
💡 In case of problems with the bot please contact the bot owner.
            
<b><u>💣 Our range of services :</u></b>
             
${shop}
📬 | Bot created by ${config.credits.author}
🎖 | Autoshop channel: ${config.credits.authoshopcanal}
`;
  },

  user: async (user, balance, achat) => {
    return `
👤 User name: <b>@${user.username}</b>
🗂 Your ID: <b><u>${user.id}</u></b>
💰 Your Libra: <b>${balance}€</b>
🛍 Number of purchases: <b>${achat}</b>
`
  },

  shop: async (user, balance) => {
    return `
🛍 Here is our blind, @${user.username}
💳 Your balance is currently: <b>${balance}.00€</b>
`
  },

  recharge: async (obj) => {
    if (obj.prix === true) return `
How many credits do you want to top up on your account? 
Value of a single credit = 1€.

Type the amount on your keyboard.`;
    if (obj.succes === true) return `🌐 Complete the payment by going to: ${obj.url}\n\n📍 If you encounter a problem, please contact the bot owner!`;
    if (obj.error === true) return `❌ Please enter a valid number!`
  },

  achat: async (obj) => {
    if (obj.succes === true) return `✅ Thank you for your purchase !\n🗂 Your <b>${obj.e.name}: <u>${obj.result}</u></b>`;
    if (obj.nostock === true) return `❌ Sorry but there is no more <b>${obj.e.name}</b> in stock.`;
    if (obj.nobalance === true) return `❌ Sorry but you don't have enough money to buy: <b>${obj.e.name}</b>`;
  },


  msg: {
    accepted: `<h2>Thank you for your payment</h2><p>Your credits on the bot were well added</p>`,
    error: "You are not allowed to do that !",
    succes: "✅ Thank you for your purchase all your corners have been added !",
    lang: "Please choose the language you want."
  }
}