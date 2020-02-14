let request = require('request-promise-native');

let fetchMyIP = () => {
  let URL = 'https://api.ipify.org?format=json';

  return request(URL);
  // request(URL, (error, response, body) => {

  //   if (error) {
  //     callback(error);
  //     return;
  //   }

  //   if (response.statusCode !== 200) {
  //     const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  //     callback(null);
  //     return;
  //   }

  //   // console.log(`Response code: ${response.statusCode}`);

  //   let IP = JSON.parse(body)[Object.keys(JSON.parse(body))];
  //   // console.log(IP);
  //   return IP;
  // });

};


const fetchCoordsByIP = function(body) {

      let IP = JSON.parse(body)[Object.keys(JSON.parse(body))];
      let geoURL = 'https://ipgeolocation.io/ip-location/' + IP;
      return request(geoURL);

};


let fetchISSFlyOverTimes = (body) => {

  let longitude = JSON.parse(body);
  let latitude = JSON.parse(body);
  // console.log(latitude, longitude);
  let nasaURL = 'http://api.open-notify.org/iss-pass.json?lat=' + latitude + '&lon=' + longitude;

  return request(nasaURL);
  // request(nasaURL, (error, response, body) => {

  //   if (response.statusCode !== 200) {
  //     const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
  //     callback(Error(msg), null);
  //     return;
  //   }

  //   let timeObj = JSON.parse(body).response;
  //   let keys = (Object.keys(timeObj));

  //   for (const elements of Object.keys(timeObj)) {

  //     console.log(`It will come at ${timeObj[elements].risetime} and will last for ${timeObj[elements].duration}`);

  //   }
  // });
};


let nextISSTimesForMyLocation = (body) => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
}
module.exports = { nextISSTimesForMyLocation };