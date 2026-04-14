import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppText, Header, Spacer, Row } from '@components/index';
import { COLORS, SPACING } from '../../../theme';

export default function TermsConditionsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const SectionHeading = ({ children, isMain = false }: any) => (
    <>
      <Spacer size={isMain ? "xl" : "lg"} />
      <AppText variant={isMain ? "body" : "caption"} weight="bold" color="#000">
        {children}
      </AppText>
      <Spacer size="xs" />
    </>
  );

  const SubHeading = ({ children }: any) => (
    <>
      <Spacer size="md" />
      <AppText variant="caption" weight="bold" color="#333">
        {children}
      </AppText>
      <Spacer size="xs" />
    </>
  );

  const Paragraph = ({ children }: any) => (
    <>
      <AppText variant="caption" color={COLORS.textSecondary} style={styles.paragraph}>
        {children}
      </AppText>
      <Spacer size="xs" />
    </>
  );

  const BulletPoint = ({ children }: any) => (
    <View style={styles.bulletRow}>
      <AppText variant="caption" color={COLORS.textSecondary} style={styles.bulletDot}>•</AppText>
      <AppText variant="caption" color={COLORS.textSecondary} style={styles.bulletText}>
        {children}
      </AppText>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Terms and Conditions"
        leftIcon={<Ionicons name="arrow-back" size={24} color="#000" />}
        leftAction={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="caption" weight="bold">Last Updated: 15 July 2025</AppText>
        <Spacer size="md" />

        <Paragraph>Welcome to DocMate. Please read these Terms and Conditions (“Terms”) carefully before using our mobile application, website, or services.</Paragraph>
        <Paragraph>By accessing or using DocMate, you agree to be legally bound by these Terms. If you do not agree, you must not use the platform.</Paragraph>

        <SectionHeading isMain>1. Introduction</SectionHeading>
        <Paragraph>DocMate is a digital platform that connects students (“Users” or “Students”) with verified independent service providers (“DocMates” or “Runners”) who assist with university and college document-related services in Nepal, including but not limited to:</Paragraph>
        <BulletPoint>Transcripts</BulletPoint>
        <BulletPoint>Degree certificates</BulletPoint>
        <BulletPoint>Migration certificates</BulletPoint>
        <BulletPoint>Character certificates</BulletPoint>
        <BulletPoint>Other academic or administrative documents</BulletPoint>
        <Spacer size="sm" />
        <Paragraph>DocMate acts strictly as an intermediary platform and does not directly provide these services.</Paragraph>

        <SectionHeading isMain>2. Definitions</SectionHeading>
        <BulletPoint>Platform: The DocMate mobile application and related services</BulletPoint>
        <BulletPoint>User: Any individual using the app (Student or DocMate)</BulletPoint>
        <BulletPoint>Student: A user requesting document-related services</BulletPoint>
        <BulletPoint>DocMate (Runner): A verified individual performing services</BulletPoint>
        <BulletPoint>Order: A service request created by a Student</BulletPoint>

        <SectionHeading isMain>3. Eligibility</SectionHeading>
        <Paragraph>To use DocMate, you must:</Paragraph>
        <BulletPoint>Be at least 18 years old</BulletPoint>
        <BulletPoint>Provide accurate, complete, and current information</BulletPoint>
        <BulletPoint>Use the platform only for lawful purposes</BulletPoint>
        <Spacer size="sm" />
        <Paragraph>Additional conditions:</Paragraph>
        <BulletPoint>Students must be associated with a recognized institution in Nepal</BulletPoint>
        <BulletPoint>DocMates must pass identity verification, background checks, and platform approval</BulletPoint>

        <SectionHeading isMain>4. Account Registration & Security</SectionHeading>
        <BulletPoint>You are responsible for maintaining the confidentiality of your account</BulletPoint>
        <BulletPoint>You agree not to share login credentials</BulletPoint>
        <BulletPoint>Any activity under your account is your responsibility</BulletPoint>
        <BulletPoint>Notify us immediately of unauthorized access</BulletPoint>

        <SectionHeading isMain>5. User Roles & Responsibilities</SectionHeading>
        <SubHeading>5.1 Students agree to:</SubHeading>
        <BulletPoint>Provide accurate document details and instructions</BulletPoint>
        <BulletPoint>Upload genuine and valid documents</BulletPoint>
        <BulletPoint>Pay all applicable charges</BulletPoint>
        <BulletPoint>Cooperate with DocMates</BulletPoint>
        <BulletPoint>Accept delays caused by universities or external factors</BulletPoint>

        <SubHeading>5.2 DocMates agree to:</SubHeading>
        <BulletPoint>Perform services honestly and professionally</BulletPoint>
        <BulletPoint>Handle documents safely and confidentially</BulletPoint>
        <BulletPoint>Not misuse or tamper with documents</BulletPoint>
        <BulletPoint>Upload proof (receipts, photos, confirmations)</BulletPoint>
        <BulletPoint>Communicate clearly and respectfully</BulletPoint>

        <SectionHeading isMain>6. Orders & Service Flow</SectionHeading>
        <BulletPoint>Students create orders with required details</BulletPoint>
        <BulletPoint>DocMates accept orders voluntarily</BulletPoint>
        <BulletPoint>Once accepted, the task must be completed as agreed</BulletPoint>
        <BulletPoint>Order status updates must be maintained within the app</BulletPoint>

        <SectionHeading isMain>7. Payments & Charges</SectionHeading>
        <SubHeading>7.1 Payment Methods</SubHeading>
        <Paragraph>Payments must be made through approved channels such as:</Paragraph>
        <BulletPoint>eSewa</BulletPoint>
        <BulletPoint>Khalti</BulletPoint>
        <BulletPoint>IME Pay</BulletPoint>
        <BulletPoint>Bank Transfer</BulletPoint>

        <SubHeading>7.2 Platform Fees</SubHeading>
        <BulletPoint>DocMate charges a commission (15–25%) per completed order</BulletPoint>
        <BulletPoint>Service pricing may vary based on urgency, complexity, and location</BulletPoint>

        <SubHeading>7.3 Additional Charges</SubHeading>
        <Paragraph>The following are not included in base fees:</Paragraph>
        <BulletPoint>Photocopy charges</BulletPoint>
        <BulletPoint>Notary/attestation fees</BulletPoint>
        <BulletPoint>University/government processing fees</BulletPoint>
        <BulletPoint>Courier/delivery charges</BulletPoint>
        <Spacer size="xs" />
        <Paragraph>These must be paid separately with proof.</Paragraph>

        <Spacer size="xl" />
        <View style={styles.noticeBox}>
          <Row align="center" gap={SPACING.sm}>
            <Ionicons name="alert-circle" size={22} color="#D15000" />
            <AppText weight="bold" color="#D15000">
              8. Delivery & Charges Notice
            </AppText>
          </Row>
          <Spacer size="md" />
          <BulletPoint>Home delivery incurs additional charges</BulletPoint>
          <BulletPoint>Delivery fees depend on distance and urgency</BulletPoint>
          <BulletPoint>Estimated delivery times are not guaranteed</BulletPoint>
          <BulletPoint>Users must provide accurate delivery information</BulletPoint>
        </View>

        <SectionHeading isMain>9. Cancellation & Refunds</SectionHeading>
        <BulletPoint>Orders cannot be cancelled once accepted without valid reason</BulletPoint>
        <BulletPoint>Refunds are processed based on investigation</BulletPoint>
        <BulletPoint>Partial refunds may apply depending on work completed</BulletPoint>
        <BulletPoint>Refund timelines may vary</BulletPoint>

        <SectionHeading isMain>10. Verification & Trust</SectionHeading>
        <Paragraph>DocMate verifies DocMates using:</Paragraph>
        <BulletPoint>Government-issued ID</BulletPoint>
        <BulletPoint>Video verification</BulletPoint>
        <BulletPoint>Platform screening</BulletPoint>
        <Spacer size="sm" />
        <Paragraph>However:</Paragraph>
        <BulletPoint>We do not guarantee individual performance</BulletPoint>
        <BulletPoint>Users should review ratings and feedback</BulletPoint>

        <SectionHeading isMain>11. Zero Risk Guarantee</SectionHeading>
        <BulletPoint>Applicable only to selected orders</BulletPoint>
        <BulletPoint>Covers verified loss/damage caused by DocMates</BulletPoint>
        <BulletPoint>Compensation is limited and case-based</BulletPoint>
        <BulletPoint>Does not cover delays or incorrect submissions</BulletPoint>

        <SectionHeading isMain>12. Prohibited Conduct</SectionHeading>
        <Paragraph>Users must not:</Paragraph>
        <BulletPoint>Upload fake, forged, or illegal documents</BulletPoint>
        <BulletPoint>Harass or abuse others</BulletPoint>
        <BulletPoint>Create fake or multiple accounts</BulletPoint>
        <BulletPoint>Bypass platform payments</BulletPoint>
        <BulletPoint>Use the app for illegal activities</BulletPoint>
        <Spacer size="sm" />
        <Paragraph>Violation may result in:</Paragraph>
        <BulletPoint>Account suspension or termination</BulletPoint>
        <BulletPoint>Legal action</BulletPoint>

        <SectionHeading isMain>13. Data Privacy & Security</SectionHeading>
        <BulletPoint>We take reasonable measures to protect user data</BulletPoint>
        <BulletPoint>Documents are handled securely but not guaranteed risk-free</BulletPoint>
        <BulletPoint>Users are responsible for the content they upload</BulletPoint>

        <SectionHeading isMain>14. Third-Party Services</SectionHeading>
        <Paragraph>DocMate may integrate with:</Paragraph>
        <BulletPoint>Payment gateways</BulletPoint>
        <BulletPoint>Location services</BulletPoint>
        <BulletPoint>Notification systems</BulletPoint>
        <Spacer size="xs" />
        <Paragraph>We are not responsible for third-party performance or policies.</Paragraph>

        <SectionHeading isMain>15. Intellectual Property</SectionHeading>
        <Paragraph>All content including:</Paragraph>
        <BulletPoint>Logos</BulletPoint>
        <BulletPoint>Designs</BulletPoint>
        <BulletPoint>Code</BulletPoint>
        <BulletPoint>Branding</BulletPoint>
        <Spacer size="xs" />
        <Paragraph>belongs to DocMate and is protected by law.</Paragraph>

        <SectionHeading isMain>16. Disclaimers</SectionHeading>
        <BulletPoint>DocMate is a facilitator, not a service provider</BulletPoint>
        <BulletPoint>We do not guarantee service outcomes</BulletPoint>
        <Paragraph>We are not responsible for:</Paragraph>
        <BulletPoint>University delays</BulletPoint>
        <BulletPoint>Government policy changes</BulletPoint>
        <BulletPoint>External disruptions</BulletPoint>
        <Spacer size="xs" />
        <Paragraph>Use the platform at your own risk.</Paragraph>

        <SectionHeading isMain>17. Limitation of Liability</SectionHeading>
        <Paragraph>To the maximum extent permitted by law:</Paragraph>
        <BulletPoint>DocMate is not liable for indirect or consequential damages</BulletPoint>
        <BulletPoint>Total liability shall not exceed the amount paid for the order</BulletPoint>

        <SectionHeading isMain>18. Suspension & Termination</SectionHeading>
        <Paragraph>We reserve the right to:</Paragraph>
        <BulletPoint>Suspend or terminate accounts without notice</BulletPoint>
        <BulletPoint>Remove content or restrict access</BulletPoint>

        <SectionHeading isMain>19. Dispute Resolution</SectionHeading>
        <BulletPoint>Users agree to resolve disputes amicably first</BulletPoint>
        <BulletPoint>Unresolved disputes will be handled in Kathmandu courts</BulletPoint>

        <SectionHeading isMain>20. Governing Law</SectionHeading>
        <Paragraph>These Terms are governed by the laws of Nepal.</Paragraph>

        <SectionHeading isMain>21. Changes to Terms</SectionHeading>
        <BulletPoint>Terms may be updated at any time</BulletPoint>
        <BulletPoint>Users will be notified of major changes</BulletPoint>
        <BulletPoint>Continued use means acceptance</BulletPoint>

        <SectionHeading isMain>22. Contact Information</SectionHeading>
        <Paragraph>For support or questions:</Paragraph>
        <BulletPoint>📧 Email: support@docmate.com.np</BulletPoint>
        <BulletPoint>📞 Phone: +977-98XXXXXXXX</BulletPoint>

        <Spacer size="xxxl" />
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
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletDot: {
    width: 14,
  },
  bulletText: {
    flex: 1,
    lineHeight: 22,
  },
  noticeBox: {
    backgroundColor: '#FFF8F5',
    borderWidth: 1,
    borderColor: '#FCE4D6',
    borderRadius: 12,
    padding: SPACING.lg,
  },
});