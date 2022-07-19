const weather = require("weather-js");
const search = async (query) => {
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
};
module.exports = search;
