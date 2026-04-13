import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import {
  Header,
  WrapperContainer,
  AppText,
  Card,
  Row,
  Column,
  Box,
  Spacer,
  Avatar,
  Chip,
  Button,
  Divider,
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

// ─── Dummy Service Providers ───────────────────────────────────
const SERVICE_PROVIDERS = [
  {
    id: "1",
    name: "Grish Joshi",
    location: "Pokhara",
    campus: "Paschimanchal Campus",
    rating: 4.8,
    reviews: 198,
    services: ["Recommendation", "Admission"],
    description:
      "Final year engineering student at Paschimanchal Campus. Helping students with documentation and abroad studies.",
    phone: "9812345678",
    email: "grish.joshi@example.com",
    priceRange: "Rs. 500 - 1500", // ✅ ADD THIS

    avatar: null,
    verified: true,
  },
  {
    id: "2",
    name: "Suman Thapa",
    location: "Kathmandu",
    campus: "Pulchowk Campus",
    rating: 4.6,
    reviews: 87,
    services: ["Transcript", "Migration"],
    description:
      "Verified bartabandhi specializing in TU document facilitation. Over 3 years of experience in university documentation.",
    phone: "9823456789",
    email: "suman.thapa@example.com",
    avatar: null,
    verified: true,
    priceRange: "Rs. 500 - 1500", // ✅ ADD THIS

  },
  {
    id: "3",
    name: "Anisha Gurung",
    location: "Lalitpur",
    campus: "Thapathali Campus",
    rating: 4.9,
    reviews: 245,
    services: ["Recommendation", "Bonafide", "Character"],
    description:
      "Experienced education consultant helping students navigate college-level documentation processes efficiently.",
    phone: "9834567890",
    email: "anisha.gurung@example.com",
    avatar: null,
    verified: true,
    priceRange: "Rs. 500 - 1500", // ✅ ADD THIS

  },
  {
    id: "4",
    name: "Rajesh Adhikari",
    location: "Butwal",
    campus: "Bhairahawa Campus",
    rating: 4.3,
    reviews: 52,
    services: ["Admission", "Recommendation"],
    description:
      "ABC Education Consultancy — Helping students with documentation and abroad studies since 2019.",
    phone: "9845678901",
    email: "rajesh.adhikari@example.com",
    avatar: null,
    verified: false,
    priceRange: "Rs. free - 500", // ✅ ADD THIS

  },
];

// ─── Helper: resolve documents for a given service title ───────
function getDocumentsForService(serviceTitle: string) {
  const key = serviceTitle.toLowerCase().replace(/\s+/g, "");
  // Try direct match first
  for (const [mapKey, docs] of Object.entries(DOCUMENTS_MAP)) {
    if (key.includes(mapKey)) return docs;
  }
  // Fallback
  return DOCUMENTS_MAP.recommendation;
}

// ─── Star Rating Sub-component ─────────────────────────────────
function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <Row gap={1}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={size} color="#F59E0B" />
      ))}
      {hasHalf && <Ionicons name="star-half" size={size} color="#F59E0B" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={size}
          color="#D1D5DB"
        />
      ))}
    </Row>
  );
}

