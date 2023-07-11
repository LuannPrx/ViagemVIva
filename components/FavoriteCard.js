import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import useStore from '../dataStore';
import { useNavigation } from '@react-navigation/native';

const FavoriteCard = props => {
  const removeFavorite = useStore((state)=>state.removeFavorite)
  const setDestination = useStore((state) => state.setDestination)
  const mapRef = useStore((state) => state.mapRef)
  const userLocation = useStore((state) => state.userLocation)
  const navigation = useNavigation()

  const handlePress = (id) => {
    removeFavorite(id)
  }

  async function handleDirections () {
    setDestination(props.location)
    navigation.navigate("Mapa")
    mapRef.current.animateToRegion({
      latitude: (userLocation.latitude+props.location.latitude)/2,
      longitude: (userLocation.longitude+props.location.longitude)/2,
      latitudeDelta: Math.abs(userLocation.latitude-props.location.latitude),
      longitudeDelta: Math.abs(userLocation.longitude-props.location.longitude),
    });
  }

  return (
      <View style={styles.Card}>
        <View style={styles.favoriteImage}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={()=>handlePress(props.id)}>
              <AntDesign name="heart" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <Image style={styles.image} resizeMode="cover" source={{uri: props.img}}/>
        </View>
        <View style={styles.favoriteInfo}>
          <View >
            <Text style={{fontWeight: "bold", fontSize: 18}}>{props.name}</Text>
          </View>
          <ScrollView style={{flex: 10}}>
            <Text>{props.description}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.routeButton} onPress={handleDirections}>
            <Text style={{fontWeight: "bold", color: "#fff"}}>Traçar rota</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
  };

  export default FavoriteCard
  
  const styles = StyleSheet.create({
      Card: {
        height: 270,
        margin: 20,
        flexDirection: "row",
        marginBottom: 0,
        borderWidth: 2,
        borderColor: "#f0f0f0",
        borderRadius: 15,
        backgroundColor: "white"
      },
      icon:{
        flex: 1
      },
      favoriteImage: {
        flex: 1,
        margin: 10,
      },
      image: {
        flex: 4,
        width: "100%",
        height: "100%",
        borderRadius: 5,
      },
      favoriteInfo: {
        flex: 1,
        margin: 10
      },
      routeButton: {
        flex: 0.4, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#47ADFf",
        marginTop: 8,
        marginHorizontal: 10,
        borderRadius: 10
      }
    });