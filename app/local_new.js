const search = require('../assets/function/search.js');
module.exports = {
    path: "/local/:loc",
    go: async (req, res) => {
        const r = await search(req.params.loc);
        return res.send(r);
    }
}