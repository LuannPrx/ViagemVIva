import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect, useRef} from 'react';
import {GOOGLE_API_KEY} from '@env'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location'
import ItemsBox from '../components/ItemsBox';
import MyLocationButton from '../components/MyLocationButton';
import InterestMarker from '../components/InterestMarker';
import SearchBar from '../components/SearchBar';
import LoadingModal from '../components/LoadingModal';
import useStore from '../dataStore';
import AsyncStorage from "@react-native-async-storage/async-storage";

function MapScreen() {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showUserLocation, setShowUserLocation] = useState(true)
    const currentState = useStore((state) => state.currentState)
    const awaitingAPI = useStore((state) => state.modalLoading)
    const interestPoints = useStore((state) => state.placeData)
    const setCurrentCity = useStore((state) => state.setCurrentCity)
    const setFavorites = useStore((state)=>state.setFavorites)
    const setMapRef = useStore((state) => state.setMapRef)
    const destination = useStore((state) => state.destination)
    const setDestination =useStore((state) => state.setDestination)
    const setUserLocation = useStore((state) => state.setUserLocation)
    const mapRef = useRef(MapView); 

    const keyboardDismiss = () => {
      Keyboard.dismiss()
    };

    const onRoutePress = () => {
      setDestination(false)
    }

    useEffect(() => {
      setMapRef(mapRef)
      const getFavoriteData = async () => {
        try {
          const retrievedData = await AsyncStorage.getItem('favorites')
          if (retrievedData !== null){
            setFavorites(JSON.parse(retrievedData))
          }
        } catch (e) {
          console.log(e)
        }
      }
      getFavoriteData();
    }, []);

    const renderMarkers = (interestPoints) => {
      return interestPoints.map((point)=>(
        <InterestMarker
          key={point.id}
          id={point.id}
          location={point.location}
          name={point.name}
          description={point.description}
          image={point.img}
          rating={point.rating}
          type={currentState}
        />
      ));
    };

    const showMarkers = renderMarkers(interestPoints);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permissão negada", "Para utilizar as funcionalidades do mapa, o aplicativo precisa utilizar a sua localização");
          setShowUserLocation(false)
          setLocation({latitude: -3.7329694, longitude: -38.5265801})
          setIsLoading(false)
          return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        setUserLocation(coords)
        const userCity = await Location.reverseGeocodeAsync(coords)
        setCurrentCity(userCity[0].city+" "+userCity[0].region)
        setIsLoading(false)
      })();
    }, []);

    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
          <ActivityIndicator size="large" color="blue"/>
        </View>
      );
    }
    
    return (
      <TouchableWithoutFeedback onPress={keyboardDismiss}>
        <View style={styles.container}>
          <MapView
          ref={mapRef}
          provider="google"
          initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
              }}
          style={styles.map}
          showsUserLocation={showUserLocation}
          showsMyLocationButton={false}
          >
            {interestPoints.length>0 ? showMarkers : null}
            {destination ? 
              <MapViewDirections
                origin={location}
                destination={destination}
                apikey={GOOGLE_API_KEY}
                strokeWidth={6}
                strokeColor="#47ADFf"
                tappable={true}
                onPress={onRoutePress}
              />
              : null
            }
          </MapView>
          <View style={styles.overlay}>
            <SearchBar currentState={currentState} />
            <MyLocationButton mapRef={mapRef} latitude={location.latitude} longitude={location.longitude}/>
          </View>
          <ItemsBox />
          <LoadingModal visible={awaitingAPI} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex:1
  },
  overlay: {
    width: "100%",
    height: 50,
    position: "absolute",
    top: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
});