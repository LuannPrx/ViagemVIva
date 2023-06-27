import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator, SafeAreaView} from 'react-native';
import { useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import ItemsBox from '../components/ItemsBox';
import InterestMarker from '../components/InterestMarker';
import SearchBar from '../components/SearchBar';
import LoadingModal from '../components/LoadingModal';
import { museumData } from '../data';
import useStore from '../dataStore';


function MapScreen() {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [awaitingAPI, setAwaitingAPI] = useState(false)
    const [showUserLocation, setShowUserLocation] = useState(true)
    const [currentState, setCurrentState] = useState("")
    const interestPoints = museumData
    const setData = useStore((state)=>state.setPlaceData)

    const keyboardDismiss = () => {
      Keyboard.dismiss()
    };

    const buttonPress = (payload) => {
      setCurrentState(payload)
    }

    useEffect(() => {
      setData(interestPoints);
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
            provider="google"
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
                }}
            style={styles.map}
            showsUserLocation={showUserLocation}
            >
              {showMarkers}
            </MapView>
            <View style={styles.overlay}>
              <SearchBar currentState={currentState} changeState={buttonPress}/>
            </View>
            <ItemsBox buttonPress={buttonPress} setLoad={setAwaitingAPI}/>
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
    position: "absolute",
    top: 50,
    height: 50,
    alignItems: "center"
  },
});