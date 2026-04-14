import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";
import { AppText, Button, Spacer, WrapperContainer } from "../../components";
import { ROUTES } from "../../constants";

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <WrapperContainer scroll style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* ─── Top Bar ──────────────────────────────────── */}
      <View style={styles.topBar}>
        <AppText variant="h2" weight="bold" color={COLORS.primary}>
          DocsMate
        </AppText>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.SIGNIN)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppText variant="caption" weight="semibold" color={COLORS.textMuted}>
            Skip
          </AppText>
        </TouchableOpacity>
      </View>

      <Spacer size="xl" />

      {/* ─── Illustration ─────────────────────────────── */}
      <View style={styles.illustrationContainer}>
        <View style={styles.illustrationCard}>
          {/* Book stack */}
          <View style={styles.bookStack}>
            <View style={[styles.book, { backgroundColor: "#5C6BC0" }]} />
            <View style={[styles.book, { backgroundColor: "#7986CB" }]} />
            <View style={[styles.book, { backgroundColor: "#9FA8DA" }]} />
          </View>

          {/* Document */}
          <View style={styles.documentWrapper}>
            <View style={styles.document}>
              <View style={styles.docHeader} />
              <View style={styles.docLine} />
              <View style={[styles.docLine, { width: "60%" }]} />
              <View style={[styles.docLine, { width: "80%" }]} />
              <Spacer size="sm" />
              <View style={styles.docLine} />
              <View style={[styles.docLine, { width: "50%" }]} />
              <Spacer size="sm" />
              <View style={styles.stampArea}>
                <View style={styles.stamp} />
                <View style={styles.signatureLine} />
              </View>
            </View>
          </View>
        </View>
      </View>

      <Spacer size="xxl" />

      {/* ─── Tagline ──────────────────────────────────── */}
      <View style={styles.taglineContainer}>
        <AppText variant="h1" color={COLORS.textPrimary}>
          Your Documents,
        </AppText>
        <AppText variant="h1" color={COLORS.primary} style={styles.taglineAccent}>
          Our Responsibility.
        </AppText>
      </View>

      <Spacer size="md" />

      {/* ─── Body Text ────────────────────────────────── */}
      <AppText
        variant="body"
        color={COLORS.textSecondary}
        style={styles.bodyText}
      >
        Skip the queues at universities and government offices. We handle the
        bureaucracy so you never lose sight of your vital document registrations.
      </AppText>

      <Spacer size="xxxl" />

      {/* ─── CTA Button ───────────────────────────────── */}
      <Button
        title="Next  →"
        variant="primary"
        size="lg"
        fullWidth
        onPress={() => navigation.navigate(ROUTES.ONBOARDING)}
        style={styles.ctaButton}
      />

      <Spacer size="lg" />
    </WrapperContainer>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.sm,
  },

  // ─── Illustration ────────────────────────────────
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationCard: {
    width: width * 0.7,
    height: width * 0.75,
    backgroundColor: "#FFF3E0",
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bookStack: {
    position: "absolute",
    bottom: SPACING.xl,
    left: SPACING.xl,
    gap: 3,
  },
  book: {
    width: 60,
    height: 12,
    borderRadius: 2,
  },
  documentWrapper: {
    alignItems: "center",
  },
  document: {
    width: width * 0.4,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  docHeader: {
    width: "40%",
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    marginBottom: SPACING.sm,
    alignSelf: "center",
  },
  docLine: {
    width: "90%",
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: 6,
  },
  stampArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: SPACING.sm,
  },
  stamp: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
  },
  signatureLine: {
    width: 50,
    height: 2,
    backgroundColor: COLORS.textMuted,
    marginBottom: 4,
  },

  // ─── Tagline ─────────────────────────────────────
  taglineContainer: {
    gap: 2,
  },
  taglineAccent: {
    fontStyle: "italic",
  },

  // ─── Body ────────────────────────────────────────
  bodyText: {
    lineHeight: 24,
  },

  // ─── CTA ─────────────────────────────────────────
  ctaButton: {
    borderRadius: RADIUS.md,
  },
});
