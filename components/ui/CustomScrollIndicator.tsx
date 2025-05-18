import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

type CustomScrollIndicatorProps = {
  scrollY: SharedValue<number>;
  contentHeight: SharedValue<number>;
  flatListHeight: number;
  flatListTopOffset: number;
  indicatorHeight?: number;
  indicatorWidth?: number;
  indicatorColor?: string;
  rightOffset?: number;
};

const CustomScrollIndicator: React.FC<CustomScrollIndicatorProps> = ({
  scrollY,
  contentHeight,
  flatListHeight,
  flatListTopOffset,
  indicatorHeight = 60,
  indicatorWidth = 6,
  indicatorColor = "#FF6F61",
  rightOffset = 10,
}) => {
  const scrollIndicatorStyle = useAnimatedStyle(() => {
    const maxScroll = contentHeight.value - flatListHeight;
    const trackHeight = flatListHeight - indicatorHeight;

    const translateY = interpolate(
      scrollY.value,
      [0, maxScroll],
      [0, trackHeight],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, maxScroll],
      [1, 1.1],
      Extrapolation.CLAMP
    );

    const opacity = scrollY.value > 0 ? 1 : withTiming(0.7, { duration: 200 });

    return {
      transform: [{ translateY }, { scale }],
      opacity,
      top: flatListTopOffset,
    };
  });

  return (
    <Animated.View
      style={[
        styles.scrollIndicator,
        {
          height: indicatorHeight,
          width: indicatorWidth,
          backgroundColor: indicatorColor,
          right: rightOffset,
          shadowColor: "#D3A68A",
        },
        scrollIndicatorStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  scrollIndicator: {
    position: "absolute",
    borderRadius: 3,
    elevation: 5,
    zIndex: 1000,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});

export default CustomScrollIndicator;
