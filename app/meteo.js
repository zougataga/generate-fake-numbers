const meteo = require('../assets/function/meteo.js');
module.exports = {
    path: "/meteo",
    go: async (req, res) => {
        return meteo(req, res);
    }
}