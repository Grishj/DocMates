import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "../../constants";
import HomeScreen from "../../screens/main/home/HomeScreen";
import OrderScreen from "../../screens/main/order/OrderScreen";
import InboxScreen from "../../screens/main/inbox/InboxScreen";
import ProfileScreen from "../../screens/main/profile/ProfileScreen";
import HomeStack from "../stacks/home/HomeStack";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"; // ← expo managed
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

// define icons per route
const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  [ROUTES.HOME]: {
    active: "home",
    inactive: "home-outline",
  },
  [ROUTES.ORDER]: {
    active: "receipt",
    inactive: "receipt-outline",
  },
  [ROUTES.INBOX]: {
    active: "storefront",
    inactive: "storefront-outline",
  },
  [ROUTES.PROFILE]: {
    active: "person",
    inactive: "person-outline",
  },
};

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#E65100", // brand orange
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          height: 60 + insets.bottom, // ← adds gesture bar height automatically
          paddingBottom: insets.bottom + 4, // ← adds safe area + extra padding
          paddingTop: 6,
        },

        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.active : icons.inactive;
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeStack} />
      <Tab.Screen name={ROUTES.ORDER} component={OrderScreen} options={{ title: "Orders" }} />
      <Tab.Screen name={ROUTES.INBOX} component={InboxScreen} options={{ title: "Marketplace" }} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
