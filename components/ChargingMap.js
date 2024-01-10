import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import SearchBar from 'react-native-elements';

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
