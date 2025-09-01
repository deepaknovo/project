import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AppProvider } from '@/store/AppContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AppProvider>
      <Stack 
      initialRouteName='chooseTask'
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" /> 
        <Stack.Screen name="introduction" />
        <Stack.Screen name="face-upload" />
        <Stack.Screen name="gallery" />
        <Stack.Screen name="success" />
        <Stack.Screen name="splash2" />
        <Stack.Screen name="landingPage" />
         <Stack.Screen name="chooseTask" />

      </Stack>
      <StatusBar style="auto" />
    </AppProvider>
  );
}