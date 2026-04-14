import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "../../constants";
// Student Mode Screens
import HomeScreen from "../../screens/main/home/HomeScreen";
import OrderScreen from "../../screens/main/order/OrderScreen";
import InboxScreen from "../../screens/main/inbox/InboxScreen";
import ProfileStack from "../stacks/profile/ProfileStack";
import HomeStack from "../stacks/home/HomeStack";
// DartaSathi Mode Screens
import DartaSathiDashboardScreen from "../../screens/main/dartasathi/DartaSathiDashboardScreen";
import DartaSathiTasksScreen from "../../screens/main/dartasathi/DartaSathiTasksScreen";
import DartaSathiEarningsScreen from "../../screens/main/dartasathi/DartaSathiEarningsScreen";
import DartaSathiInboxScreen from "../../screens/main/dartasathi/DartaSathiInboxScreen";
// Context
import { useMode } from "../../store/ModeContext";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

// define icons per route
const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  // Student Mode
  [ROUTES.HOME]: { active: "home", inactive: "home-outline" },
  [ROUTES.REQUEST]: { active: "receipt", inactive: "receipt-outline" },
  [ROUTES.INBOX]: { active: "notifications", inactive: "notifications-outline" },
  [ROUTES.PROFILE]: { active: "person", inactive: "person-outline" },
  
  // DartaSathi Mode
  [ROUTES.DS_DASHBOARD]: { active: "grid", inactive: "grid-outline" },
  [ROUTES.DS_TASKS]: { active: "clipboard", inactive: "clipboard-outline" },
  [ROUTES.DS_EARNINGS]: { active: "cash", inactive: "cash-outline" },
  [ROUTES.DS_INBOX]: { active: "notifications", inactive: "notifications-outline" },
};

export default function MainTabs() {
  const insets = useSafeAreaInsets();
  const { appMode } = useMode();

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
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 4,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          if (!icons) return <Ionicons name="help-outline" size={size} color={color} />;
          const iconName = focused ? icons.active : icons.inactive;
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      {appMode === "Student" ? (
        <>
          <Tab.Screen name={ROUTES.HOME} component={HomeStack} options={{ title: "Home" }} />
          <Tab.Screen name={ROUTES.REQUEST} component={OrderScreen} options={{ title: "Requests" }} />
          <Tab.Screen name={ROUTES.INBOX} component={InboxScreen} options={{ title: "Inbox" }} />
          <Tab.Screen name={ROUTES.PROFILE} component={ProfileStack} options={{ title: "Profile" }} />
        </>
      ) : (
        <>
          <Tab.Screen name={ROUTES.DS_DASHBOARD} component={DartaSathiDashboardScreen} options={{ title: "Dashboard" }} />
          <Tab.Screen name={ROUTES.DS_TASKS} component={DartaSathiTasksScreen} options={{ title: "My Tasks" }} />
          <Tab.Screen name={ROUTES.DS_INBOX} component={DartaSathiInboxScreen} options={{ title: "Inbox" }} />
          <Tab.Screen name={ROUTES.PROFILE} component={ProfileStack} options={{ title: "Profile" }} />
        </>
      )}
    </Tab.Navigator>
  );
}
