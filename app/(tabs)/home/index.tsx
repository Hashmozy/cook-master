import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const Home: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const dot1Scale = useSharedValue(1);
  const dot1Opacity = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot2Opacity = useSharedValue(1);
  const dot3Scale = useSharedValue(1);
  const dot3Opacity = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      contentHeight.value = event.contentSize.height;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, -100],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const marginTop = interpolate(
      scrollY.value,
      [0, 100],
      [0, -50],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.95],
      Extrapolation.CLAMP
    );

    return {
      marginTop,
      transform: [{ scale }],
    };
  });

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
    opacity: dot1Opacity.value,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
    opacity: dot2Opacity.value,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
    opacity: dot3Opacity.value,
  }));

  useEffect(() => {
    if (loading) {
      dot1Scale.value = withRepeat(
        withSequence(
          withTiming(1.5, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      dot1Opacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );

      setTimeout(() => {
        dot2Scale.value = withRepeat(
          withSequence(
            withTiming(1.5, {
              duration: 600,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
        dot2Opacity.value = withRepeat(
          withSequence(
            withTiming(0.7, {
              duration: 600,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
      }, 200);

      setTimeout(() => {
        dot3Scale.value = withRepeat(
          withSequence(
            withTiming(1.5, {
              duration: 600,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
        dot3Opacity.value = withRepeat(
          withSequence(
            withTiming(0.7, {
              duration: 600,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
      }, 400);
    }
  }, [loading]);

  const fetchMeals = async () => {
    try {
      if (!refreshing) setLoading(true);
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMeals();
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <StatusBar translucent backgroundColor="#FFD700" style="dark" />
        <View style={styles.customLoader}>
          <Animated.View style={[styles.loaderDot, dot1Style]} />
          <Animated.View style={[styles.loaderDot, dot2Style]} />
          <Animated.View style={[styles.loaderDot, dot3Style]} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#FFD700" style="dark" />
      <Animated.View style={headerAnimatedStyle}>
        <Text style={styles.header}>Cook Master</Text>
      </Animated.View>
      <Animated.View
        style={[styles.searchBarContainer, searchBarAnimatedStyle]}
      >
        <TextInput
          placeholder="Search meals..."
          placeholderTextColor="#3D2C29"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </Animated.View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={meals.filter((meal) =>
          meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E6",
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3D2C29",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#FFE8D6",
    color: "#3D2C29",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D3A68A",
  },
  searchBarContainer: {
    backgroundColor: "#FFF7E6",
    zIndex: 10,
    elevation: 5,
    shadowColor: "#D3A68A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFE8D6",
    borderRadius: 12,
    overflow: "hidden",
    flex: 0.48,
    alignItems: "center",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3D2C29",
    padding: 10,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#FFF7E6",
    justifyContent: "center",
    alignItems: "center",
  },
  customLoader: {
    flexDirection: "row",
    alignItems: "center",
  },
  loaderDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF6F61",
    marginHorizontal: 6,
  },
});

export default Home;
