// screens/HomeScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [warningVisible, setWarningVisible] = useState(true);
  const [selectedDay, setSelectedDay] = useState("MON");

  const colorsData = {
    SUN: { lucky: [{ color: "#FF5733", name: "Sunset Orange" }, { color: "#FFD700", name: "Gold" }], unlucky: [{ color: "#000000", name: "Black" }, { color: "#808080", name: "Gray" }] },
    MON: { lucky: [{ color: "#3498DB", name: "Sky Blue" }, { color: "#00CED1", name: "Turquoise" }], unlucky: [{ color: "#8B0000", name: "Dark Red" }, { color: "#4B0082", name: "Indigo" }] },
    TUE: { lucky: [{ color: "#2ECC71", name: "Emerald" }, { color: "#ADFF2F", name: "Green Yellow" }], unlucky: [{ color: "#808080", name: "Gray" }, { color: "#A9A9A9", name: "Dark Gray" }] },
    WED: { lucky: [{ color: "#9B59B6", name: "Amethyst" }, { color: "#DA70D6", name: "Orchid" }], unlucky: [{ color: "#A52A2A", name: "Brown" }, { color: "#8B4513", name: "Saddle Brown" }] },
    THU: { lucky: [{ color: "#F1C40F", name: "Yellow" }, { color: "#FFA500", name: "Orange" }], unlucky: [{ color: "#800080", name: "Purple" }, { color: "#4B0082", name: "Indigo" }] },
    FRI: { lucky: [{ color: "#E67E22", name: "Carrot" }, { color: "#FF6347", name: "Tomato" }], unlucky: [{ color: "#FF4500", name: "Orange Red" }, { color: "#8B0000", name: "Dark Red" }] },
    SAT: { lucky: [{ color: "#34495E", name: "Midnight Blue" }, { color: "#708090", name: "Slate Gray" }], unlucky: [{ color: "#2F4F4F", name: "Dark Slate Gray" }, { color: "#A9A9A9", name: "Dark Gray" }] },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={warningVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.warningText}>Warning</Text>
            <Text style={styles.warningTextDescription}>
              This is an auspicious color app. The colors and their meanings are intended to enhance various aspects of your life based on traditional beliefs.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setWarningVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.headerBar}>
        <Text style={styles.logo}>🎨 Lucky Colors</Text>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.dateText}>Monday, 3 March 2025</Text>
        <View style={styles.weekContainer}>
          {Object.keys(colorsData).map((day) => (
            <TouchableOpacity key={day} style={styles.dayBox} onPress={() => setSelectedDay(day)}>
              <Text style={styles.dayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.sectionBox}
          onPress={() => navigation.navigate("LuckyColorBoostScreen")} // เพิ่มการนำทางไปยังหน้า LuckyColorBoostScreen
        >
          <Text style={styles.sectionTitle}>🌟 Lucky Colors</Text>
          <View style={styles.colorRow}>
            {colorsData[selectedDay].lucky.map((colorData, index) => (
              <View key={index} style={styles.colorBarContainer}>
                <View style={[styles.colorBar, { backgroundColor: colorData.color }]}>
                  <Text style={styles.colorName}>{colorData.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>⚠️ Unlucky Colors</Text>
          <View style={styles.colorRow}>
            {colorsData[selectedDay].unlucky.map((colorData, index) => (
              <View key={index} style={styles.colorBarContainer}>
                <View style={[styles.colorBar, { backgroundColor: colorData.color }]}>
                  <Text style={styles.colorName}>{colorData.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: { width: 300, backgroundColor: "#eee9f8", padding: 20, borderRadius: 10, alignItems: "center" },
  warningText: { fontSize: 18, marginBottom: 10, fontWeight: "bold", color: "red" },
  warningTextDescription: { textAlign: "center", color: "#1F2940" },
  closeButton: { position: "absolute", top: 10, right: 10 },
  headerBar: { position: "absolute", top: 0, width: "100%", height: 200, backgroundColor: "#eee9f8", justifyContent: "center", paddingHorizontal: 20, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 },
  logo: { color: "#1F2940", fontSize: 24, fontWeight: "bold", position: "absolute", top: 20, left: 10 },
  mainContent: { flex: 1, alignItems: "flex-start", paddingHorizontal: 20, marginTop: 100 },
  dateText: { fontSize: 16, fontWeight: "normal", color: "#1F2940" },
  weekContainer: { flexDirection: "row", justifyContent: "space-around", width: "100%", paddingVertical: 10 },
  dayBox: { width: 50, height: 50, backgroundColor: "#5B3E90", borderRadius: 10, alignItems: "center", justifyContent: "center" },
  dayText: { fontSize: 13, fontWeight: "600", color: "white" },
  sectionBox: { width: "100%", padding: 10, marginTop: 20, borderRadius: 10, backgroundColor: "#f3f3f3", alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1F2940" },
  colorRow: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  colorBarContainer: { alignItems: "center", marginHorizontal: 5 },
  colorBar: { width: 100, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 5 }, 
  colorName: { color: "#fff", fontWeight: "bold", fontSize: 14 },  
});
