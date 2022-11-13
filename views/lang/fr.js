const config = require("../../config.json");

module.exports = {
  button: {
    recharge: "Recharger mon compte",
    retour: "Revenir au menu",
    user: "Mon compte",
    shop: "Boutique",
    lang: "Changer de langue",
    annuler: "Annuler le payment",
  },

  start: async (user, shop) => {
    return `
🚀 Bienvenue sur notre <b>AutoShop</b>, @${user.username}
💡 En cas de problème avec le bot veuillez contacter le propriétaire du bot.
            
<b><u>💣 Nôtre gamme de services :</u></b>
             
${shop}
📬 | Bot crée par ${config.credits.author}
🎖 | Autoshop canal: ${config.credits.authoshopcanal}
`;
  },

  user: async (user, balance, achat) => {
    return `
👤 Nom d'utilisateur: <b>@${user.username}</b>
🗂 Votre ID: <b><u>${user.id}</u></b>
💰 Votre Balance: <b>${balance}€</b>
🛍 Nombre d'achats: <b>${achat}</b>
`
  },

  shop: async (user, balance) => {
    return `
🛍 Voici notre store, @${user.username}
💳 Votre solde est actuellement de: <b>${balance}.00€</b>
`
  },

  recharge: async (obj) => {
    if (obj.prix === true) return `
Combien de crédits souhaitez vous rechargez sur votre compte? 
Valeur d'un seul crédit = 1€
    
Tapez le montant sur votre clavier`;
    if (obj.succes === true) return `🌐 Compléter le paiement en vous rendant sur: ${obj.url}\n\n📍 Si vous rencontrez un problème, veuillez contacter le propriétaire du bot !`;
    if (obj.error === true) return `❌ Merci d'indiquer un nombre valide !`
  },

  achat: async (obj) => {
    if (obj.succes === true) return `✅ Merci pour votre achat !\n🗂 Votre <b>${obj.e.name}: <u>${obj.result}</u></b>`;
    if (obj.nostock === true) return `❌ Désoler mais il ne reste plus de <b>${obj.e.name}</b> en stock.`;
    if (obj.nobalance === true) return `❌ Désoler mais vous n'avez pas asser d'argent pour acheter: <b>${obj.e.name}</b>`;
  },


  msg: {
    accepted: `<h2>Merci pour votre payment</h2><p>Vos credits sur le bot ont bien était ajouter</p>`,
    error: "Vous n'avez pas le droit de faire ça !",
    succes: "✅ Merci pour votre achat tous vos coins ont été ajoutés !",
    lang: "Veuillez choisir la langue que vous désirez."
  }
}