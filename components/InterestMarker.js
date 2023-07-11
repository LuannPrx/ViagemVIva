import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import useStore from '../dataStore';
import { useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const InterestMarker = props => {
  const data = useStore((state) => state.placeData)
  const favorites = useStore((state) => state.favorites)
  const setNewFavorite = useStore((state) => state.setNewFavorite)
  const removeFavorite = useStore((state) => state.removeFavorite)
  const [favoriteIcon, setFavoriteIcon] = useState('hearto')
  const fillPercentage = (props.rating / 5) * 100;
  
  const addFavorite = (id) => {
    if (favorites.some((favorite) => favorite.id === id)) {
      removeFavorite(id)
      setFavoriteIcon('hearto')
      Alert.alert("Favorito removido", "Este local foi retirado dos favoritos");
    }
    else {
      const selectedPlace = data.find(place => place.id === id);
      setNewFavorite(selectedPlace)
      setFavoriteIcon('heart')
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
                        : props.type === "Search"
                          ? require('../assets/marcadorBusca.png')
                          : null
          }
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Callout onPress={() => addFavorite(props.id)} tooltip={true} >
        <View style={styles.bubble}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode="cover" source={{ uri: props.image }} />
          </View>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']} style={styles.calloutInfo}>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((index) => (
                <AntDesign
                  key={index}
                  name="star"
                  size={18}
                  color={fillPercentage >= index * 20 ? '#F0BF06' : 'gray'}
                  style={styles.starIcon}
                />
              ))}
              <Text style={{fontWeight: "bold", color: "#fff"}}>{props.rating}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textCallout} >{props.name}</Text>
              <AntDesign name={favoriteIcon} size={22} color="red" />
            </View>
            <Text style={styles.descriptionCallout}>{props.description}</Text>
          </LinearGradient>
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
    maxWidth: 600,
    maxHeight: 600,
    justifyContent: "flex-end",
    backgroundColor: 'white',
    borderRadius: 7,
    overflow: "hidden"
  },
  calloutInfo: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  textCallout: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#fff",
    marginRight: 8,
    maxWidth: "80%"
  },
  descriptionCallout: {
    fontSize: 12,
    color: "#fff"
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  rating: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 8,
    justifyContent: "center"
  },
  starIcon: {
    marginRight: 2
  }
});