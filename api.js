const { GOOGLE_MAPS_KEY } = require('./config');

const fetchChargingStations = () => {
  const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const params = new URLSearchParams({
    key: GOOGLE_MAPS_KEY,
    location: "40.7128,-74.0060",
    radius: "10000",
    keyword: "electric vehicle charging station",
  });

  const url = `${baseUrl}?${params.toString()}`;
  console.log(url);
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching data:', error));
};

module.exports = { fetchChargingStations };