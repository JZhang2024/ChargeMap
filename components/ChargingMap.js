import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import SearchBar from 'react-native-elements';
import '../config.js';

const {GOOGLE_MAPS_API_KEY} = config;

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
    top: 20,
    left: 0,
    right: 0,
    barTintColor:"transparent",
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5
  },
});

const ChargingMap = ({ places }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Place markers on the map
    // This is a placeholder, replace with your actual implementation
    placeMarkers(places);
  }, [places]);

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
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
          />
        ))}
      </MapView>
      <SearchBar
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={styles.searchBar}
        inputContainerStyle={{backgroundColor: 'white'}}
        placeholderTextColor={'#g5g5g5'}
        onChangeText={setSearch}
        value={search}
        onSubmitEditing={handleSearch}
        placeholder="Enter Address Here..."
      />
    </View>
  );
};

export default ChargingMap;
