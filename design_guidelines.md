# Scottland Football Club Mobile App - Design Guidelines

## Architecture Decisions

### Authentication
**No Authentication Required** (website handles login)
- The app is a WebView wrapper for scottlandfc.club
- All login/authentication flows are handled by the website itself
- The "More" tab includes access to Login and Membership pages through WebView
- No native auth implementation needed

### Navigation
**Bottom Tab Navigation (6 tabs)**
- The app uses a bottom tab bar as the primary navigation structure
- All tabs load different URLs from scottlandfc.club within a persistent WebView
- Tab configuration:
  1. **Home** 🏠 → scottlandfc.club/
  2. **Fixtures** 📅 → scottlandfc.club/fixtures
  3. **News** 📰 → scottlandfc.club/news
  4. **Team** 👥 → scottlandfc.club/team
  5. **Gallery** 🖼️ → scottlandfc.club/gallery (+ videos page)
  6. **More** → Contains Login, Contact Us, and Membership links

## Screen Specifications

### 1. Splash Screen (Initial Load)
**Purpose:** Brand introduction with visual impact before entering the app

**Layout:**
- Full-screen parallax background with subtle vertical movement
- Centered Scottland FC logo
- No header or navigation elements
- Background image should have slow upward drift (parallax effect)

**Animation:**
- Total duration: 1.5 seconds
- Logo fade-in during first 0.5s
- Background parallax movement throughout
- Fade-out transition to main app at 1.5s
- Use smooth easing curves for premium feel

**Safe Area:**
- No specific insets needed (full-screen experience)

### 2. Main WebView Screens (All Tabs)
**Purpose:** Display website content with native app feel

**Layout:**
- Header: Standard navigation header with page title matching current tab
  - Transparent background to blend with website
  - No left button (bottom tabs handle navigation)
  - Optional right button for refresh if needed
- Main content: Full WebView component filling available space
- Bottom tab bar: Always visible, 6 icons with labels

**WebView Configuration:**
- JavaScript enabled
- File upload and download support enabled
- Pull-to-refresh gesture active on all pages
- Local caching enabled for fast back/forward navigation
- Swipe gestures for native browser-like navigation
- Disable long-press text selection for app-only mode

**Loading States:**
- Show shimmer skeleton animation while page loads
- Shimmer elements:
  - Grey rectangular boxes for content placeholders
  - Title bar shimmer effect
  - Content area shimmer placeholders
  - Loading skeleton should match typical website layout patterns

**Error Handling:**
- Offline message screen when no internet connection
- Custom error screen for page load failures
- Retry button on error screens
- Clear messaging about connection status

**Safe Area Insets:**
- Top inset: insets.top + Spacing.md
- Bottom inset: tabBarHeight + Spacing.md
- Horizontal insets: Spacing.lg for content padding if needed

### 3. Gallery Tab (Special Case)
**Purpose:** Combined access to both Gallery and Videos

**Implementation:**
- Primary URL loads scottlandfc.club/gallery
- Include navigation or tabs within this view to access videos page
- Maintain smooth transitions between gallery and videos content

## Design System

### Color Palette
**Primary Colors** (derived from Scottland FC branding):
- Use Scottland FC team colors as primary accent
- Extract brand colors from logo: scottlandfc.club/storage/team-collection/01JR8SNKFR9EXNBYBBPNW1ZPHE.png
- Background: Website's native background colors
- Tab bar background: Subtle semi-transparent white/dark based on system theme

**Supporting Colors:**
- Shimmer grey: #E0E0E0 for loading skeletons
- Error red: System red for error states
- Offline grey: Muted grey for offline screens

### Typography
- Use website's native typography (rendered in WebView)
- Tab labels: System font, medium weight, 11-12pt
- Error messages: System font, 14-16pt
- Native headers: System bold, 17-18pt

### Visual Design

**Tab Bar Icons:**
- Use clear, recognizable system icons for each tab
- Home: House/home icon
- Fixtures: Calendar icon
- News: Newspaper/document icon
- Team: People/group icon
- Gallery: Image/photo icon
- More: Menu/ellipsis icon

**Shimmer Loading:**
- Smooth shimmer animation flowing from left to right
- Grey placeholder boxes with rounded corners (4-8px radius)
- Animation duration: 1-1.5s per cycle
- Subtle gradient overlay for shimmer effect

**Transitions:**
- Tab switching: Smooth cross-fade (200-300ms)
- Page loading: Fade-in content as it loads
- Pull-to-refresh: Elastic bounce animation
- Error screens: Gentle fade-in

**Touch Feedback:**
- Tab icons: Scale slightly (0.95) and opacity change when pressed
- Buttons in error screens: Subtle background color change
- All interactive elements have clear pressed states

### Critical Assets

**Required Assets:**
1. **Scottland FC Logo** - High-resolution PNG
   - Source: scottlandfc.club/storage/team-collection/01JR8SNKFR9EXNBYBBPNW1ZPHE.png
   - Usage: Splash screen centerpiece
   - Size: Large enough for crisp display on all devices

2. **Parallax Background**
   - Subtle, branded background image for splash screen
   - Should complement logo without overwhelming it
   - Tall enough to enable vertical parallax movement

3. **Offline/Error Illustrations** (optional)
   - Simple icon or illustration for no connection state
   - Can use system icons or minimal custom graphics

**App Icon:**
- Use Scottland FC logo or branded icon
- Follow iOS and Android icon guidelines
- Ensure clear visibility at all sizes

### Accessibility & Polish

**Native App Feel:**
- Smooth 60fps animations throughout
- Instant tab switching with preloaded WebViews if possible
- No visible WebView loading flicker
- Natural bounce/overscroll behavior
- Haptic feedback on tab switches (subtle)

**Automatic Theme Support:**
- Support dark mode if website supports it
- Tab bar adapts to system light/dark theme
- Maintain brand colors in both themes

**Performance:**
- Aggressive caching for visited pages
- Fast app launch (splash screen appears immediately)
- Smooth scrolling within WebView
- Optimized memory usage across tabs