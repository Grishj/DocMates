import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppText, Header, PasswordInput, Spacer, Button } from '@components/index';
import { COLORS, SPACING } from '../../../theme';

export default function ChangePasswordScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSave = () => {
    // Implement validation/save logic here
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header 
        title="Change Password" 
        leftIcon={<Ionicons name="arrow-back" size={24} color="#000" />}
        leftAction={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="caption" color={COLORS.textSecondary} style={{ lineHeight: 22 }}>
          Your new password must be at least 8 characters long and contain a mix of letters and numbers.
        </AppText>
        
        <Spacer size="xl" />

        <PasswordInput 
          label="Current Password"
          placeholder="Enter current password"
          value={current}
          onChangeText={setCurrent}
        />
        <Spacer size="md" />

        <PasswordInput 
          label="New Password"
          placeholder="Enter new password"
          value={newPass}
          onChangeText={setNewPass}
        />
        <Spacer size="md" />

        <PasswordInput 
          label="Confirm New Password"
          placeholder="Repeat new password"
          value={confirm}
          onChangeText={setConfirm}
        />

        <Spacer size="xxxl" />

        <Button 
          title="Update Password" 
          onPress={handleSave}
          variant="primary"
          style={styles.saveBtn}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  content: {
    padding: SPACING.lg,
  },
  saveBtn: {
    paddingVertical: 14,
  }
});
