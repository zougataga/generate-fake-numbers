const meteo = require('../assets/function/meteo.js');
module.exports = {
    path: "/meteo/:p",
    go: async (req, res) => {
        return meteo(req, res);
    }
}