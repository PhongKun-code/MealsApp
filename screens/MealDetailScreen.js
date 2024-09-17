// MealDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const mealDetails = {
  '1': { name: 'Phở', image: require('./assets/pho.webp'), description: 'A delicious Vietnamese noodle soup.' },
  '2': { name: 'Bánh Mì', image: require('./assets/banh-mi-viet-nam.webp'), description: 'A tasty Vietnamese baguette sandwich.' },
  // Add more meal details as needed
};

const MealDetailScreen = () => {
  const route = useRoute();
  const { mealId } = route.params;
  const meal = mealDetails[mealId];

  return (
    <View style={styles.container}>
      <Image source={meal.image} style={styles.mealImage} />
      <Text style={styles.mealName}>{meal.name}</Text>
      <Text style={styles.mealDescription}>{meal.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  mealName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  mealDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default MealDetailScreen;
