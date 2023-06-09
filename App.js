import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location'

function Button({color, title, icon}) {
  return(
    <TouchableOpacity 
      style={[styles.itemsBoxButton, {backgroundColor: color}]}
      onPress={null}>
        <View style={styles.boxView}>
          <FontAwesome5 name={icon} size={24} color="white" />
          <View style={{margin: 3}}></View>
          <Text style={styles.boxText}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
}

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
            <View style={styles.itemsBox}>
              <View style={{justifyContent: 'space-evenly'}}>
                <Button color='#ED3131' title='Museus' icon='landmark'></Button>
                <Button color='#F0DC2B' title='Cultura' icon='theater-masks'></Button>
              </View>
              <View style={{justifyContent: 'space-evenly'}}>
                <Button color='#35E166' title='Parques' icon='tree'></Button>
                <Button color='#F68E2E' title='Restaurantes' icon='hamburger'></Button>
              </View>
              <View style={{justifyContent: 'space-evenly'}}>
                <Button color='#3B4ACD' title='   Pontos Turísticos' icon='binoculars'></Button>
                <Button color='#AB42D0' title='Hotéis' icon='bed'></Button>
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
  },
  itemsBox: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',                     
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%'
  },
  itemsBoxButton: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    elevation: 5,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold'
  },
  boxView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 71,
  },
});