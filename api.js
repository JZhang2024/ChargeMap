import config from './config.js';

const { GOOGLE_MAPS_API_KEY } = config;

const fetchChargingStations = (latitude, longitude) => {
  const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const params = new URLSearchParams({
    key: GOOGLE_MAPS_API_KEY,
    location: `${latitude},${longitude}`,
    radius: "10000",
    keyword: "electric vehicle charging station",
  });

  const url = `${baseUrl}?${params.toString()}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching data:', error));
};

export { fetchChargingStations };