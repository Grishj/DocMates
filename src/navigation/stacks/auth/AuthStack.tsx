import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../../../constants";
import WelcomeScreen from "../../../screens/auth/WelcomeScreen";
import OnboardingScreen from "../../../screens/auth/OnboardingScreen";
import SignInScreen from "../../../screens/auth/SignInScreen";
import SignUpScreen from "../../../screens/auth/SignUpScreen";
import RoleSelectionScreen from "../../../screens/auth/RoleSelectionScreen";
import ProviderVerificationScreen from "../../../screens/auth/ProviderVerificationScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={ROUTES.SIGNIN} component={SignInScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.ROLE_SELECTION} component={RoleSelectionScreen} />
      <Stack.Screen name={ROUTES.PROVIDER_VERIFICATION} component={ProviderVerificationScreen} />
    </Stack.Navigator>
  );
}
