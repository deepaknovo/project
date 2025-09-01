import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="introduction" />
        <Stack.Screen name="face-upload" />
        <Stack.Screen name="gallery" />
        <Stack.Screen name="success" />

      </Stack>
      <StatusBar style="auto" />
    </>
  );
}