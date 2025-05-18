import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// Prevent native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get("window");

const Index: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  // Animation shared values
  const opacity = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const translateY = useSharedValue<number>(0);
  const translateX = useSharedValue<number>(0);

  useEffect(() => {
    async function prepare() {
      try {
        // Preload fonts
        await Font.loadAsync(Entypo.font);
        // Simulate resource loading (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Start animation sequence
      opacity.value = withTiming(1, { duration: 1000 });
      scale.value = withTiming(1.2, { duration: 1000 });
      translateY.value = withSequence(
        withSpring(20, { damping: 10, stiffness: 100 }),
        withSpring(-20, { damping: 10, stiffness: 100 }),
        withSpring(0, { damping: 10, stiffness: 100 }, () => {
          // After bounce, slide out
          translateX.value = withTiming(
            width,
            { duration: 800, easing: Easing.out(Easing.exp) },
            () => {
              // Hide splash screen and navigate
              runOnJS(SplashScreen.hideAsync)();
              runOnJS(router.replace)("/(tabs)/home");
            }
          );
        })
      );
    }
  }, [appIsReady]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  if (!appIsReady) {
    return (
      <View style={styles.loaderContainer}>
        <StatusBar translucent backgroundColor="#FFD700" style="dark" />
        <ActivityIndicator size="large" color="#FF6F61" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#FFD700" style="dark" />
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Image
          source={require("../assets/images/adaptive-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E6",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#FFF7E6",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Index;
