import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from '../screens/Map';
import FavoritesScreen from '../screens/Favorites';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Mapa" component={MapScreen} options={{headerShown: false}}/>
      <Drawer.Screen name="Favoritos" component={FavoritesScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator