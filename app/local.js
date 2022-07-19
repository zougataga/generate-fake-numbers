const auto = require('../assets/function/auto.js');
module.exports = {
    path: "/local",
    go: async (req, res) => {
        const ip = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const r = await auto(ip);
        return res.send(r);
    }
}