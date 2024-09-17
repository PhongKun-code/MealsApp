const FavoritesScreen = ({ route }) => {
  const { favorites } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yêu Thích</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.mealItem}>
              <Image source={item.image} style={styles.mealImage} />
              <Text style={styles.mealName}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Chưa có yêu thích nào.</Text>
      )}
    </View>
  );
};
