const { fetchChargingStations } = require('../api.js');

fetchChargingStations()
  .then(data => console.log(data))
  .catch(error => console.error(error));