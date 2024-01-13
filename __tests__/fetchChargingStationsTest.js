import { fetchChargingStations } from '../api.js';

fetchChargingStations(40.7128, -74.0060)
  .then(data => console.log(data))
  .catch(error => console.error(error));