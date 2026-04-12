import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../../../constants";
import WelcomeScreen from "../../../screens/auth/WelcomeScreen";
import SignInScreen from "../../../screens/auth/SignInScreen";
import SignUpScreen from "../../../screens/auth/SignUpScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={ROUTES.SIGNIN} component={SignInScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
