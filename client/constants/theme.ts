import { Platform } from "react-native";

const primaryGreen = "#1B4D3E";
const primaryGold = "#C9A227";
const primaryGreenLight = "#2A7A5E";
const primaryGoldLight = "#D4B84A";

export const Colors = {
  light: {
    text: "#11181C",
    buttonText: "#FFFFFF",
    tabIconDefault: "#687076",
    tabIconSelected: primaryGreen,
    link: primaryGreen,
    primary: primaryGreen,
    primaryLight: primaryGreenLight,
    accent: primaryGold,
    accentLight: primaryGoldLight,
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F5F7F6",
    backgroundSecondary: "#E8EDEB",
    backgroundTertiary: "#D9E0DD",
    shimmer: "#E0E0E0",
    shimmerHighlight: "#F5F5F5",
    error: "#DC3545",
    errorBackground: "#FEE2E5",
    border: "#E0E0E0",
  },
  dark: {
    text: "#ECEDEE",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryGoldLight,
    link: primaryGoldLight,
    primary: primaryGreenLight,
    primaryLight: primaryGreen,
    accent: primaryGold,
    accentLight: primaryGoldLight,
    backgroundRoot: "#0D1F18",
    backgroundDefault: "#152A22",
    backgroundSecondary: "#1D3A2E",
    backgroundTertiary: "#254A3A",
    shimmer: "#2A3830",
    shimmerHighlight: "#3A4840",
    error: "#FF6B7A",
    errorBackground: "#3D1F22",
    border: "#2A3830",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
