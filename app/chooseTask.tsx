
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from 'expo-router';


export default function ChooseTask() {

  const handleChoose = (task: number) => {
    router.push(task === 1 ? "/splash" : "/splash2");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Task</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleChoose(1)
          }
      >
        <Text style={styles.cardTitle}>Task 1</Text>
        <Text style={styles.cardSubtitle}>Face Upload Feature</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
            handleChoose(2) }
      >
        <Text style={styles.cardTitle}>Task 2</Text>
        <Text style={styles.cardSubtitle}>Landing Page with Grid</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 40,
  },
  card: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
});
