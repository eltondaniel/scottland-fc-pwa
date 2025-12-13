import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { WebViewScreen } from "@/screens/WebViewScreen";
import MoreScreen from "@/screens/MoreScreen";
import { HeaderTitle } from "@/components/HeaderTitle";

const BASE_URL = "https://scottlandfc.club";

export type MainTabParamList = {
  HomeTab: undefined;
  FixturesTab: undefined;
  NewsTab: undefined;
  TeamTab: undefined;
  GalleryTab: undefined;
  MoreTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function HomeScreen() {
  return <WebViewScreen url={`${BASE_URL}/`} />;
}

function FixturesScreen() {
  return <WebViewScreen url={`${BASE_URL}/fixtures`} />;
}

function NewsScreen() {
  return <WebViewScreen url={`${BASE_URL}/news`} />;
}

function TeamScreen() {
  return <WebViewScreen url={`${BASE_URL}/team`} />;
}

function GalleryScreen() {
  return <WebViewScreen url={`${BASE_URL}/gallery`} />;
}

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();
  const screenOptions = useScreenOptions();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        ...screenOptions,
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          headerTitle: () => <HeaderTitle />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FixturesTab"
        component={FixturesScreen}
        options={{
          title: "Fixtures",
          headerTitle: "Fixtures",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewsTab"
        component={NewsScreen}
        options={{
          title: "News",
          headerTitle: "News",
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TeamTab"
        component={TeamScreen}
        options={{
          title: "Team",
          headerTitle: "Team",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GalleryTab"
        component={GalleryScreen}
        options={{
          title: "Gallery",
          headerTitle: "Gallery",
          tabBarIcon: ({ color, size }) => (
            <Feather name="image" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={{
          title: "More",
          headerTitle: "More",
          tabBarIcon: ({ color, size }) => (
            <Feather name="more-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
