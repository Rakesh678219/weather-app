/** @format */
const request = require("request");
const geocode = require("./geocode");
const forecast = (place, callback) => {
  geocode(place, (error, data) => {
    if (error) {
      callback("Error", error);
    } else {
      const coordinates = data;
      const { lat, lon, address: location } = coordinates ?? {}; // es6-object destructuring
      //   const lon = coordinates?.lon;
      //   const lat = coordinates?.lat;
      //   const location = coordinates.address;
      const url = `http://api.weatherstack.com/current?access_key=d2bdebd33a19b34cbee8636d319d5bb1&query=${lat},${lon}&units=m`;

      request({ url, json: true }, (error, { body }) => {
        if (error) {
          callback("Unable to connect to weatherstack", undefined);
        } else if (body.error) {
          callback(
            "Please specify a valid location identifier using the query parameter.",
            undefined
          );
        } else {
          const data = body.current;
          callback(
            undefined,
            `${location} -> ${data.weather_descriptions?.[0]}, it is currently ${data.temperature} degrees out there feels like ${data.feelslike} degrees`,
            location
          );
        }
      });
    }
  });
};
module.exports = forecast;
