import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import {
  Header,
  AppText,
  Card,
  Row,
  Column,
  Box,
  Spacer,
  Avatar,
  Chip,
  Button,
} from "@components/index";

// ─── Required Documents per Service ────────────────────────────
const DOCUMENTS_MAP: Record<string, { label: string; color: string }[]> = {
  recommendation: [
    { label: "Academic Transcript", color: "#E65100" },
    { label: "Citizenship Copy", color: "#1A237E" },
    { label: "CV/Resume", color: "#2E7D32" },
    { label: "Passport Size Photos", color: "#6A1B9A" },
  ],
  bonafide: [
    { label: "Student ID Card", color: "#E65100" },
    { label: "Admission Slip", color: "#1A237E" },
    { label: "Fee Receipt", color: "#2E7D32" },
  ],
  admission: [
    { label: "SLC/SEE Marksheet", color: "#E65100" },
    { label: "+2 Transcript", color: "#1A237E" },
    { label: "Citizenship Copy", color: "#2E7D32" },
    { label: "Migration Certificate", color: "#6A1B9A" },
    { label: "Passport Size Photos", color: "#00838F" },
  ],
  character: [
    { label: "Student ID Card", color: "#E65100" },
    { label: "Admission Slip", color: "#1A237E" },
    { label: "No Dues Certificate", color: "#2E7D32" },
    { label: "Passport Size Photos", color: "#6A1B9A" },
  ],
  transcript: [
    { label: "Exam Roll Number", color: "#E65100" },
    { label: "Marksheet (All Semesters)", color: "#1A237E" },
    { label: "Citizenship Copy", color: "#2E7D32" },
    { label: "Application Letter", color: "#6A1B9A" },
    { label: "Receipt of Fee Payment", color: "#00838F" },
  ],
  migration: [
    { label: "Original Transcript", color: "#E65100" },
    { label: "Character Certificate", color: "#1A237E" },
    { label: "Citizenship Copy", color: "#2E7D32" },
    { label: "No Dues Certificate", color: "#6A1B9A" },
    { label: "Passport Size Photos", color: "#00838F" },
  ],
  degree: [
    { label: "Original Transcript", color: "#E65100" },
    { label: "Provisional Certificate", color: "#1A237E" },
    { label: "Citizenship Copy", color: "#2E7D32" },
    { label: "Passport Size Photos", color: "#6A1B9A" },
    { label: "Convocation Fee Receipt", color: "#00838F" },
  ],
  exam: [
    { label: "Student ID Card", color: "#E65100" },
    { label: "Previous Semester Marksheet", color: "#1A237E" },
    { label: "Fee Voucher / Receipt", color: "#2E7D32" },
    { label: "Passport Size Photos", color: "#6A1B9A" },
  ],
  equivalence: [
    { label: "Original Marksheets", color: "#E65100" },
    { label: "Original Certificates", color: "#1A237E" },
    { label: "Citizenship / Passport Copy", color: "#2E7D32" },
    { label: "Application Form", color: "#6A1B9A" },
    { label: "Passport Size Photos", color: "#00838F" },
  ],
};

function getDocumentsForService(serviceTitle: string) {
  const key = serviceTitle.toLowerCase().replace(/\s+/g, "");
  for (const [mapKey, docs] of Object.entries(DOCUMENTS_MAP)) {
    if (key.includes(mapKey)) return docs;
  }
  return DOCUMENTS_MAP.recommendation;
}

// ─── Notes ─────────────────────────────────────────────────────
const NOTES = [
  "The price listed is only the service charge the provider charges for processing — university/college fees are separate.",
  "Delivery of documents to your location may incur additional charges.",
  "Photocopying, printing, and notary services are not included and will be charged separately.",
  "Service charges may vary depending on urgency (normal/express).",
  "Please confirm the total cost with the service provider before proceeding.",
  "You can send your documents to the service provider via WhatsApp or Email once they accept the request.",
];

