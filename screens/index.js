import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./home.screen";
import FavorisScreen from "./favoris.screen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'blue', // Color of the selected tab
        tabBarInactiveTintColor: 'gray', // Color of the inactive tabs
        tabBarStyle: {
          backgroundColor: 'white', // Background color of the tabBar
          borderTopWidth: 1, // Top border width of the tabBar
          borderTopColor: 'lightgray', // Top border color of the tabBar
        },
        tabBarLabelStyle: {
          fontSize: 14, // Font size of the tab labels
          fontWeight: 'bold', // Font weight of the tab labels
        },
        // You can add more styling options as needed
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={FavorisScreen}
        options={{
          tabBarLabel: "favoris",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="heart-flash" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
