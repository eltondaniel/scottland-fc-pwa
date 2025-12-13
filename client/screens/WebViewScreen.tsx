import React, { useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Platform,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import NetInfo from "@react-native-community/netinfo";
import { ShimmerLoader } from "@/components/ShimmerLoader";
import { ErrorScreen } from "@/components/ErrorScreen";
import { useTheme } from "@/hooks/useTheme";

interface WebViewScreenProps {
  url: string;
}

export function WebViewScreen({ url }: WebViewScreenProps) {
  const webViewRef = useRef<WebView>(null);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const checkConnection = useCallback(async () => {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const connected = await checkConnection();
    if (!connected) {
      setIsOffline(true);
      setRefreshing(false);
      return;
    }
    setIsOffline(false);
    setHasError(false);
    webViewRef.current?.reload();
    setTimeout(() => setRefreshing(false), 1000);
  }, [checkConnection]);

  const handleRetry = useCallback(async () => {
    const connected = await checkConnection();
    if (!connected) {
      setIsOffline(true);
      return;
    }
    setIsOffline(false);
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.reload();
  }, [checkConnection]);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    setRefreshing(false);
  }, []);

  const handleError = useCallback(async () => {
    const connected = await checkConnection();
    setIsOffline(!connected);
    setHasError(true);
    setIsLoading(false);
  }, [checkConnection]);

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  if (hasError || isOffline) {
    return <ErrorScreen isOffline={isOffline} onRetry={handleRetry} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      {Platform.OS === "web" ? (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: tabBarHeight },
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={[styles.webContainer, { minHeight: 600 }]}>
            {isLoading ? <ShimmerLoader /> : null}
            <WebView
              ref={webViewRef}
              source={{ uri: url }}
              style={[styles.webView, { opacity: isLoading ? 0 : 1 }]}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              onNavigationStateChange={handleNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              scalesPageToFit={true}
              allowsBackForwardNavigationGestures={true}
              allowFileAccess={true}
              allowsFullscreenVideo={true}
              mediaPlaybackRequiresUserAction={false}
              cacheEnabled={true}
              incognito={false}
              sharedCookiesEnabled={true}
            />
          </View>
        </ScrollView>
      ) : (
        <>
          {isLoading ? (
            <View style={StyleSheet.absoluteFill}>
              <ShimmerLoader />
            </View>
          ) : null}
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={[
              styles.webView,
              { marginBottom: tabBarHeight, opacity: isLoading ? 0 : 1 },
            ]}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            onNavigationStateChange={handleNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            allowsBackForwardNavigationGestures={true}
            pullToRefreshEnabled={true}
            allowFileAccess={true}
            allowsFullscreenVideo={true}
            mediaPlaybackRequiresUserAction={false}
            cacheEnabled={true}
            incognito={false}
            sharedCookiesEnabled={true}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  webContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
