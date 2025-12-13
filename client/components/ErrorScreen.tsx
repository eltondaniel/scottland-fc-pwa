import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";

interface ErrorScreenProps {
  isOffline?: boolean;
  onRetry: () => void;
}

export function ErrorScreen({ isOffline = false, onRetry }: ErrorScreenProps) {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={[
        styles.container,
        { paddingTop: insets.top + Spacing.xl, paddingBottom: insets.bottom + Spacing.xl },
      ]}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: isDark ? Colors.dark.errorBackground : Colors.light.errorBackground },
          ]}
        >
          <Feather
            name={isOffline ? "wifi-off" : "alert-circle"}
            size={48}
            color={theme.error}
          />
        </View>
        <ThemedText type="h3" style={styles.title}>
          {isOffline ? "No Connection" : "Something Went Wrong"}
        </ThemedText>
        <ThemedText style={styles.message}>
          {isOffline
            ? "Please check your internet connection and try again."
            : "We couldn't load this page. Please try again."}
        </ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={onRetry}
        >
          <Feather name="refresh-cw" size={20} color="#FFFFFF" />
          <ThemedText style={styles.retryText} lightColor="#FFFFFF" darkColor="#FFFFFF">
            Try Again
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  message: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: Spacing["2xl"],
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  retryText: {
    fontWeight: "600",
  },
});
