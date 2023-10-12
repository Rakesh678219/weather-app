/** @format */
const request = require("request");
const geoCode = (address, callback) => {
  const API_KEY = "zG8fSZbygM1Yfwnu47lY7Qj5ZlKnKYUa";
  const newUrl = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
    address
  )}.json?key=${API_KEY}`;

  request({ url: newUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Check your API key or Network", undefined);
    } else if (body?.errorText) {
      callback(body?.errorText, undefined);
    } else if (body?.results?.[0]?.position === undefined) {
      callback("Enter proper location", undefined);
    } else {
      const lon = body?.results?.[0]?.position?.lon;
      const lat = body?.results?.[0]?.position?.lat;  
      const address = body?.results[0].address.freeformAddress;
      callback(undefined, {
        lon,
        lat,
        address,
      });
    }
  });
};
module.exports = geoCode;
