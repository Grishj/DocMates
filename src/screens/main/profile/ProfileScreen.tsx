import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../../theme";
import { AppText, Card, Row, Column, Box, Spacer, Avatar } from "@components/index";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"Student" | "DartaSathi">("Student");
  const [isOnline, setIsOnline] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ─── Profile Header ────────────────────────────────────────── */}
        <Column align="center" style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
              style={styles.avatarImage}
            />
            {/* Verification Badge */}
            <View style={styles.badgeContainer}>
              <Ionicons name="checkmark-circle" size={18} color="#C24F00" />
            </View>
          </View>

          <Spacer size="xs" />
          <AppText variant="h3" weight="bold" color="#000000">
            Sajilo User
          </AppText>
          <AppText variant="caption" color={COLORS.textSecondary}>
            Consumer Account
          </AppText>
        </Column>

        <Spacer size="xl" />

        {/* ─── Mode Switcher ─────────────────────────────────────────── */}
        <View style={styles.modeSwitcherWrap}>
          <TouchableOpacity
            style={[styles.modeTab, activeTab === "Student" && styles.modeTabActive]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("Student")}
          >
            <AppText
              variant="caption"
              weight={activeTab === "Student" ? "bold" : "semibold"}
              color={activeTab === "Student" ? COLORS.white : COLORS.textSecondary}
              align="center"
            >
              Student Mode
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeTab, activeTab === "DartaSathi" && styles.modeTabActive]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("DartaSathi")}
          >
            <AppText
              variant="caption"
              weight={activeTab === "DartaSathi" ? "bold" : "semibold"}
              color={activeTab === "DartaSathi" ? COLORS.white : COLORS.textSecondary}
              align="center"
            >
              DartaSathi Mode
            </AppText>
          </TouchableOpacity>
        </View>

        <Spacer size="lg" />

        {/* ─── Saved Documents ───────────────────────────────────────── */}
        <Card variant="flat" padding={SPACING.lg} style={styles.savedDocsCard}>
          <Row justify="space-between" align="center">
            <Row gap={SPACING.md} align="center">
              <Box width={40} height={40} radius={RADIUS.md} bg="#0066FF" align="center" justify="center">
                <Ionicons name="folder" size={20} color={COLORS.white} />
              </Box>
              <Column>
                <AppText variant="body" weight="bold" color="#000000">
                  Saved Documents
                </AppText>
                <AppText variant="micro" color={COLORS.textSecondary}>
                  12 Files Encrypted
                </AppText>
              </Column>
            </Row>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
          </Row>
        </Card>

        <Spacer size="md" />

        {/* ─── Grid Menu (Order History / Settings) ──────────────────── */}
        <Row gap={SPACING.md}>
          <Card variant="flat" padding={SPACING.lg} style={styles.gridCard}>
            <Ionicons name="receipt-outline" size={24} color="#5C6BC0" style={styles.gridIcon} />
            <Spacer size="md" />
            <AppText variant="caption" weight="bold" color="#000000">
              {activeTab === "DartaSathi" ? "Order History" : "Request History"}
            </AppText>
            <Spacer size="xxs" />
            <AppText variant="micro" color={COLORS.textMuted} style={styles.gridDesc}>
              View previous registrations
            </AppText>
          </Card>

          <Card variant="flat" padding={SPACING.lg} style={styles.gridCard}>
            <Ionicons name="settings-outline" size={24} color="#8D6E63" style={styles.gridIcon} />
            <Spacer size="md" />
            <AppText variant="caption" weight="bold" color="#000000">
              Settings
            </AppText>
            <Spacer size="xxs" />
            <AppText variant="micro" color={COLORS.textMuted} style={styles.gridDesc}>
              Security &{"\n"}Preferences
            </AppText>
          </Card>
        </Row>

        <Spacer size="md" />

        {/* ─── Referral Code ─────────────────────────────────────────── */}
        <View style={styles.referralCard}>
          <Row justify="space-between" align="flex-start">
            <Column gap={2}>
              <AppText variant="micro" weight="bold" color="#FFE0B2" style={{ letterSpacing: 0.5 }}>
                REFERRAL CODE
              </AppText>
              <AppText variant="h2" weight="bold" color={COLORS.white}>
                DD-NEP100
              </AppText>
            </Column>
            <TouchableOpacity style={styles.copyButton}>
              <Ionicons name="copy-outline" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </Row>
          <Spacer size="sm" />
          <AppText variant="micro" color="#FFE0B2">
            Share with friends to get NPR 100 credit.
          </AppText>
        </View>

        <Spacer size="md" />

        {/* ─── Estimated Earnings (DartaSathi Mode Only) ─────────────── */}
        {activeTab === "DartaSathi" && (
          <View style={styles.earningsCard}>
            <Row justify="space-between" align="center">
              <Column>
                <AppText variant="micro" weight="bold" color="#7986CB" style={{ letterSpacing: 0.5 }}>
                  ESTIMATED EARNINGS
                </AppText>
                <AppText variant="h2" weight="bold" color="#283593">
                  NPR 4,250
                </AppText>
              </Column>
              <Column align="flex-end" gap={4}>
                <AppText variant="micro" weight="bold" color="#7986CB" style={{ fontSize: 9 }}>
                  AVAILABILITY
                </AppText>
                <TouchableOpacity
                  style={[styles.onlineBadge, !isOnline && { borderColor: '#FFEBEE' }]}
                  onPress={() => setIsOnline(!isOnline)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.onlineDot, !isOnline && { backgroundColor: '#D32F2F' }]} />
                  <AppText
                    variant="micro"
                    weight="bold"
                    color={isOnline ? "#388E3C" : "#D32F2F"}
                    style={{ fontSize: 10 }}
                  >
                    {isOnline ? "ONLINE" : "OFFLINE"}
                  </AppText>
                </TouchableOpacity>
              </Column>
            </Row>

            <Spacer size="lg" />

            {/* Progress Bar Area */}
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Spacer size="xs" />
            <Row justify="space-between">
              <AppText variant="micro" weight="semibold" color="#3949AB">
                Weekly Target
              </AppText>
              <AppText variant="micro" weight="semibold" color="#3949AB">
                75% Complete
              </AppText>
            </Row>
          </View>
        )}

        <Spacer size="xl" />

        {/* ─── Bottom Actions ────────────────────────────────────────── */}
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
          <Row gap={SPACING.md} align="center">
            <Box width={24} height={24} radius={6} bg="#FFE0B2" align="center" justify="center">
              <Ionicons name="help" size={14} color="#E65100" />
            </Box>
            <AppText variant="caption" weight="bold" color="#000000" style={{ flex: 1 }}>
              Help & Support
            </AppText>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </Row>
        </TouchableOpacity>

        <View style={styles.actionDivider} />

        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
          <Row gap={SPACING.md} align="center">
            <Box width={24} height={24} radius={6} bg="#FFCCBC" align="center" justify="center">
              <Ionicons name="shield-checkmark" size={12} color="#D84315" />
            </Box>
            <AppText variant="caption" weight="bold" color="#000000" style={{ flex: 1 }}>
              Privacy Policy
            </AppText>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </Row>
        </TouchableOpacity>

        <View style={styles.actionDivider} />

        <TouchableOpacity style={[styles.actionRow, { paddingBottom: 0 }]} activeOpacity={0.7}>
          <Row gap={SPACING.md} align="center">
            <Ionicons name="log-out-outline" size={24} color="#D32F2F" />
            <AppText variant="caption" weight="bold" color="#D32F2F" style={{ flex: 1 }}>
              Logout Account
            </AppText>
          </Row>
        </TouchableOpacity>

        <Spacer size="xxxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    padding: SPACING.lg,
  },

  // Header
  headerSection: {
    marginTop: SPACING.xl,
  },
  avatarContainer: {
    padding: 3,
    backgroundColor: '#FFFFFF', // Outer ring effect
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E2E8F0',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 1,
  },

  // Mode Switcher
  modeSwitcherWrap: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: RADIUS.md,
    padding: 4,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  modeTabActive: {
    backgroundColor: '#8B93FF', // Primary purple/blue mix
    shadowColor: "#8B93FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  // Saved Docs
  savedDocsCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F1F3F5',
  },

  // Grid
  gridCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F1F3F5',
  },
  gridIcon: {
    marginBottom: 4,
  },
  gridDesc: {
    lineHeight: 14,
  },

  // Referral Card
  referralCard: {
    backgroundColor: '#D15000', // Vibrant orange/brown
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    shadowColor: "#D15000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  copyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },

  // Earnings Card
  earningsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#E8EAF6',
    shadowColor: "#283593",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E8EAF6',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5C6BC0', // Indigo
    borderRadius: 3,
  },

  // Bottom Actions
  actionRow: {
    paddingVertical: SPACING.sm,
  },
  actionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
    marginLeft: 40, // Aligns with the text
  },
});
