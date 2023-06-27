import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


function Button({color, title, icon, onPress}) {
  return(
    <TouchableOpacity 
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
        <View style={styles.boxView}>
          <FontAwesome5 name={icon} size={24} color="white" />
          <Text style={styles.boxText}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    elevation: 5,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 3,
    fontSize: 13
  },
  boxView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 71,
  },
});