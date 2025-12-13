import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import * as WebBrowser from "expo-web-browser";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

const BASE_URL = "https://scottlandfc.club";

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

function MenuItem({ icon, title, subtitle, onPress }: MenuItemProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        {
          backgroundColor: theme.backgroundDefault,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.menuIconContainer, { backgroundColor: theme.primary }]}>
        <Feather name={icon} size={20} color="#FFFFFF" />
      </View>
      <View style={styles.menuTextContainer}>
        <ThemedText type="body" style={styles.menuTitle}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText type="small" style={styles.menuSubtitle}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      <Feather name="chevron-right" size={20} color={theme.tabIconDefault} />
    </Pressable>
  );
}

export default function MoreScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const openUrl = async (path: string) => {
    await WebBrowser.openBrowserAsync(`${BASE_URL}${path}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: headerHeight + Spacing.lg,
            paddingBottom: tabBarHeight + Spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <ThemedText type="small" style={[styles.sectionTitle, { color: theme.tabIconDefault }]}>
            Account
          </ThemedText>
          <MenuItem
            icon="log-in"
            title="Login"
            subtitle="Access your member account"
            onPress={() => openUrl("/login")}
          />
          <MenuItem
            icon="user-plus"
            title="Membership"
            subtitle="Join Scottland FC"
            onPress={() => openUrl("/membership")}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="small" style={[styles.sectionTitle, { color: theme.tabIconDefault }]}>
            Club
          </ThemedText>
          <MenuItem
            icon="mail"
            title="Contact Us"
            subtitle="Get in touch with the club"
            onPress={() => openUrl("/contact-us")}
          />
          <MenuItem
            icon="video"
            title="Videos"
            subtitle="Watch highlights and interviews"
            onPress={() => openUrl("/videos")}
          />
        </View>

        <View style={styles.footer}>
          <ThemedText type="small" style={[styles.footerText, { color: theme.tabIconDefault }]}>
            Scottland FC App v1.0
          </ThemedText>
          <ThemedText type="small" style={[styles.footerText, { color: theme.tabIconDefault }]}>
            Designed by Elton Daniel
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontWeight: "600",
  },
  menuSubtitle: {
    opacity: 0.6,
    marginTop: 2,
  },
  footer: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
    marginTop: Spacing.xl,
  },
  footerText: {
    marginBottom: Spacing.xs,
  },
});
