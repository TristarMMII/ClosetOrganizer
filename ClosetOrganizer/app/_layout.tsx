// app/_layout.tsx
import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Linking } from "react-native";
import * as SecureStore from "expo-secure-store";

// Support both Expo and Next-like env variable names, useful during dev.
const CLERK_PUBLISHABLE_KEY =
  (process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string) ||
  (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string) ||
  "";

const tokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
};

export default function RootLayout() {
  if (!CLERK_PUBLISHABLE_KEY) {
    // If the publishable key is missing, show a helpful message instead of crashing.
    // This prevents the runtime crash on web and makes it easier to see what went wrong.
    return (
      <>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#C53030', marginBottom: 8 }}>Missing Clerk Publishable Key</Text>
          <Text style={{ marginBottom: 8 }}>
            Please set <Text style={{ fontWeight: '700' }}>EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY</Text> in your environment (or use
            <Text style={{ fontWeight: '700' }}> NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</Text> as a fallback during local development) and restart the Expo dev server.
          </Text>
          <Text style={{ color: '#2563EB' }} onPress={() => Linking.openURL('https://dashboard.clerk.com/last-active?path=api-keys')}>
            Get your key at Clerk Dashboard → API Keys
          </Text>
        </View>
      </>
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <StatusBar style="dark" />

      {/* Your existing navigation stays exactly the same */}
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
