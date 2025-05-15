import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JobListScreen from "../screens/JobListScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function JobStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobList"
        component={JobListScreen}
        options={{ title: "Available Jobs" }}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetailsScreen}
        options={{ title: "Job Details" }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Jobs") {
            return <FontAwesome5 name="briefcase" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <FontAwesome name="user" size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <Tab.Screen name="Jobs" component={JobStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
