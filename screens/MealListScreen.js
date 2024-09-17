import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const meals = { /* Dữ liệu món ăn */ };

const MealListScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const mealList = meals[categoryId];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorites')}
          style={styles.headerButton}
        >
          <MaterialCommunityIcons name="heart" color="red" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, categoryName]);

  const renderMealItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mealItem}
      onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
    >
      <Image source={item.image} style={styles.mealImage} />
      <Text style={styles.mealName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mealList}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  mealItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mealImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  headerButton: {
    marginLeft: 15,
  },
});

export default MealListScreen;
