import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.header}>Menu</Text>
        <DrawerItem
          label="Categories"
          onPress={() => props.navigation.navigate('Categories')}
        />
        <DrawerItem
          label="Favorites"
          onPress={() => props.navigation.navigate('Favorites')}
        />
        <DrawerItem
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CustomDrawerContent;
