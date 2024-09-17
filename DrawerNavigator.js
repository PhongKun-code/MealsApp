import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CategoryScreen from './screens/CategoryScreen'; // Màn hình danh mục
import MealListScreen from './screens/MealListScreen'; // Màn hình danh sách món ăn
import MealDetailScreen from './screens/MealDetailScreen'; // Màn hình chi tiết món ăn
import FavoritesScreen from './screens/FavoritesScreen'; // Màn hình yêu thích
import SettingsScreen from './screens/SettingsScreen'; // Màn hình cài đặt
import CustomDrawerContent from './components/CustomDrawerContent'; // Component tùy chỉnh menu ngăn kéo

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Categories"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Categories" component={CategoryScreen} />
        <Drawer.Screen name="Meals" component={MealListScreen} />
        <Drawer.Screen name="MealDetail" component={MealDetailScreen} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
