import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SPACING, RADIUS } from "../../theme";
import {
  AppText,
  Button,
  Input,
  PasswordInput,
  Spacer,
  WrapperContainer,
  Divider,
  Row,
  Header,
} from "../../components";
import { ROUTES } from "../../constants";

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <WrapperContainer
      scroll
      keyboardAvoiding
      style={styles.container}
      edges={["top"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* ─── Header ───────────────────────────────────── */}
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        title="SajiloDarta Application"
        variant="transparent"
        titleStyle={styles.headerTitle}
      />

      <View style={styles.content}>
        <Spacer size="lg" />

        {/* ─── Icon ─────────────────────────────────────── */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <AppText variant="h1" align="center">
              👤
            </AppText>
          </View>
        </View>

        <Spacer size="xl" />

        {/* ─── Title ────────────────────────────────────── */}
        <AppText variant="h1" weight="bold" color={COLORS.textPrimary} align="center">
          Create Account
        </AppText>
        <AppText variant="caption" color={COLORS.primary} align="center" style={styles.nepaliSubtitle}>
          खाता सिर्जना गर्नुहोस्
        </AppText>

        <Spacer size="xxl" />

        {/* ─── Full Name Input ──────────────────────────── */}
        <Input
          label="Full Name (पूरा नाम)"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          variant="outlined"
          size="lg"
          leftIcon={
            <AppText variant="caption" color={COLORS.textMuted}>
              👤
            </AppText>
          }
        />

        <Spacer size="lg" />

        {/* ─── Phone Input ──────────────────────────────── */}
        <Input
          label="Phone Number (+977)"
          placeholder="98XXXXXXXX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          variant="outlined"
          size="lg"
          leftIcon={
            <AppText variant="caption" weight="semibold" color={COLORS.textSecondary}>
              +977
            </AppText>
          }
        />

        <Spacer size="lg" />

        {/* ─── Email Input ──────────────────────────────── */}
        <Input
          label="Email"
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          variant="outlined"
          size="lg"
          leftIcon={
            <AppText variant="caption" color={COLORS.textMuted}>
              ✉️
            </AppText>
          }
        />

        <Spacer size="lg" />

        {/* ─── Password Input ───────────────────────────── */}
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          variant="outlined"
          size="lg"
          showPasswordStrength
        />

        <Spacer size="xl" />

        {/* ─── Sign Up Button ───────────────────────────── */}
        <Button
          title="Sign Up  →"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => navigation.navigate(ROUTES.ROLE_SELECTION)}
          style={styles.signUpButton}
        />

        <Spacer size="xl" />

        {/* ─── Divider ──────────────────────────────────── */}
        <Divider label="or" spacing={SPACING.sm} />

        <Spacer size="lg" />

        {/* ─── Social Login Icons ───────────────────────── */}
        <Row justify="center" gap={SPACING.xl}>
          <TouchableOpacity style={styles.socialIcon}>
            <AppText variant="h2">📘</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <AppText variant="h2">🔵</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <AppText variant="h2">📧</AppText>
          </TouchableOpacity>
        </Row>

        <Spacer size="xxl" />

        {/* ─── Login Link ───────────────────────────────── */}
        <Row justify="center" gap={SPACING.xs}>
          <AppText variant="caption" color={COLORS.textMuted}>
            Already have an account?
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.SIGNIN)}
          >
            <AppText variant="caption" weight="bold" color={COLORS.primary}>
              Login →
            </AppText>
          </TouchableOpacity>
        </Row>

        <Spacer size="xxl" />
      </View>
    </WrapperContainer>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  headerTitle: {
    fontSize: 14,
  },

  // ─── Icon ────────────────────────────────────────
  iconContainer: {
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Title ───────────────────────────────────────
  nepaliSubtitle: {
    marginTop: 2,
  },

  // ─── Buttons ─────────────────────────────────────
  signUpButton: {
    borderRadius: RADIUS.md,
  },

  // ─── Social ──────────────────────────────────────
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
