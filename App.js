import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Tạo Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Danh mục món ăn
const categories = [
  { id: '1', name: 'Món Nước', image: require('./assets/monnuoc.jpg') },
  { id: '2', name: 'Món Khô', image: require('./assets/monkho.jpg') },
];

// Món ăn theo danh mục
const meals = {
  '1': [ // Món Nước
    { id: '1', name: 'Phở', image: require('./assets/pho.webp'), description: 'Phở là món ăn truyền thống của Việt Nam, bao gồm nước dùng, bánh phở và các nguyên liệu khác.' },
    { id: '3', name: 'Bún Chả', image: require('./assets/buncha.webp'), description: 'Bún Chả là món ăn bao gồm bún, thịt nướng và nước chấm.' },
    { id: '7', name: 'Mì Quảng', image: require('./assets/miquang.jpg'), description: 'Mì Quảng là món mì đặc trưng của miền Trung Việt Nam.' },
    { id: '8', name: 'Lẩu', image: require('./assets/lau.jpg'), description: 'Lẩu là món ăn có nước dùng nóng, thường ăn cùng nhiều loại thực phẩm khác.' },
  ],
  '2': [ // Món Khô
    { id: '2', name: 'Bánh Mì', image: require('./assets/banh-mi-viet-nam.webp'), description: 'Bánh Mì là món sandwich đặc trưng của Việt Nam với nhiều loại nhân.' },
    { id: '4', name: 'Cơm Tấm', image: require('./assets/comtam.webp'), description: 'Cơm Tấm là món cơm được làm từ gạo tấm, thường ăn kèm với sườn nướng.' },
    { id: '5', name: 'Chả Giò', image: require('./assets/chagio.webp'), description: 'Chả Giò là món nem rán giòn với nhiều loại nhân.' },
    { id: '6', name: 'Gỏi Cuốn', image: require('./assets/goicuon.webp'), description: 'Gỏi Cuốn là món cuốn tươi sống với các nguyên liệu như tôm, thịt và rau sống.' },
    { id: '9', name: 'Bánh Xèo', image: require('./assets/banhxeo.webp'), description: 'Bánh Xèo là món bánh xèo giòn rụm, thường ăn kèm với rau sống và nước chấm.' },
    { id: '10', name: 'Nem Nướng', image: require('./assets/nemnuong.jpg'), description: 'Nem Nướng là món nem nướng thơm ngon với hương vị đặc trưng.' },
  ],
};


// Màn hình danh mục món ăn
const CategoryScreen = ({ navigation }) => {
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
      <Text style={styles.title}>Danh Mục Món Ăn</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      />
    </View>
  );
};

// Màn hình danh sách món ăn
const MealListScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const mealList = meals[categoryId];

  React.useEffect(() => {
    navigation.setOptions({ title: categoryName });
  }, [categoryName, navigation]);

  const renderMealItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mealItem}
      onPress={() =>
        navigation.navigate('MealDetail', { mealId: item.id })
      }
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

// Màn hình chi tiết món ăn
const MealDetailScreen = ({ route, navigation }) => {
  const { mealId } = route.params;
  const meal = Object.values(meals).flat().find(meal => meal.id === mealId);

  React.useEffect(() => {
    if (meal) {
      navigation.setOptions({ title: meal.name });
    }
  }, [meal, navigation]);

  if (!meal) {
    return <Text>Meal not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={meal.image} style={styles.mealDetailImage} />
      <Text style={styles.mealDetailName}>{meal.name}</Text>
      <Text style={styles.mealDetailDescription}>{meal.description}</Text>
    </View>
  );
};

// Màn hình yêu thích
const FavoritesScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Yêu Thích</Text>
    <Text>Chưa có yêu thích nào.</Text>
  </View>
);

// Màn hình cài đặt
const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Cài Đặt</Text>
    <Text>Chưa có cài đặt nào.</Text>
  </View>
);

// Màn hình chính với tab điều hướng dưới cùng
const MainTabNavigator = ({ route }) => {
  const [favorites, setFavorites] = React.useState([]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarLabel: 'Danh Mục',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        initialParams={{ favorites }}
        options={{
          tabBarLabel: 'Yêu Thích',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Cài Đặt',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Cấu hình điều hướng
const App = () => {
  const [favorites, setFavorites] = React.useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main">
          {props => <MainTabNavigator {...props} favorites={favorites} />}
        </Stack.Screen>
        <Stack.Screen name="MealList">
          {props => <MealListScreen {...props} setFavorites={setFavorites} />}
        </Stack.Screen>
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFE0', // Màu nền nhẹ nhàng cho màn hình chính
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  categoryItem: {
    padding: 15,
    backgroundColor: '#ffffff', // Màu nền của các mục danh mục
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000', // Đổ bóng để tạo độ nổi bật
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
  mealItem: {
    padding: 15,
    backgroundColor: '#ffffff', // Màu nền của các mục món ăn
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000', // Đổ bóng để tạo độ nổi bật
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  mealImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealDetailImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  mealDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  mealDetailDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});


export default App;
