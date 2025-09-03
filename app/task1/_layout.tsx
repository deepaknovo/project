// app/task1/_layout.tsx
import { Stack } from "expo-router";

export default function Task1Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="introduction" />
      <Stack.Screen name="face-upload" />
      <Stack.Screen name="gallery" />
      <Stack.Screen name="success" />
    </Stack>
  );
}
