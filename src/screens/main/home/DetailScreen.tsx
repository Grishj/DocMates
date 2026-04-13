import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { Header, WrapperContainer, AppText, Card, Row, Column } from "@components/index";

export default function DetailScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        backgroundColor={COLORS.surface}
        variant="default"
      />
      <WrapperContainer scroll backgroundColor={COLORS.surface} edges={["left", "right", "bottom"]}>
        <View style={styles.headerSection}>
          <AppText style={styles.title}>Select Institution</AppText>
          <AppText style={styles.subtitleNp}>संस्था छनोट गर्नुहोस्</AppText>
          <AppText style={styles.description}>
            Select your institution type to proceed
          </AppText>
        </View>

        <View style={styles.cardsContainer}>
          {/* University Card */}
          <Card
            variant="flat"
            style={[styles.card, { borderLeftColor: "#B84318" }]}
            onPress={() => navigation.navigate(ROUTES.SELECT_UNIVERSITY)}
            padding={SPACING.lg}
          >
            <Column gap={SPACING.md}>
              <Row justify="space-between" align="flex-start">
                <View style={[styles.iconWrapper, { backgroundColor: "#F3E6E1" }]}>
                  <Ionicons name="business" size={24} color="#B84318" />
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
              </Row>
              <Column gap={2}>
                <AppText style={styles.cardTitle}>University</AppText>
                <AppText style={styles.cardSubtitleNp}>विश्वविद्यालय</AppText>
              </Column>
              <AppText style={styles.cardDesc}>
                Process official transcripts, character certificates, and migration documents from Tribhuvan University, Kathmandu University, and others.
              </AppText>
            </Column>
          </Card>

          {/* NEB Card */}
          <Card
            variant="flat"
            style={[styles.card, { borderLeftColor: COLORS.navy }]}
            onPress={() => navigation.navigate(ROUTES.CHECKOUT, { institutionType: "neb" })}
            padding={SPACING.lg}
          >
            <Column gap={SPACING.md}>
              <Row justify="space-between" align="flex-start">
                <View style={[styles.iconWrapper, { backgroundColor: "#E8EAF6" }]}>
                  <Ionicons name="school" size={24} color={COLORS.navy} />
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
              </Row>
              <Column gap={2}>
                <AppText style={styles.cardTitle}>NEB</AppText>
                <AppText style={styles.cardSubtitleNp}>राष्ट्रिय परीक्षा बोर्ड</AppText>
              </Column>
              <AppText style={styles.cardDesc}>
                National Examinations Board (Grade 11 & 12) academic verification and document procurement.
              </AppText>
            </Column>
          </Card>
        </View>
        <View style={{ height: 40 }} />
      </WrapperContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingVertical: SPACING.md,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: '#000000',
    marginBottom: 4,
  },
  subtitleNp: {
    fontFamily: FONTS.nepalisemibold,
    fontSize: 18,
    color: '#B84318',
    marginBottom: 20,
  },
  description: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: '#757575',
  },
  cardsContainer: {
    marginTop: SPACING.xl,
    gap: SPACING.lg,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: RADIUS.lg,
    borderLeftWidth: 4,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 22,
    color: '#000000',
  },
  cardSubtitleNp: {
    fontFamily: FONTS.nepali,
    fontSize: 15,
    color: '#424242',
  },
  cardDesc: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginTop: SPACING.xs,
  },
});
