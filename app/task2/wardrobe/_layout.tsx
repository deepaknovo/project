import { Stack } from "expo-router";

export default function WardrobeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash2" />
      <Stack.Screen name="landingPage" />
      <Stack.Screen name="Wardrobe" /> {/* optional */}
    </Stack>
  );
}
