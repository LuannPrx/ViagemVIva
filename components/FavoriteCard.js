import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CalloutSubview } from 'react-native-maps';
import useStore from '../dataStore';

const FavoriteCard = props => {
  const removeFavorite = useStore((state)=>state.removeFavorite)

  return (
      <View style={styles.Card}>
          <View style={styles.favoriteImage}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={()=>removeFavorite(props.id)}>
                <AntDesign name="star" size={24} color="#F0BF06" />
              </TouchableOpacity>
            </View>
            <Image style={styles.image} resizeMode="contain" source={{uri: props.img}}/>
          </View>
          <View style={styles.favoriteInfo}>
            <View>
              <Text style={{fontWeight: "bold"}}>{props.name}</Text>
            </View>
            <ScrollView>
              <Text>{props.description}</Text>
            </ScrollView>
          </View>
      </View>
      );
  };

  export default FavoriteCard
  
  const styles = StyleSheet.create({
      Card: {
        height: 200,
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
        flex: 3,
        width: "100%",
        height: "100%",
        borderRadius: 5,
      },
      favoriteInfo: {
        flex: 1,
        margin: 10
      }
    });