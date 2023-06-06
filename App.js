import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location'

export default function App() {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showUserLocation, setShowUserLocation] = useState(true)
    const [inputText, setInputText] = useState('');

    const keyboardDismiss = () => {
      setInputText('')
      Keyboard.dismiss()
    }

    const handleInput = () => {
      console.log(inputText)
      Keyboard.dismiss()
    };

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
      <>
        <StatusBar style='auto'/>
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
            />
            <View style={styles.overlay}>
              <View style={styles.searchBar}>
                <TextInput style={styles.searchText}
                  autoComplete="street-address" 
                  placeholder='O quê vamos descobrir hoje?'
                  placeholderTextColor={"gray"}
                  returnKeyType="search"
                  value={inputText}
                  onChangeText={text => setInputText(text)}
                  onSubmitEditing={handleInput}
                />
                <TouchableOpacity style={styles.searchIcon} onPress={handleInput}>
                  <FontAwesome name="search" size={22} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <SafeAreaView/>
      </>
    );
  }

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
  searchBar: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    backgroundColor: 'white',
    borderRadius: 30,
  },
  searchText: {
    flex: 8,
    marginLeft: 20,
    width:"90%", 
    height:"100%"
  },
  searchIcon: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  }
});