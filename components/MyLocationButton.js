import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View} from "react-native";

function MyLocationButton({mapRef, latitude, longitude}) {
    return(
        <View style={styles.myLocationIcon}>
            <MaterialIcons
                color='grey'
                size={24}
                name="my-location"
                onPress={() => {
                    mapRef.current.animateToRegion({
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.01,
                    });
                }}
            />
        </View>
    )
}

export default MyLocationButton;

const styles = StyleSheet.create({
    myLocationIcon: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50
      }
  });