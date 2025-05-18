import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <SafeAreaView className="flex-1 bg-transparent" edges={["left", "right"]}>
      {/* Custom Status Bar */}
      <StatusBar translucent backgroundColor="transparent" style="light" />

      <Tabs
        screenOptions={{
          tabBarBackground: () => (
            <BlurView
              intensity={100}
              style={{ flex: 1, backgroundColor: "#36250d" }}
              className="absolute top-0 bottom-0 left-0 right-0"
            />
          ),
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "transparent",
            elevation: 0,
          },
          tabBarActiveTintColor: "#e9cba7",
          tabBarInactiveTintColor: "#ffffff",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "600",
            paddingTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            title: "Store",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="storefront-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
