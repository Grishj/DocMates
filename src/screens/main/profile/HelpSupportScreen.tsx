import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppText, Header, Row, Spacer, Card, Box } from '@components/index';
import { COLORS, SPACING, RADIUS } from '../../../theme';

const FAQs = [
  { q: "How long does the TU transcript take?", a: "Standard: 15-20 days. Express: 5-7 days." },
  { q: "Can I track my documents?", a: "Yes, you can track them in the Request History section." },
  { q: "What is DartaSathi Mode?", a: "A professional mode to earn money by assisting students." }
];

export default function HelpSupportScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header 
        title="Help & Support" 
        leftIcon={<Ionicons name="arrow-back" size={24} color="#000" />}
        leftAction={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="h3" weight="bold" color={COLORS.textPrimary}>
          Contact Us
        </AppText>
        <Spacer size="md" />

        <Card variant="flat" padding={SPACING.md} style={styles.card}>
          <TouchableOpacity style={styles.contactRow} activeOpacity={0.7}>
            <Row gap={SPACING.md} align="center">
              <Box width={36} height={36} radius={8} bg="#E8EAF6" align="center" justify="center">
                <Ionicons name="call" size={16} color="#3949AB" />
              </Box>
              <View>
                <AppText variant="caption" weight="bold" color="#000">Call Support</AppText>
                <AppText variant="micro" color={COLORS.textSecondary}>+977-9800000000</AppText>
              </View>
            </Row>
          </TouchableOpacity>
          <Spacer size="md" />
          <TouchableOpacity style={styles.contactRow} activeOpacity={0.7}>
            <Row gap={SPACING.md} align="center">
              <Box width={36} height={36} radius={8} bg="#E8F5E9" align="center" justify="center">
                <Ionicons name="logo-whatsapp" size={16} color="#2E7D32" />
              </Box>
              <View>
                <AppText variant="caption" weight="bold" color="#000">WhatsApp</AppText>
                <AppText variant="micro" color={COLORS.textSecondary}>Chat with our agents</AppText>
              </View>
            </Row>
          </TouchableOpacity>
        </Card>

        <Spacer size="xl" />

        <AppText variant="h3" weight="bold" color={COLORS.textPrimary}>
          Frequently Asked Questions
        </AppText>
        <Spacer size="md" />

        {FAQs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <AppText variant="caption" weight="bold" color="#000">{faq.q}</AppText>
            <Spacer size="xs" />
            <AppText variant="micro" color={COLORS.textSecondary} style={{ lineHeight: 18 }}>{faq.a}</AppText>
          </View>
        ))}

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
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  contactRow: {},
  faqItem: {
    backgroundColor: '#FFFFFF',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  }
});
