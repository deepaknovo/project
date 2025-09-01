import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SplashScreen2() {
  const rightMenuData = [
    { id: "1", label: "Dresses", icon: require("../assets/images/dress.png") },
    { id: "2", label: "Makeup", icon: require("../assets/images/brush.png") },
    { id: "3", label: "Goggles", icon: require("../assets/images/glasses.png") },
    { id: "4", label: "Shoes", icon: require("../assets/images/shoes.png") },
    { id: "5", label: "Location", icon: require("../assets/images/location.png") },
  ];

  const bottomMenuData = [
    { id: "1", label: "My Wardrobe", icon: require("../assets/images/hanger.png") },
    { id: "2", label: "My Profile", icon: require("../assets/images/profile.png") },
    { id: "3", label: "Friends", icon: require("../assets/images/friends.png") },
  ];

   useEffect(() => {
    
  
      // Navigate to introduction after 3 seconds
      const timer = setTimeout(() => {
        router.replace('/landingPage');
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);

  const LeftPanel = () => (
    <View style={styles.leftContainer}>
      <Image
        source={require("../assets/images/model.png")}
        style={styles.modelImage}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="stretch"
        source={require("../assets/images/rectangle.png")}
      >
        {/* Left side model */}
        <LeftPanel />

        {/* Right Menu */}
        <View style={styles.rightMenu}>
          <FlatList
            data={rightMenuData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={styles.menuItem}
                
              >
                <View style={styles.icon}>
                  <Image
                    resizeMode="center"
                    source={item.icon}
                    style={styles.imageIcon}
                  />
                </View>
                <Text style={styles.menuText}>{item.label}</Text>
              </View>
            )}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </ImageBackground>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        {bottomMenuData.map((item) => (
          <View key={item.id} style={styles.bottomItem}>
            <Image source={item.icon} style={styles.bottomIcon} />
            <Text style={styles.bottomText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: height * 0.9,
  },
  leftContainer: {
    width: width * 0.5,
    height: "100%",
  },
  modelImage: {
    marginTop: 20,
    width: "100%",
    height: height * 0.9,
    overflow: "hidden",
  },
  rightMenu: {
    width: width * 0.3,
    backgroundColor: "rgba(255,255,255,0.6)",
    // justifyContent: "space-evenly",
    alignItems: "center",
    // flex:0.8,
    alignContent:"flex-end",
    paddingTop:40,
    justifyContent: "center",
  },
  menuItem: {
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageIcon: {
    width: 40,
    height: 40,
  },
  menuText: {
    marginTop: 5,
    backgroundColor: "rgba(0,0,0,0.38)",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 2,
    fontSize: 14,
    textAlign: "center",
  },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    width: "100%",
  },
  bottomItem: {
    alignItems: "center",
    marginHorizontal: 20,
   
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: 5,
  },
  bottomText: {
    fontSize: 12,
    color: "#000",
  },
});
