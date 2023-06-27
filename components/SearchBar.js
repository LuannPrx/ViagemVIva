import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard} from "react-native";
import { useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import useStore from "../dataStore";

function SearchBar({currentState, changeState}) {
  const [inputText, setInputText] = useState('');
  const toggleFunc = useStore((state)=>state.toggleFunc)
  
  const handleInput = () => {
    console.log(inputText)
    Keyboard.dismiss()
  };

  const handlePress = () => {
    toggleFunc(false)
    changeState("")
  }

  function DisplayBar ({color, icon, label}) {
    return (
      <TouchableOpacity style={[styles.searchBar, {backgroundColor: color}]} onPress={handlePress}>
        <View style={styles.displayBar}>
          <FontAwesome5 name={icon} size={38} color="white" />
          <Text style={{color: "#fff", fontWeight: "bold", fontSize: 26, marginLeft: 15}}>{label}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if (currentState!==""){
    if (currentState === "Museums") {
      color = '#ED3131';
      label = 'Museus';
      icon = 'landmark';
    } else if (currentState === "Culture") {
      color = '#F0DC2B';
      label = 'Cultura';
      icon = 'theater-masks';
    } else if (currentState === "Parks") {
      color = '#35E166';
      label = 'Parques';
      icon = 'tree';
    } else if (currentState === "Restaurants") {
      color = '#F68E2E';
      label = 'Restaurantes';
      icon = 'hamburger';
    } else if (currentState === "Tourist attractions") {
      color = '#3B4ACD';
      label = 'Pontos Turísticos';
      icon = 'binoculars';
    } else if (currentState === "Hotels") {
      color = '#AB42D0';
      label = 'Hotéis';
      icon = 'bed';
    }
    
    return (
      <DisplayBar color={color} label={label} icon={icon} />
    );
  }

  return (
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
        <FontAwesome5 name="search" size={22} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    backgroundColor: 'white',
    borderRadius: 30,
  },
  displayBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 15
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
});