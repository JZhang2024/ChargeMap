import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import { fetchChargingStations } from '../api';
import { GOOGLE_MAPS_API_KEY } from '@env'

Geocoder.init(GOOGLE_MAPS_API_KEY);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

const ChargingMap = () => {
  const [chargingStations, setChargingStations] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchChargingStations().then((data) => setChargingStations(data));
  }, []);

  const handleSearch = () => {
    Geocoder.from(search)
      .then((json) => {
        var location = json.results[0].geometry.location;
        setRegion({
          ...region,
          latitude: location.lat,
          longitude: location.lng,
        });
      })
      .catch((error) => console.warn(error));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        {/* {chargingStations.map((station, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: station.latitude, longitude: station.longitude }}
          />
        ))} */}
      </MapView>
      <SearchBar
        containerStyle={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

export default ChargingMap;