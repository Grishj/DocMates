import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '@constants/index';

import ProfileScreen from '@screens/main/profile/ProfileScreen';
import SettingsScreen from '@screens/main/profile/SettingsScreen';
import EditProfileScreen from '@screens/main/profile/EditProfileScreen';
import ChangePasswordScreen from '@screens/main/profile/ChangePasswordScreen';
import HelpSupportScreen from '@screens/main/profile/HelpSupportScreen';
import PrivacyPolicyScreen from '@screens/main/profile/PrivacyPolicyScreen';
import TermsConditionsScreen from '@screens/main/profile/TermsConditionsScreen';
import RequestHistoryScreen from '@screens/main/profile/RequestHistoryScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfileScreen} />
      <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePasswordScreen} />
      <Stack.Screen name={ROUTES.HELP_SUPPORT} component={HelpSupportScreen} />
      <Stack.Screen name={ROUTES.PRIVACY_POLICY} component={PrivacyPolicyScreen} />
      <Stack.Screen name={ROUTES.TERMS_CONDITIONS} component={TermsConditionsScreen} />
      <Stack.Screen name={ROUTES.REQUEST_HISTORY} component={RequestHistoryScreen} />
    </Stack.Navigator>
  );
}
