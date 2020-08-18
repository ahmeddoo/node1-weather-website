const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=f9792f9dea027bf6a3ffff235b3cd2cf&units=metric";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.message) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          body.main.temp +
          " degrees out. The weather is " +
          body.weather[0].description
      );
    }
  });
};

module.exports = forecast;
