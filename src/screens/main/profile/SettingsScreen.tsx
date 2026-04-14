import React, { useState } from 'react';
import { View, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppText, Header, Row, Column, Spacer, Card, Divider } from '@components/index';
import { ROUTES } from '../../../constants';
import { COLORS, SPACING, RADIUS } from '../../../theme';

export default function SettingsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header 
        title="Settings" 
        leftIcon={<Ionicons name="arrow-back" size={24} color="#000" />}
        leftAction={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="h3" weight="bold" color={COLORS.textPrimary}>
          Account Settings
        </AppText>
        <Spacer size="md" />

        <Card variant="flat" style={styles.card}>
          <TouchableOpacity 
            style={styles.settingRow} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE as any)}
          >
            <Row align="center" justify="space-between">
              <Row align="center" gap={SPACING.sm}>
                <Ionicons name="person-circle-outline" size={22} color={COLORS.textSecondary} />
                <AppText variant="body" color={COLORS.textPrimary}>Edit Profile</AppText>
              </Row>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </Row>
          </TouchableOpacity>

          <Divider />

          <TouchableOpacity 
            style={styles.settingRow} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD as any)}
          >
            <Row align="center" justify="space-between">
              <Row align="center" gap={SPACING.sm}>
                <Ionicons name="key-outline" size={22} color={COLORS.textSecondary} />
                <AppText variant="body" color={COLORS.textPrimary}>Change Password</AppText>
              </Row>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </Row>
          </TouchableOpacity>
        </Card>

        <Spacer size="xl" />

        <AppText variant="h3" weight="bold" color={COLORS.textPrimary}>
          Preferences
        </AppText>
        <Spacer size="md" />

        <Card variant="flat" style={styles.card}>
          <View style={styles.settingRow}>
            <Row align="center" justify="space-between">
              <Row align="center" gap={SPACING.sm}>
                <Ionicons name="notifications-outline" size={22} color={COLORS.textSecondary} />
                <Column>
                  <AppText variant="body" color={COLORS.textPrimary}>Push Notifications</AppText>
                  <AppText variant="micro" color={COLORS.textMuted}>Get updates on your requests</AppText>
                </Column>
              </Row>
              <Switch 
                value={notificationsEnabled} 
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#E0E0E0", true: COLORS.primary }}
              />
            </Row>
          </View>
        </Card>

        <Spacer size="xl" />

        <AppText variant="h3" weight="bold" color={COLORS.textPrimary}>
          About
        </AppText>
        <Spacer size="md" />

        <Card variant="flat" style={styles.card}>
          <TouchableOpacity style={styles.settingRow} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.TERMS_CONDITIONS as any)}>
            <Row align="center" justify="space-between">
              <Row align="center" gap={SPACING.sm}>
                <Ionicons name="document-text-outline" size={22} color={COLORS.textSecondary} />
                <AppText variant="body" color={COLORS.textPrimary}>Terms of Service</AppText>
              </Row>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </Row>
          </TouchableOpacity>
        </Card>

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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    padding: 0,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  settingRow: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
});
