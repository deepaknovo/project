// app/task2/_layout.tsx
import { Tabs } from "expo-router";
import { Image } from "react-native";


export default function Task2Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false, 
        tabBarStyle: {
        height: 80,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        backgroundColor: "#fff",
        width: "100%",
      } }}>
      
        <Tabs.Screen
          name={"wardrobe"}
          options={{
            title: "wardrobe",
            tabBarIcon: ({ focused ,size}) => (
              <Image
                source={require("../../assets/images/hanger.png")}
                style={{ width: size, height: size, tintColor: focused ? "#000" : "#888" }}
              />
            ),
          }}
        />
         <Tabs.Screen
          name={"Profile"}
          options={{
            title: "Profile",
            tabBarIcon: ({ focused ,size}) => (
              <Image
                source={require("../../assets/images/profile.png")}
                style={{ width: size, height: size, tintColor: focused ? "#000" : "#888" }}
              />
            ),
          }}
        />
         <Tabs.Screen
          name={"Friends"}
          options={{
            title: "Friends",
            tabBarIcon: ({ focused ,size}) => (
              <Image
                source={require("../../assets/images/friends.png")}
                style={{ width: size, height: size, tintColor: focused ? "#000" : "#888" }}
              />
            ),
          }}
        />

    </Tabs>
  );
}
