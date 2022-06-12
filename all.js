const weather = require("weather-js");
const axios = require("axios")
async function search(query) {
    const meteo = new Promise((resolve, reject) => {
        weather.find({ search: query, degreeType: "C" }, function (err, result) {
          if (err) {
            resolve({
              error: err.toString(),
              result: null,
            });
          } else {
            resolve({
              error: null,
              result: result,
            });
          }
        });
      });
      return meteo;
}

async function auto(ip) {
    let info = (await axios.get(`https://ipapi.co/${ip}/json/`)).data;
    return await search(info.city);
}

module.exports = {
    search,
    auto
}