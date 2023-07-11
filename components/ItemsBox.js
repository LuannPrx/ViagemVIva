import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import CustomButton from './CustomButton';
import useStore from '../dataStore';
import callOpenAI from '../api handlers/apiHandler';

function ItemsBox() {
  const windowHeight = Dimensions.get('window').height;
  const animTranslate = useRef(new Animated.Value(0)).current
  const setToggleFunc = useStore((state)=>state.setToggleFunc)
  const currentCity = useStore((state) => state.currentCity)
  const setCurrentState = useStore((state) => state.setCurrentState)
  const setLoading = useStore((state) => state.setModalLoading)
  const setData = useStore((state) => state.setPlaceData)
  const mapRef = useStore((state) => state.mapRef)
  
  const toggleItemsBox = (down) => {
    if (down) {
      Animated.timing(animTranslate, {
        toValue: windowHeight*0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animTranslate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }

  useEffect(() => {
    setToggleFunc(toggleItemsBox);
  }, []);

  const handlePress = (payload) => {
    setCurrentState(payload)
    callOpenAI(payload, currentCity, setLoading, setData, mapRef)
    toggleItemsBox(true)
  }

  return (
    <Animated.View style={[styles.itemsBox, {transform: [{translateY: animTranslate}]}]}>
      <View style={styles.column}>
        <CustomButton color='#ED3131' title='Museus' icon='landmark' onPress={() => handlePress("Museums")} />
        <CustomButton color='#F0DC2B' title='Cultura' icon='theater-masks' onPress={() => handlePress("Culture")} />
      </View>
      <View style={styles.column}>
        <CustomButton color='#35E166' title='Parques' icon='tree' onPress={() => handlePress("Parks")} />
        <CustomButton color='#F68E2E' title='Restaurantes' icon='hamburger' onPress={() => handlePress("Restaurants")} />
      </View>
      <View style={styles.column}>
        <CustomButton color='#3B4ACD' title='   Pontos Turísticos' icon='binoculars' onPress={() => handlePress("Tourist attractions")} />
        <CustomButton color='#AB42D0' title='Hotéis' icon='bed' onPress={() => handlePress("Hotels")} />
      </View>
    </Animated.View>
  )
}

export default ItemsBox;

const styles = StyleSheet.create({
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
  column: {
    justifyContent: "space-evenly",
    marginTop: 5,
  }
});