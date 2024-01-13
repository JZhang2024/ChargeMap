import React, { useState } from 'react';
import ChargingMap from './components/ChargingMap';
import FindNearbyChargersButton from './components/FindNearbyChargers';
import { fetchChargingStations } from './api';

const App = () => {
  const [places, setPlaces] = useState([]);

  const findChargers = async () => {
    // Use geolocation API to find nearby places of type 'charging station'
    const newPlaces = await fetchChargingStations(40.7128, -74.0060);
    setPlaces(newPlaces);
  };

  return (
    <div>
      <FindNearbyChargersButton onClick={findChargers} />
      <ChargingMap places={places} />
    </div>
  );
};

export default App;