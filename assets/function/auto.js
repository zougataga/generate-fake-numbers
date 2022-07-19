const axios = require('axios');
const search = require('./search.js');
const auto = async (ip) => {
    const info = (await axios.get(`https://ipapi.co/${ip}/json/`)).data;
    return await search(info.city);
};
module.exports = auto;
