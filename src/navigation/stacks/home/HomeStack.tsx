// src/navigation/stacks/home/HomeStack.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "@constants/index";

// screens
import HomeScreen from "@screens/main/home/HomeScreen";
import DetailScreen from "@screens/main/home/DetailScreen";
import RegistrationTypeScreen from "@screens/main/home/RegistrationTypeScreen";
import SelectCollegeScreen from "@screens/main/home/SelectCollegeScreen";
import SelectUniversityScreen from "@screens/main/home/SelectUniversityScreen";
import SelectCategoryScreen from "@screens/main/home/SelectCategoryScreen";
import CheckoutScreen from "@screens/main/home/CheckoutScreen";
import PaymentScreen from "@screens/main/home/PaymentScreen";
import OrderSuccessScreen from "@screens/main/home/OrderSuccessScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={ROUTES.DETAIL} component={DetailScreen} />
      <Stack.Screen name={ROUTES.CHECKOUT} component={CheckoutScreen} />
      <Stack.Screen name={ROUTES.SELECT_UNIVERSITY} component={SelectUniversityScreen} />
      <Stack.Screen name={ROUTES.SELECT_CATEGORY} component={SelectCategoryScreen} />
      <Stack.Screen name={ROUTES.REGISTRATION_TYPE} component={RegistrationTypeScreen} />
      <Stack.Screen name={ROUTES.SELECT_COLLEGE} component={SelectCollegeScreen} />
      <Stack.Screen name={ROUTES.PAYMENT} component={PaymentScreen} />
      <Stack.Screen
        name={ROUTES.ORDER_SUCCESS}
        component={OrderSuccessScreen}
      />
    </Stack.Navigator>
  );
}
