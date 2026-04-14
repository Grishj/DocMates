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

const SignInScreen = () => {
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState("");
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
        <Spacer size="xl" />

        {/* ─── Icon ─────────────────────────────────────── */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <AppText variant="h1" align="center">
              🔐
            </AppText>
          </View>
        </View>

        <Spacer size="xl" />

        {/* ─── Title ────────────────────────────────────── */}
        <AppText variant="h1" weight="bold" color={COLORS.textPrimary}>
          Welcome Back
        </AppText>
        <AppText variant="caption" color={COLORS.primary} style={styles.nepaliSubtitle}>
          फिर्ता स्वागत छ
        </AppText>

        <Spacer size="xxl" />

        {/* ─── Phone Input ──────────────────────────────── */}
        <Input
          label="Phone Number (+977)"
          placeholder="98XXXXXXXX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          leftIcon={
            <AppText variant="caption" weight="semibold" color={COLORS.textSecondary}>
              +977
            </AppText>
          }
          variant="outlined"
          size="lg"
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
        />

        {/* Forgot password link */}
        <TouchableOpacity style={styles.forgotLink}>
          <AppText variant="micro" color={COLORS.primary} weight="semibold">
            email helper?
          </AppText>
        </TouchableOpacity>

        <Spacer size="xl" />

        {/* ─── Login Button ─────────────────────────────── */}
        <Button
          title="Login  ➜"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => {
            // Handle login
          }}
          style={styles.loginButton}
        />

        <Spacer size="xl" />

        {/* ─── Divider ──────────────────────────────────── */}
        <Divider label="or" spacing={SPACING.sm} />

        <Spacer size="lg" />

        {/* ─── Google OAuth ─────────────────────────────── */}
        <Button
          title="Continue with Google"
          variant="outline"
          size="lg"
          fullWidth
          onPress={() => {}}
          leftIcon={
            <AppText variant="body" style={{ marginRight: SPACING.xs }}>
              🔵
            </AppText>
          }
          style={styles.googleButton}
        />

        <Spacer size="xxl" />

        {/* ─── Sign Up Link ─────────────────────────────── */}
        <Row justify="center" gap={SPACING.xs}>
          <AppText variant="caption" color={COLORS.textMuted}>
            Don't have an account?
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.SIGNUP)}
          >
            <AppText variant="caption" weight="bold" color={COLORS.primary}>
              Sign Up →
            </AppText>
          </TouchableOpacity>
        </Row>

        <Spacer size="xl" />

        {/* ─── Skip Link ────────────────────────────────── */}
        <TouchableOpacity style={styles.skipLink}>
          <AppText variant="micro" color={COLORS.textMuted} align="center">
            Skip
          </AppText>
        </TouchableOpacity>

        <Spacer size="lg" />
      </View>
    </WrapperContainer>
  );
};

export default SignInScreen;

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

  // ─── Forgot ──────────────────────────────────────
  forgotLink: {
    alignSelf: "flex-end",
    marginTop: SPACING.sm,
  },

  // ─── Buttons ─────────────────────────────────────
  loginButton: {
    borderRadius: RADIUS.md,
  },
  googleButton: {
    borderRadius: RADIUS.md,
    borderColor: COLORS.border,
  },

  // ─── Skip ────────────────────────────────────────
  skipLink: {
    alignSelf: "center",
  },
});
