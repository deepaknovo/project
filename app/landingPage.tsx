import { AppContext } from "@/store/AppContext";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Dimensions,
  ImageBackground,
} from "react-native";
const { width, height } = Dimensions.get("window");

interface MappedSKU {
  SKUID: string;
  Gender: string;
  Cat: number;
}



export default function LandingPage() {
   
   const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://t03.tryndbuy.com/api/GetMappedSKUDetails", {
        method: "GET",
        headers: {
          authID: "3c643a25e11144ad",
        },
      });

     
      let json: any = await response.json();
      if (typeof json === "string") json = JSON.parse(json);
        dispatch({ type: "SET_API_DATA", payload: json.MappedSkuList || [] });


      console.log("API keys:", Object.keys(json));
 
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (skuId: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(`SKUID: ${skuId}`, ToastAndroid.SHORT);
    } else {
        alert(`SKUID: ${skuId}`);
      console.log(`SKUID: ${skuId}`);
    }
  }; 
  const LeftPanel = () => (
     <View style={styles.leftContainer}>
      {/* Background image */}
      <ImageBackground
        source={require("../assets/images/rectangle.png")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* Overlay Model */}
        <Image
          source={require("../assets/images/model.png")}
          style={styles.modelImage}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );

   const getCategoryName = (cat: any) => {
    switch (cat) {
      case 0:
        return "Dresses"; // fallback for now
      case 1:
        return "Tops";
      case 2:
        return "Pants";
      case 3:
        return "Jeans";
      default:
        return "Item";
    }
  };

  const renderItem = ({ item }: { item: MappedSKU }) => (
      <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => showToast(item.SKUID)}
      activeOpacity={0.7}
    >
      <View style={styles.circle}>
        <Image
          source={{ uri: `https://demo03.tryndbuy.com/images/Th${item.SKUID}.jpg` }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.label}>{getCategoryName(item.Cat)}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Left panel */}
      <View style={styles.leftPanel}>
        <LeftPanel></LeftPanel>
      </View>

      {/* Right panel with API data */}
      <View style={styles.rightPanel}>
        <FlatList
          data={state.apiData}
          renderItem={renderItem}
          keyExtractor={(item) => item.SKUID}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  leftPanel: {
    width: width * 0.5,
    backgroundColor: "#f1f1f1",
   
  },
    leftContainer: {
    flex: 1,
    // backgroundColor: "#000",
  },
  bgImage: {
   flex:1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modelImage: {
    width: "90%",
    height: height * 0.8, // adjust to fit
  },
  sideText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#fff",
    width: width * 0.5,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  circle: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    borderWidth: 2,
    borderColor: "#000",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
