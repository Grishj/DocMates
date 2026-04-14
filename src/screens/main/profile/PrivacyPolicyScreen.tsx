import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppText, Header, Spacer } from '@components/index';
import { COLORS, SPACING } from '../../../theme';

export default function PrivacyPolicyScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header 
        title="Privacy Policy" 
        leftIcon={<Ionicons name="arrow-back" size={24} color="#000" />}
        leftAction={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="caption" weight="bold" color="#000">
          Last Updated: Oct 2023
        </AppText>
        <Spacer size="md" />

        <AppText variant="caption" color={COLORS.textSecondary} style={styles.paragraph}>
          Welcome to SajiloDarta ("DocMate"). We are committed to protecting your personal information and your right to privacy.
        </AppText>
        
        <Spacer size="md" />
        <AppText variant="body" weight="bold" color="#000">1. Information we collect</AppText>
        <Spacer size="xs" />
        <AppText variant="caption" color={COLORS.textSecondary} style={styles.paragraph}>
          We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.
        </AppText>

        <Spacer size="md" />
        <AppText variant="body" weight="bold" color="#000">2. How we use your information</AppText>
        <Spacer size="xs" />
        <AppText variant="caption" color={COLORS.textSecondary} style={styles.paragraph}>
          We use personal information collected via our App for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests.
        </AppText>

        <Spacer size="md" />
        <AppText variant="body" weight="bold" color="#000">3. Will your information be shared?</AppText>
        <Spacer size="xs" />
        <AppText variant="caption" color={COLORS.textSecondary} style={styles.paragraph}>
          We only share and disclose your information with the following third parties: trusted university service providers, payment processors, and DartaSathi agents strictly for completing your requests.
        </AppText>

        <Spacer size="xl" />
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
  paragraph: {
    lineHeight: 22,
  }
});
