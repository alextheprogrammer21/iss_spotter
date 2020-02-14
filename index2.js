let { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didnt work: ", error.message);
});