// ─── Provider Card Sub-component ───────────────────────────────
function ProviderCard({
  provider,
  onCall,
  onWhatsApp,
  onRequestService,
}: {
  provider: (typeof SERVICE_PROVIDERS)[0];
  onCall: () => void;
  onWhatsApp: () => void;
  onRequestService: () => void;
}) {
  return (
    <Card variant="elevated" style={styles.providerCard} padding={0}>
      <View style={styles.providerCardInner}>
        {/* ─── Provider Header ─────────────────────────── */}
        <Row gap={SPACING.md} align="flex-start">
          <Avatar
            size="xl"
            variant="circular"
            name={provider.name}
            backgroundColor={COLORS.primary}
            withShadow
          />
          <Column flex={1} gap={SPACING.xs}>
            <Row gap={SPACING.sm} align="center">
              <AppText
                variant="body"
                weight="bold"
                color="#000000"
                style={{ flex: 1 }}
                numberOfLines={1}
              >
                {provider.name}
              </AppText>
              <Row gap={SPACING.xs} align="center">
                <StarRating rating={provider.rating} />
                <AppText variant="micro" weight="semibold" color="#F59E0B">
                  {provider.rating}
                </AppText>
              </Row>
            </Row>

            <Row gap={SPACING.xs} align="center">
              <Ionicons
                name="location-outline"
                size={13}
                color={COLORS.textMuted}
              />
              <AppText variant="micro" color={COLORS.textMuted}>
                {provider.location} • {provider.campus}
              </AppText>
            </Row>

            {/* ─── Price Range ──────────────────────────── */}
            <Row gap={SPACING.xs} align="center">
              <Ionicons
                name="cash-outline"
                size={13}
                color={COLORS.success}
              />
              <AppText variant="micro" weight="semibold" color={COLORS.success}>
                {provider.priceRange}
              </AppText>
            </Row>

            <Spacer size="xs" />
            <AppText
              variant="caption"
              color={COLORS.textSecondary}
              numberOfLines={3}
              style={styles.providerDesc}
            >
              {provider.description}
            </AppText>
          </Column>
        </Row>

        {/* ─── Service Chips ───────────────────────────── */}
        <Spacer size="md" />
        <Row gap={SPACING.sm} wrap>
          {provider.services.map((service) => (
            <Chip
              key={service}
              label={service}
              variant="soft"
              size="sm"
              color={COLORS.primary}
              selected
            />
          ))}
          {provider.verified && (
            <Chip
              label="Verified"
              variant="soft"
              size="sm"
              color={COLORS.success}
              selected
              leftIcon={
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={COLORS.success}
                />
              }
            />
          )}
        </Row>

        {/* ─── Action Buttons ──────────────────────────── */}
        <Spacer size="lg" />
        <Row gap={SPACING.md}>
          <View style={{ flex: 1 }}>
            <Button
              title="Call"
              variant="primary"
              size="sm"
              onPress={onCall}
              fullWidth
              leftIcon={
                <Ionicons name="call-outline" size={14} color={COLORS.white} />
              }
              style={{ backgroundColor: "#2E7D32", borderColor: "#2E7D32" }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="WhatsApp"
              variant="primary"
              size="sm"
              onPress={onWhatsApp}
              fullWidth
              leftIcon={
                <Ionicons
                  name="logo-whatsapp"
                  size={14}
                  color={COLORS.white}
                />
              }
              style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
            />
          </View>
        </Row>

        {/* ─── View Profile Link ───────────────────────── */}
        <Spacer size="md" />
        <TouchableOpacity onPress={onRequestService} style={styles.viewProfileBtn}>
          <Ionicons
            name="send-outline"
            size={14}
            color={COLORS.primary}
          />
          <AppText
            variant="caption"
            weight="semibold"
            color={COLORS.primary}
            style={{ marginLeft: SPACING.xs }}
          >
            Request Service
          </AppText>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

// ─── Main Screen ───────────────────────────────────────────────
export default function CollegeServiceProvidersScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const serviceName = route?.params?.service ?? "Recommendation Letter";
  const collegeName = route?.params?.college ?? "";
  const requiredDocs = getDocumentsForService(serviceName);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = (phone: string) => {
    Linking.openURL(`https://wa.me/977${phone}`);
  };

  const renderHeader = () => (
    <>
      {/* ─── Title Section ───────────────────────────── */}
      <View style={styles.titleSection}>
        <AppText variant="h1" weight="bold" color="#000000" align="center">
          Available Service{"\n"}Providers
        </AppText>
        <Spacer size="sm" />
        <Row justify="center" gap={SPACING.xs}>
          <Ionicons
            name="document-text-outline"
            size={14}
            color={COLORS.textMuted}
          />
          <AppText variant="micro" color={COLORS.textMuted} align="center">
            Service: {serviceName}
            {collegeName ? ` | ${collegeName}` : ""}
          </AppText>
        </Row>
      </View>

      <Spacer size="lg" />

      {/* ─── Documents Required Card ─────────────────── */}
      <Card
        variant="flat"
        style={styles.docsCard}
        padding={SPACING.lg}
      >
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

      {/* ─── Note / Disclaimer Card ──────────────────── */}
      <Card
        variant="flat"
        style={styles.noteCard}
        padding={SPACING.lg}
      >
        <Row gap={SPACING.sm} align="center">
          <Ionicons name="information-circle-outline" size={18} color="#B84318" />
          <AppText variant="caption" weight="bold" color="#B84318">
            Note:
          </AppText>
        </Row>
        <Spacer size="sm" />
        <Column gap={SPACING.xs} style={styles.docsListWrap}>
          <Row gap={SPACING.sm} align="flex-start">
            <AppText variant="micro" color={COLORS.textMuted} style={{ marginTop: 1 }}>•</AppText>
            <AppText variant="micro" color={COLORS.textSecondary} style={{ flex: 1, lineHeight: 18 }}>
              The price listed is only the service charge the provider charges for processing — university/college  fees for documents  are separate.
            </AppText>
          </Row>
          <Row gap={SPACING.sm} align="flex-start">
            <AppText variant="micro" color={COLORS.textMuted} style={{ marginTop: 1 }}>•</AppText>
            <AppText variant="micro" color={COLORS.textSecondary} style={{ flex: 1, lineHeight: 18 }}>
              Delivery of documents to your location may incur additional charges.
            </AppText>
          </Row>
          <Row gap={SPACING.sm} align="flex-start">
            <AppText variant="micro" color={COLORS.textMuted} style={{ marginTop: 1 }}>•</AppText>
            <AppText variant="micro" color={COLORS.textSecondary} style={{ flex: 1, lineHeight: 18 }}>
              Photocopying, printing, and notary services are not included in the base service fee and will be charged separately.
            </AppText>
          </Row>
          <Row gap={SPACING.sm} align="flex-start">
            <AppText variant="micro" color={COLORS.textMuted} style={{ marginTop: 1 }}>•</AppText>
            <AppText variant="micro" color={COLORS.textSecondary} style={{ flex: 1, lineHeight: 18 }}>
              Service charges may vary depending on urgency (normal/express) and provider.
            </AppText>
          </Row>
          <Row gap={SPACING.sm} align="flex-start">
            <AppText variant="micro" color={COLORS.textMuted} style={{ marginTop: 1 }}>•</AppText>
            <AppText variant="micro" color={COLORS.textSecondary} style={{ flex: 1, lineHeight: 18 }}>
              Please confirm the total cost with the service provider before proceeding.
            </AppText>
          </Row>
        </Column>
      </Card>

      <Spacer size="xl" />
    </>
  );

  const renderFooter = () => (
    <>
      <Spacer size="xl" />

      {/* ─── Help CTA Section ────────────────────────── */}
      <Card variant="outlined" style={styles.helpCard} padding={SPACING.xl}>
        <Column align="center" gap={SPACING.sm}>
          <AppText
            variant="h2"
            weight="bold"
            color="#000000"
            align="center"
            style={{ fontSize: 17 }}
          >
            Need help with something else?
          </AppText>
          <AppText
            variant="caption"
            color={COLORS.textMuted}
            align="center"
            style={{ lineHeight: 20 }}
          >
            Our certified service providers can assist with{"\n"}a wide range of
            academic and legal documents{"\n"}within the T.U. system.
          </AppText>
          <Spacer size="sm" />
          <Button
            title="Browse all services →"
            variant="outline"
            size="sm"
            onPress={() => navigation.popToTop()}
          />
        </Column>
      </Card>

      <Spacer size="lg" />

      {/* ─── Emergency / Fast Track Card ─────────────── */}
      <Card
        variant="flat"
        style={styles.fastTrackCard}
        padding={SPACING.lg}
        onPress={() => { }}
      >
        <Row justify="space-between" align="center">
          <Column flex={1} gap={2}>
            <AppText
              variant="micro"
              weight="bold"
              color={COLORS.primary}
              style={{ letterSpacing: 1 }}
            >
              FAST TRACK
            </AppText>
            <AppText variant="body" weight="bold" color="#000000">
              Emergency Request?
            </AppText>
            <AppText variant="micro" color={COLORS.textMuted}>
              Get connected to a provider in{"\n"}under 5 mins.
            </AppText>
          </Column>
          <Box
            width={48}
            height={48}
            radius={RADIUS.full}
            bg={COLORS.primary}
            align="center"
            justify="center"
            shadow
          >
            <Ionicons name="flash" size={22} color={COLORS.white} />
          </Box>
        </Row>
      </Card>

      <Spacer size="xxxl" />
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        backgroundColor={COLORS.surface}
        variant="default"
      />

      <FlatList
        data={SERVICE_PROVIDERS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <Spacer size="lg" />}
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onCall={() => handleCall(item.phone)}
            onWhatsApp={() => handleWhatsApp(item.phone)}
            onRequestService={() => {
              navigation.navigate(ROUTES.CONFIRM_REQUEST, {
                service: serviceName,
                college: collegeName,
                university: route?.params?.university ?? "",
                provider: {
                  name: item.name,
                  location: item.location,
                  campus: item.campus,
                  priceRange: item.priceRange,
                  rating: item.rating,
                },
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },

  // Title section
  titleSection: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    alignItems: "center",
  },

  // Documents Required card
  docsCard: {
    backgroundColor: "#F9F5FF",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "#EDE7F6",
  },
  noteCard: {
    backgroundColor: "#FFF8F0",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },
  docsListWrap: {
    paddingLeft: SPACING.xs,
  },
  docBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Provider card
  providerCard: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  providerCardInner: {
    padding: SPACING.lg,
  },
  providerDesc: {
    fontSize: 13,
    lineHeight: 18,
  },

  // View Profile button
  viewProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },

  // Help CTA card
  helpCard: {
    borderRadius: RADIUS.lg,
    borderColor: COLORS.border,
  },

  // Fast track card
  fastTrackCard: {
    backgroundColor: "#FFF8F0",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },
});
