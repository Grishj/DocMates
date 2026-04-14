import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../theme";
import {
  AppText,
  Button,
  Spacer,
  WrapperContainer,
  Card,
} from "../../components";
import { ROUTES } from "../../constants";
import { useMode } from "../../store/ModeContext";

type RoleOption = "student" | "provider" | null;

const RoleSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const { setAppMode } = useMode();
  const [selectedRole, setSelectedRole] = useState<RoleOption>(null);

  const handleGetStarted = () => {
    if (selectedRole === "provider") {
      setAppMode("DartaSathi");
      navigation.navigate(ROUTES.PROVIDER_VERIFICATION);
    } else {
      setAppMode("Student");
      navigation.navigate(ROUTES.SIGNIN);
    }
  };

  return (
    <WrapperContainer scroll style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.content}>
        <Spacer size="xxxl" />

        {/* ─── Title ────────────────────────────────────── */}
        <AppText variant="h1" weight="bold" color={COLORS.textPrimary}>
          How would you like to use DocsMate?
        </AppText>

        <Spacer size="sm" />

        <AppText variant="body" color={COLORS.textSecondary}>
          Choose the role that best fits your needs. You can always change this
          later in settings.
        </AppText>

        <Spacer size="xxl" />

        {/* ─── Student Role Card ────────────────────────── */}
        <Card
          variant={selectedRole === "student" ? "outlined" : "elevated"}
          style={[
            styles.roleCard,
            selectedRole === "student" && styles.roleCardSelected,
          ]}
          onPress={() => setSelectedRole("student")}
          padding={0}
        >
          <View style={styles.roleCardContent}>
            {/* Icon */}
            <View style={[styles.roleIcon, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="school-outline" size={32} color="#f57c00" />
            </View>

            <Spacer size="md" />

            {/* Title */}
            <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
              Student / Service Seeker
            </AppText>

            <Spacer size="xs" />

            {/* Description */}
            <AppText variant="body" color={COLORS.textSecondary} style={styles.roleDescription}>
              I need help getting my transcripts, degrees, or certificates.
            </AppText>

            <Spacer size="md" />

            {/* Select link */}
            <TouchableOpacity onPress={() => setSelectedRole("student")}>
              <AppText
                variant="caption"
                weight="bold"
                color={selectedRole === "student" ? COLORS.primary : COLORS.textMuted}
              >
                Select this one →
              </AppText>
            </TouchableOpacity>
          </View>
        </Card>

        <Spacer size="lg" />

        {/* ─── Provider Role Card ───────────────────────── */}
        <Card
          variant={selectedRole === "provider" ? "outlined" : "elevated"}
          style={[
            styles.roleCard,
            selectedRole === "provider" && styles.roleCardSelected,
          ]}
          onPress={() => setSelectedRole("provider")}
          padding={0}
        >
          <View style={styles.roleCardContent}>
            {/* Icon */}
            <View style={[styles.roleIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="business-outline" size={32} color="#1976d2" />
            </View>

            <Spacer size="md" />

            {/* Title */}
            <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
              DocsMate / Service Provider
            </AppText>

            <Spacer size="xs" />

            {/* Description */}
            <AppText variant="body" color={COLORS.textSecondary} style={styles.roleDescription}>
              I want to help others and earn by facilitating document processes.
            </AppText>

            <Spacer size="sm" />

            {/* Bullet point */}
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <AppText variant="micro" color={COLORS.textMuted} style={styles.bulletText}>
                Validate facilitator on university and government offices
              </AppText>
            </View>
          </View>
        </Card>

        <Spacer size="xxxl" />

        {/* ─── Get Started Button ───────────────────────── */}
        <Button
          title="Get Started  →"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedRole}
          onPress={handleGetStarted}
          style={styles.ctaButton}
        />

        <Spacer size="lg" />

        {/* ─── Back Link ────────────────────────────────── */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backLink}
        >
          <AppText variant="caption" weight="semibold" color={COLORS.error} align="center">
            Back
          </AppText>
        </TouchableOpacity>

        <Spacer size="xxl" />
      </View>
    </WrapperContainer>
  );
};

export default RoleSelectionScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },

  // ─── Role Cards ──────────────────────────────────
  roleCard: {
    borderRadius: RADIUS.lg,
  },
  roleCardSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  roleCardContent: {
    padding: SPACING.xl,
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  roleDescription: {
    lineHeight: 22,
  },

  // ─── Bullet ──────────────────────────────────────
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: 18,
  },

  // ─── CTA ─────────────────────────────────────────
  ctaButton: {
    borderRadius: RADIUS.md,
  },

  // ─── Back ────────────────────────────────────────
  backLink: {
    alignSelf: "center",
  },
});
