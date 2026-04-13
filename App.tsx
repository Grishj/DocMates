import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "@screens/auth/WelcomeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <WelcomeScreen />
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
