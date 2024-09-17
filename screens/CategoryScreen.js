import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const categories = [
  { id: '1', name: 'Món Nước', image: require('./assets/monnuoc.jpg') },
  { id: '2', name: 'Món Khô', image: require('./assets/monkho.jpg') },
];

const CategoryScreen = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10],
        }),
      },
    ],
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() =>
        navigation.navigate('MealList', { categoryId: item.id, categoryName: item.name })
      }
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Animated.Text style={[styles.title, animatedStyle]}>
          Danh Mục Món Ăn
        </Animated.Text>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Thay đổi màu nền tại đây
  },
  titleContainer: {
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  categoryItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryScreen;
