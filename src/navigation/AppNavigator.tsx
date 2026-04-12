import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./stacks/auth/AuthStack";
import MainTabs from "./tabs/MainTabs";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const isLoggedIn = true; // 👈 change to true to test MainTabs

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
