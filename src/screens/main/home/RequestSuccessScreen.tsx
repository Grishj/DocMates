import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import {
  AppText,
  Card,
  Row,
  Column,
  Box,
  Spacer,
  Button,
} from "@components/index";

export default function RequestSuccessScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const service = route?.params?.service ?? "Service";
  const college = route?.params?.college ?? "";
  const provider = route?.params?.provider ?? {};
  const providerName = provider?.name ?? "Service Provider";

  // ─── Animations ──────────────────────────────────────────────
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.5)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Ring expand
    Animated.sequence([
      Animated.parallel([
        Animated.timing(ringScale, {
          toValue: 1.4,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(ringOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Circle pop in
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 80,
      delay: 100,
      useNativeDriver: true,
    }).start();

    // Checkmark appear
    Animated.timing(checkOpacity, {
      toValue: 1,
      duration: 300,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // Content fade in + slide up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Gentle pulse on the circle
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ─── Animated Success Circle ───────────────── */}
        <View style={styles.animationContainer}>
          {/* Expanding ring */}
          <Animated.View
            style={[
              styles.ring,
              {
                transform: [{ scale: ringScale }],
                opacity: ringOpacity,
              },
            ]}
          />

          {/* Main circle with checkmark */}
          <Animated.View
            style={[
              styles.successCircle,
              {
                transform: [
                  { scale: Animated.multiply(scaleAnim, pulseAnim) },
                ],
              },
            ]}
          >
            <Animated.View style={{ opacity: checkOpacity }}>
              <Ionicons name="checkmark" size={56} color={COLORS.white} />
            </Animated.View>
          </Animated.View>
        </View>

        {/* ─── Content ───────────────────────────────── */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <AppText variant="h1" weight="bold" color="#000000" align="center">
            Request Sent!
          </AppText>

          <Spacer size="sm" />

          <AppText
            variant="body"
            color={COLORS.textSecondary}
            align="center"
            style={styles.subtitle}
          >
            Your service request has been submitted successfully.
          </AppText>

          <Spacer size="xl" />

          {/* Request Summary Card */}
          <Card variant="outlined" style={styles.summaryCard} padding={SPACING.lg}>
            <Column gap={SPACING.md}>
              <Row gap={SPACING.sm} align="center">
                <Box
                  width={36}
                  height={36}
                  radius={RADIUS.sm}
                  bg="#FFF3E0"
                  align="center"
                  justify="center"
                >
                  <Ionicons name="document-text" size={18} color={COLORS.primary} />
                </Box>
                <Column flex={1} gap={1}>
                  <AppText variant="micro" color={COLORS.textMuted}>
                    Service
                  </AppText>
                  <AppText variant="caption" weight="semibold" color="#000000">
                    {service}
                  </AppText>
                </Column>
              </Row>

              {college ? (
                <Row gap={SPACING.sm} align="center">
                  <Box
                    width={36}
                    height={36}
                    radius={RADIUS.sm}
                    bg="#E8F5E9"
                    align="center"
                    justify="center"
                  >
                    <Ionicons name="school" size={18} color={COLORS.success} />
                  </Box>
                  <Column flex={1} gap={1}>
                    <AppText variant="micro" color={COLORS.textMuted}>
                      College
                    </AppText>
                    <AppText variant="caption" weight="semibold" color="#000000">
                      {college}
                    </AppText>
                  </Column>
                </Row>
              ) : null}

              <Row gap={SPACING.sm} align="center">
                <Box
                  width={36}
                  height={36}
                  radius={RADIUS.sm}
                  bg="#E8EAF6"
                  align="center"
                  justify="center"
                >
                  <Ionicons name="person" size={18} color={COLORS.navy} />
                </Box>
                <Column flex={1} gap={1}>
                  <AppText variant="micro" color={COLORS.textMuted}>
                    Provider
                  </AppText>
                  <AppText variant="caption" weight="semibold" color="#000000">
                    {providerName}
                  </AppText>
                </Column>
              </Row>
            </Column>
          </Card>

          <Spacer size="xl" />

          {/* Notification Info */}
          <Card variant="flat" style={styles.notifyCard} padding={SPACING.lg}>
            <Row gap={SPACING.md} align="center">
              <Box
                width={44}
                height={44}
                radius={RADIUS.full}
                bg="#E8F5E9"
                align="center"
                justify="center"
              >
                <Ionicons name="notifications-outline" size={22} color={COLORS.success} />
              </Box>
              <Column flex={1} gap={2}>
                <AppText variant="caption" weight="bold" color="#000000">
                  You'll be notified
                </AppText>
                <AppText
                  variant="micro"
                  color={COLORS.textMuted}
                  style={{ lineHeight: 18 }}
                >
                  Once the service provider accepts your request, you'll receive a notification with further instructions.
                </AppText>
              </Column>
            </Row>
          </Card>
        </Animated.View>

        {/* ─── Bottom Buttons ────────────────────────── */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Button
            title="Back to Home"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => navigation.popToTop()}
            leftIcon={
              <Ionicons name="home-outline" size={18} color={COLORS.white} />
            }
          />
          <Spacer size="sm" />
          <Button
            title="View My Requests"
            variant="outline"
            size="md"
            fullWidth
            onPress={() => {
              const newRequest = {
                id: `REQ-${Math.floor(Math.random() * 10000)}`,
                service,
                college,
                provider: providerName,
                date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                status: "Pending",
                priceRange: provider?.priceRange || "Rs. 500 - 1500",
                phone: provider?.phone,
                email: provider?.email,
              };
              navigation.popToTop();
              navigation.getParent()?.navigate(ROUTES.REQUEST, { newRequest });
            }}
          />
        </Animated.View>
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
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },

  // Animation area
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.lg,
  },
  ring: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.success,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },

  // Content
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  subtitle: {
    lineHeight: 22,
    maxWidth: "85%",
  },

  // Summary card
  summaryCard: {
    borderRadius: RADIUS.lg,
    borderColor: COLORS.border,
    width: "100%",
  },

  // Notify card
  notifyCard: {
    backgroundColor: "#F0FAF0",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "#C8E6C9",
    width: "100%",
  },

  // Bottom
  bottomSection: {
    paddingVertical: SPACING.lg,
  },
});
