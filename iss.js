const request = require('request');

let fetchMyIP = (callback) => {
  let URL = 'https://api.ipify.org?format=json';
  request(URL, (error, response, body) => {

    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(null);
      return;
    }

    // console.log(`Response code: ${response.statusCode}`);

    let IP = JSON.parse(body)[Object.keys(JSON.parse(body))];
    callback(IP, fetchISSFlyOverTimes);
  });

};

let fetchCoordsByIP = (IP, callback2) => {
  let geoURL = 'https://ipvigilante.com/' + IP;
  request(geoURL, (error, response, body) => {

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let longitude = JSON.parse(body).data.longitude;
    let latitude = JSON.parse(body).data.latitude;

    // console.log(longitude, latitude);

    callback2(longitude, latitude);
  });
};

let fetchISSFlyOverTimes = (longitude, latitude, callback3) => {
  let nasaURL = 'http://api.open-notify.org/iss-pass.json?lat=' + latitude + '&lon=' + longitude;
  request(nasaURL, (error, response, body) => {

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let timeObj = JSON.parse(body).response;
    let keys = (Object.keys(timeObj));

    for (const elements of Object.keys(timeObj)) {

      console.log(`It will come at ${timeObj[elements].risetime} and will last for ${timeObj[elements].duration}`);

    }
  });
};

// let fetchEverything = (callback4, finObj) => {

  fetchMyIP(fetchCoordsByIP);

// }

// module.exports = { fetchEverything };

