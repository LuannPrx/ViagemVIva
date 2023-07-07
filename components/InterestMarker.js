import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import useStore from '../dataStore';
import { useState } from 'react';

const InterestMarker = props => {
  const data = useStore((state) => state.placeData)
  const favorites = useStore((state) => state.favorites)
  const setFavorites = useStore((state) => state.setFavorites)
  const removeFavorite = useStore((state) => state.removeFavorite)
  const [favoriteIcon, setFavoriteIcon] = useState('staro')

  const addFavorite = (id) => {
    if (favorites.some((favorite) => favorite.id === id)) {
      removeFavorite(id)
      setFavoriteIcon('staro')
      Alert.alert("Favorito removido", "Este local foi retirado dos favoritos");
    }
    else {
      const selectedPlace = data.find(place => place.id === id);
      setFavorites(selectedPlace)
      setFavoriteIcon('star')
      Alert.alert("Favorito adicionado", "Este local foi adicionado aos favoritos");
    }
  }

  return (
    <Marker
      coordinate={props.location}
    >
      <View style={{ width: 55, height: 55 }}>
        <Image
          source={
            props.type === "Museums"
              ? require('../assets/marcadorMuseu.png')
              : props.type === "Culture"
                ? require('../assets/marcadorCultura.png')
                : props.type === "Parks"
                  ? require('../assets/marcador.png')
                  : props.type === "Restaurants"
                    ? require('../assets/marcadorRest.png')
                    : props.type === "Tourist attractions"
                      ? require('../assets/marcadorPT.png')
                      : props.type === "Hotels"
                        ? require('../assets/marcadorHotel.png')
                        : null
          }
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Callout onPress={() => addFavorite(props.id)} tooltip={true} >
        <View style={styles.bubble}>
          <View style={styles.calloutInfo}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textCallout}>{props.name}</Text>
              <AntDesign name={favoriteIcon} size={22} color="#F0BF06" />
            </View>
            <Text style={styles.descriptionCallout}>{props.description}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode="contain" source={{ uri: props.image }} />
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

export default InterestMarker;

const styles = StyleSheet.create({
  bubble: {
    flex: 1,
    minWidth: 250,
    minHeight: 250,
    maxWidth: 400,
    maxHeight: 400,
    justifyContent: "center",
    backgroundColor: 'white',
    borderRadius: 7,
  },
  calloutInfo: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center"
  },
  textCallout: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  descriptionCallout: {
    fontSize: 12,
  },
  imageContainer: {
    flex: 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});