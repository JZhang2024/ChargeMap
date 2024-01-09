const fetchChargingStations = () => {
    return fetch('https://api.example.com/charging-stations')
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching data:', error));
  };
  
  export { fetchChargingStations };