import { StyleSheet, View, Text, Image, Alert} from 'react-native';
import { Callout, CalloutSubview, Marker} from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import useStore from '../dataStore';

const InterestMarker = props => {
  const data = useStore((state)=>state.placeData)
  const favorites = useStore((state)=>state.favorites)
  const setFavorites = useStore((state)=>state.setFavorites)
  
  const addFavorite = (id) => {
    if (favorites.some((favorite) => favorite.id === id)){
      Alert.alert("Favorito já adicionado", "Este local já está favoritado");
    }
    else {
      const selectedPlace = data.find(place => place.id === id);
      setFavorites(selectedPlace)
      Alert.alert("Favorito adicionado", "Este local foi adicionado aos favoritos");
    }
  }

  return(
    <Marker
    coordinate={props.location}
    >
      <View style={{ width: 55, height: 55 }}>
        <Image 
        source={
          props.type==="Museums"
            ? require('../assets/marcadorMuseu.png')
            : props.type==="Culture"
            ? require('../assets/marcadorCultura.png')
            : props.type==="Parks"
            ? require('../assets/marcador.png')
            : props.type==="Restaurants"
            ? require('../assets/marcadorRest.png')
            : props.type==="Tourist attractions"
            ? require('../assets/marcadorPT.png')
            : props.type==="Hotels"
            ? require('../assets/marcadorHotel.png')
            : null
        } 
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
        />
      </View>
      <Callout style={styles.callout} onPress={()=>addFavorite(props.id)}>
        <View style={styles.calloutInfo}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textCallout}>{props.name}</Text>
            <AntDesign name="staro" size={24} color="#F0BF06" />
          </View>
          <Text style={styles.descriptionCallout}>{props.description}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode="contain" source={{uri:props.image}}/>
        </View>
      </Callout>
    </Marker>
  );
};

export default InterestMarker;

const styles = StyleSheet.create({
    callout: {
      width: 250,
      height: 250,
      justifyContent: "center"
    },
    calloutInfo: {
      flex: 3,
      justifyContent: "center",
      alignItems: "center"
    },
    textCallout: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    descriptionCallout: {
      fontSize: 12,
    },
    imageContainer: {
      flex: 2
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 5,
      alignSelf: "center",
    },
  });