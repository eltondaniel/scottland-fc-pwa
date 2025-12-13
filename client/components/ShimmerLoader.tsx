import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

const { width } = Dimensions.get("window");

export function ShimmerLoader() {
  const { theme } = useTheme();
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderShimmerBox = (
    height: number,
    widthPercent: number,
    marginBottom: number = Spacing.md
  ) => (
    <View
      style={[
        styles.shimmerBox,
        {
          height,
          width: `${widthPercent}%`,
          marginBottom,
          backgroundColor: theme.shimmer,
          overflow: "hidden",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.shimmerGradient,
          { backgroundColor: theme.shimmerHighlight },
          animatedStyle,
        ]}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      {renderShimmerBox(200, 100, Spacing.lg)}
      {renderShimmerBox(24, 70)}
      {renderShimmerBox(16, 90)}
      {renderShimmerBox(16, 85)}
      {renderShimmerBox(16, 60, Spacing.lg)}
      {renderShimmerBox(120, 100, Spacing.lg)}
      {renderShimmerBox(24, 50)}
      {renderShimmerBox(16, 80)}
      {renderShimmerBox(16, 75)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  shimmerBox: {
    borderRadius: BorderRadius.xs,
    position: "relative",
  },
  shimmerGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 100,
    opacity: 0.5,
  },
});
