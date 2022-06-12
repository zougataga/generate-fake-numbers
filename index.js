const PORT = process.env.PORT || 8080
//process.on("unhandledRejection", (a) => { if (a.message) return undefined })
const domain = "http://localhost:8080"
const express = require("express")
const app = express()
const cors = require('cors')
const axios = require("axios")
const { search, auto } = require("./all.js")
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(express.static(__dirname + '/views'));
app.get("/meteo", async (req, res) => {meteo(req,res)})
app.get("/meteo/:p", async (req, res) => {meteo(req,res)})

app.get("/local/:loc", async (req, res) => { res.send(await search(req.params.loc)) });
app.get("/local", async (req, res) => {
    let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    let r = await auto("88.126.100.145")
    res.send(r);
});
app.all('*', (req, res) => {meteo(req,res)});
app.listen(PORT, () => {
    console.log(`=> [${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getUTCSeconds() + ":"}] - API ON`);
})
function meteo(req,res) {
    try {
        let ll = ""
        if(req.params.p) ll = req.params.p
        axios.get(`http://localhost:8080/local/${ll}`)
        .then(e=> {
            let a = JSON.parse(JSON.stringify(e.data.result))
            let r;
            let fond;
            a.slice(0, 1).forEach(d => {r = d});       
            let tempe = r.current.temperature;
            if(tempe <= 0) fond = "https://www.allibert-trekking.com/iconographie/72/PA1_le-grand-nord-en-hiver.jpg"
            if(tempe >= 0) fond = "https://www.allibert-trekking.com/iconographie/72/PA1_le-grand-nord-en-hiver.jpg"
            if(tempe >= 10) fond = "https://la1ere.francetvinfo.fr/image/NRcy3CplM-yhBCho5KNuLjhceyY/600x400/outremer/2022/03/03/62203a9d549dd_plaine-des-cafres-1875893.jpg"
            if(tempe >= 20) fond = "https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
            if(tempe >= 30) fond = "https://teva-italie.fr/wp-content/uploads/2021/11/1c3eed762512870327c27d804677a08b.jpeg"
            return res.render("index.ejs",{
                l: r.location.name,
                t: tempe,
                j: r.current.day.replace("Monday","Lundi").replace("Tuesday","Mardi").replace("Wednesday","Mercredi").replace("Thursday","Jeudi").replace("Friday","Vendredi").replace("Saturday","Samedi").replace("Sunday","Dimanche"),
                d: r.current.date,
                v: r.current.windspeed,
                h: r.current.humidity,
                dg: r.location.degreetype,
                i: r.current.imageUrl,
                p: r.current.feelslike,
                f: fond,
                dm: domain
            });
        })
    } catch(err) {
        return res.status(404).json({error: "Location invalide !"})
    }
}