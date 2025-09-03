// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "@/store/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack initialRouteName="chooseTask" screenOptions={{ headerShown: false }}>
        {/* Choose task screen */}
        <Stack.Screen name="chooseTask" />

        {/* Task 1 flow (stack handled inside app/task1/_layout.tsx) */}
        <Stack.Screen name="task1" options={{ headerShown: false }} />

        {/* Task 2 flow (tabs handled inside app/task2/_layout.tsx) */}
        <Stack.Screen name="task2" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </AppProvider>
  );
}
