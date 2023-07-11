import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigators/DrawerNavigator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
import useStore from './dataStore';

export default function App() {
  const favorites = useStore((state) => state.favorites)

  const storeData = async () => {
    try {
      const convertedValue = JSON.stringify(favorites)
      await AsyncStorage.setItem('favorites', convertedValue)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    storeData()
  }, [favorites]);

  return (
    <NavigationContainer>
      <StatusBar style='auto'/>
      <DrawerNavigator />
    </NavigationContainer>
  );
}