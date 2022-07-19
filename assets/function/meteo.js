const axios = require("axios");
const { domain } = require("../../config.json");
const meteo = async (req, res) => {
    let ll = "";
    if (req.params.p) ll = req.params.p;
    const e = (await axios.get(`${domain}/local/${ll}`)).data;
    console.log(e);
    if (e.error) return res.status(404).json({ error: "Localisation invalide !" });
    let a = JSON.parse(JSON.stringify(e.result));
    let r;
    let fond;
    a.slice(0, 1).forEach(d => { r = d });
    let tempe = r.current.temperature;
    if (tempe <= 0) fond = "https://www.allibert-trekking.com/iconographie/72/PA1_le-grand-nord-en-hiver.jpg"
    if (tempe >= 10) fond = "https://la1ere.francetvinfo.fr/image/NRcy3CplM-yhBCho5KNuLjhceyY/600x400/outremer/2022/03/03/62203a9d549dd_plaine-des-cafres-1875893.jpg"
    if (tempe >= 20) fond = "https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
    if (tempe >= 30) fond = "https://teva-italie.fr/wp-content/uploads/2021/11/1c3eed762512870327c27d804677a08b.jpeg"
    if (tempe <= 30) fond = "https://teva-italie.fr/wp-content/uploads/2021/11/1c3eed762512870327c27d804677a08b.jpeg"
    return res.render("index.ejs", {
        l: r.location.name,
        t: tempe,
        j: r.current.day.replace("Monday", "Lundi").replace("Tuesday", "Mardi").replace("Wednesday", "Mercredi").replace("Thursday", "Jeudi").replace("Friday", "Vendredi").replace("Saturday", "Samedi").replace("Sunday", "Dimanche"),
        d: r.current.date,
        v: r.current.windspeed,
        h: r.current.humidity,
        dg: r.location.degreetype,
        i: r.current.imageUrl,
        p: r.current.feelslike,
        f: fond
    });
};
module.exports = meteo;
