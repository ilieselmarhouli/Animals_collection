import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router/js-tabs";
const ACTIVE = "#0B7A70";
const INACTIVE = "#8C90B4";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Animals",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="book"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="rocket-sharp"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
