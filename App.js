import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Modal, View, Text, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MatchColorScreen from "./screens/MatchColorScreen";
import LuckyColorBoostScreen from "./screens/LuckyColorBoostScreen";
import DetailColorScreen from "./screens/Detail";
import SettingsScreen from "./screens/Settings";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const toggleCalendarModal = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home" 
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "MatchColor":
                iconName = "color-palette";
                break;
              case "Calendar":
                iconName = "calendar";
                break;
              case "Home":
                iconName = "home";
                break;
              case "DetailColor":
                iconName = "eye";
                break;
              case "Settings":
                iconName = "settings";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerLeft: route.name !== "Home" ? () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ) : null,
        })}
      >
        <Tab.Screen name="MatchColor" component={MatchColorScreen} />
        <Tab.Screen
          name="Calendar"
          component={LuckyColorBoostScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); 
              toggleCalendarModal(); 
            },
          }}
        />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="DetailColor" component={DetailColorScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>

      {/*ปฏิทิน */}
      <Modal
        visible={isCalendarVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleCalendarModal} 
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.calendarText}>ปฏิทิน Popup</Text>
            {/* ใส่ปฏิทิน */}
            <TouchableOpacity onPress={toggleCalendarModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  calendarText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
});
