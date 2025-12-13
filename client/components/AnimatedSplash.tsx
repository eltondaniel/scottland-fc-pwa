import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { Colors } from "@/constants/theme";

const { width, height } = Dimensions.get("window");
const SPLASH_DURATION = 1500;
const LOGO_SIZE = 120;

interface AnimatedSplashProps {
  onAnimationComplete: () => void;
}

export function AnimatedSplash({ onAnimationComplete }: AnimatedSplashProps) {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const backgroundTranslateY = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });

    logoScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.back(1.5)),
    });

    backgroundTranslateY.value = withTiming(-50, {
      duration: SPLASH_DURATION,
      easing: Easing.linear,
    });

    containerOpacity.value = withDelay(
      SPLASH_DURATION - 300,
      withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      })
    );

    const timeout = setTimeout(() => {
      onAnimationComplete();
    }, SPLASH_DURATION);

    return () => clearTimeout(timeout);
  }, [backgroundTranslateY, containerOpacity, logoOpacity, logoScale, onAnimationComplete]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: backgroundTranslateY.value }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.Image
        source={require("../../assets/images/splash-background.jpg")}
        style={[styles.backgroundImage, backgroundAnimatedStyle]}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height + 100,
    top: -25,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(27, 77, 62, 0.7)",
  },
  logoContainer: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: LOGO_SIZE - 20,
    height: LOGO_SIZE - 20,
  },
});