// ─── Main Screen ───────────────────────────────────────────────
export default function ConfirmRequestScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const service = route?.params?.service ?? "Service";
  const college = route?.params?.college ?? "";
  const university = route?.params?.university ?? "";
  const provider = route?.params?.provider ?? {};
  const requiredDocs = getDocumentsForService(service);

  const handleConfirm = () => {
    navigation.navigate(ROUTES.REQUEST_SUCCESS, {
      service,
      college,
      university,
      provider,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        backgroundColor={COLORS.surface}
        variant="default"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Title ──────────────────────────────────── */}
        <View style={styles.titleSection}>
          <AppText variant="h1" weight="bold" color="#000000">
            Confirm Request
          </AppText>
          <Spacer size="xs" />
          <AppText variant="caption" color={COLORS.textMuted}>
            Review the details below before confirming your service request.
          </AppText>
        </View>

        <Spacer size="xl" />

        {/* ─── Service Details Card ───────────────────── */}
        <Card variant="elevated" style={styles.detailsCard} padding={SPACING.lg}>
          <Row gap={SPACING.sm} align="center">
            <Box
              width={40}
              height={40}
              radius={RADIUS.sm}
              bg="#FFF3E0"
              align="center"
              justify="center"
            >
              <Ionicons name="document-text" size={20} color={COLORS.primary} />
            </Box>
            <Column flex={1} gap={2}>
              <AppText variant="micro" color={COLORS.textMuted}>
                Service Requested
              </AppText>
              <AppText variant="body" weight="bold" color="#000000">
                {service}
              </AppText>
            </Column>
          </Row>

          <Spacer size="lg" />

          {/* College & University */}
          {college ? (
            <Row gap={SPACING.sm} align="center">
              <Box
                width={40}
                height={40}
                radius={RADIUS.sm}
                bg="#E8F5E9"
                align="center"
                justify="center"
              >
                <Ionicons name="school" size={20} color={COLORS.success} />
              </Box>
              <Column flex={1} gap={2}>
                <AppText variant="micro" color={COLORS.textMuted}>
                  College
                </AppText>
                <AppText variant="caption" weight="semibold" color="#000000">
                  {college}
                </AppText>
                {university ? (
                  <AppText variant="micro" color={COLORS.textMuted}>
                    {university}
                  </AppText>
                ) : null}
              </Column>
            </Row>
          ) : null}

          {/* Provider */}
          {provider?.name ? (
            <>
              <Spacer size="lg" />
              <Row gap={SPACING.sm} align="center">
                <Avatar
                  size="md"
                  variant="circular"
                  name={provider.name}
                  backgroundColor={COLORS.primary}
                />
                <Column flex={1} gap={2}>
                  <AppText variant="micro" color={COLORS.textMuted}>
                    Service Provider
                  </AppText>
                  <AppText variant="caption" weight="semibold" color="#000000">
                    {provider.name}
                  </AppText>
                  <Row gap={SPACING.xs} align="center">
                    <Ionicons name="location-outline" size={11} color={COLORS.textMuted} />
                    <AppText variant="micro" color={COLORS.textMuted}>
                      {provider.location} • {provider.campus}
                    </AppText>
                  </Row>
                </Column>
                {provider.priceRange ? (
                  <Chip
                    label={provider.priceRange}
                    variant="soft"
                    size="sm"
                    color={COLORS.success}
                    selected
                  />
                ) : null}
              </Row>
            </>
          ) : null}
        </Card>

        <Spacer size="xl" />

        {/* ─── Documents Required Card ───────────────── */}
        <Card variant="flat" style={styles.docsCard} padding={SPACING.lg}>
          <Row gap={SPACING.sm} align="center">
            <Box
              width={36}
              height={36}
              radius={RADIUS.sm}
              bg="#EDE7F6"
              align="center"
              justify="center"
            >
              <Ionicons name="clipboard-outline" size={18} color="#6A1B9A" />
            </Box>
            <AppText variant="body" weight="bold" color="#000000">
              Documents Required
            </AppText>
          </Row>

          <Spacer size="md" />

          <Column gap={SPACING.sm} style={styles.docsListWrap}>
            {requiredDocs.map((doc, index) => (
              <Row key={index} gap={SPACING.sm} align="center">
                <View
                  style={[styles.docBullet, { backgroundColor: doc.color }]}
                />
                <AppText variant="caption" color={COLORS.textSecondary}>
                  {doc.label}
                </AppText>
              </Row>
            ))}
          </Column>
        </Card>

        <Spacer size="xl" />

        {/* ─── Note / Disclaimer Card ────────────────── */}
        <Card variant="flat" style={styles.noteCard} padding={SPACING.lg}>
          <Row gap={SPACING.sm} align="center">
            <Ionicons name="information-circle-outline" size={18} color="#B84318" />
            <AppText variant="caption" weight="bold" color="#B84318">
              Important Note:
            </AppText>
          </Row>
          <Spacer size="sm" />
          <Column gap={SPACING.xs} style={styles.docsListWrap}>
            {NOTES.map((note, index) => (
              <Row key={index} gap={SPACING.sm} align="flex-start">
                <AppText variant="micro" color={COLORS.textMuted} style={{ marginTop: 1 }}>
                  •
                </AppText>
                <AppText
                  variant="micro"
                  color={COLORS.textSecondary}
                  style={{ flex: 1, lineHeight: 18 }}
                >
                  {note}
                </AppText>
              </Row>
            ))}
          </Column>
        </Card>

        <Spacer size="xxxl" />
      </ScrollView>

      {/* ─── Fixed Bottom Confirm Button ─────────────── */}
      <View style={styles.bottomBar}>
        <Button
          title="Confirm & Request Service"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleConfirm}
          leftIcon={
            <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.white} />
          }
        />
        <Spacer size="xs" />
        <AppText variant="micro" color={COLORS.textMuted} align="center">
          By confirming, you agree to DocMate's Terms of Service
        </AppText>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },

  titleSection: {
    paddingTop: SPACING.sm,
  },

  // Service details card
  detailsCard: {
    borderRadius: RADIUS.lg,
  },

  // Documents card
  docsCard: {
    backgroundColor: "#F9F5FF",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "#EDE7F6",
  },
  docsListWrap: {
    paddingLeft: SPACING.xs,
  },
  docBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Note card
  noteCard: {
    backgroundColor: "#FFF8F0",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
});
