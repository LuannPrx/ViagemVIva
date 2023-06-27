import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import FavoriteCard from "../components/FavoriteCard";
import useStore from "../dataStore";

function FavoritesScreen() {
  const userFavorites = useStore((state)=>state.favorites)
  
  const renderFavorites = userFavorites.map((favorite) => 
    <FavoriteCard 
    key={favorite.id} 
    id = {favorite.id}
    location={favorite.location}
    img={favorite.img}
    name={favorite.name}
    description={favorite.description}
    />
  );  

  return (
    <SafeAreaView style={styles.container}> 
        {userFavorites.length !== 0 ? 
          <ScrollView>
            {renderFavorites}
          </ScrollView>: 
          <View style={{justifyContent: "center", alignItems:"center", flex:1}}>
            <Text style={{color:"gray", alignSelf:"center"}}>O usuário não tem nenhum favorito salvo</Text>
          </View>
        }
    </SafeAreaView>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc"
  },
})