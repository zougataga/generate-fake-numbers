const meteo = require('../assets/function/meteo.js');
module.exports = {
    path: "/",
    go: async (req, res) => {
        const html = "<script>window.location.href = '/meteo'</script>";
        return res.send(html)
    }
}