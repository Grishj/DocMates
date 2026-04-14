import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Share, Alert, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../../theme";
import { AppText, Card, Row, Column, Box, Spacer, Avatar } from "@components/index";
import { useMode } from "../../../store/ModeContext";

import { ROUTES } from "../../../constants";

export default function ProfileScreen({ navigation }: any) {
  const { appMode: activeTab, setAppMode: setActiveTab, avatarUri, setAvatarUri } = useMode();
  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleTakePhoto = async () => {
    setShowImageOptions(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleChooseGallery = async () => {
    setShowImageOptions(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out DocsMate! It’s the easiest way to get university documents processed in Nepal. Download it now!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ─── Profile Header ────────────────────────────────────────── */}
        <Column align="center" style={styles.headerSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={() => setShowImageOptions(true)} activeOpacity={0.9}>
            <Image
              source={{ uri: avatarUri || "https://i.pravatar.cc/150?img=11" }}
              style={styles.avatarImage}
            />
            {/* Camera Overlay Badge (was Verification) */}
            <View style={[styles.badgeContainer, { backgroundColor: COLORS.primary, padding: 4, borderRadius: 16, bottom: 0, right: 0 }]}>
              <Ionicons name="camera" size={14} color="#FFF" />
            </View>
          </TouchableOpacity>

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
              Consumer Mode
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
              DocsMate Mode
            </AppText>
          </TouchableOpacity>
        </View>

        <Spacer size="lg" />



        {/* ─── Grid Menu (Order History / Settings) ──────────────────── */}
        <Row gap={SPACING.md}>
          <Card variant="flat" padding={SPACING.lg} style={styles.gridCard} onPress={() => navigation.navigate(ROUTES.REQUEST_HISTORY as any)}>
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

          <Card variant="flat" padding={SPACING.lg} style={styles.gridCard} onPress={() => navigation.navigate(ROUTES.SETTINGS as any)}>
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

        {/* ─── Share App ─────────────────────────────────────────── */}
        <View style={styles.referralCard}>
          <Row justify="space-between" align="center">
            <Column gap={2}>
              <AppText variant="micro" weight="bold" color="#FFE0B2" style={{ letterSpacing: 0.5 }}>
                SPREAD THE WORD
              </AppText>
              <AppText variant="body" weight="bold" color={COLORS.white}>
                Share DocsMate App
              </AppText>
            </Column>
            <TouchableOpacity style={styles.copyButton} onPress={handleShare}>
              <Ionicons name="share-social" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </Row>
          <Spacer size="sm" />
          <AppText variant="micro" color="#FFE0B2">
            Help your friends with their university documents easily.
          </AppText>
        </View>

        <Spacer size="md" />



        <Spacer size="xl" />

        {/* ─── Bottom Actions ────────────────────────────────────────── */}
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.HELP_SUPPORT as any)}>
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

        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.TERMS_CONDITIONS as any)}>
          <Row gap={SPACING.md} align="center">
            <Box width={24} height={24} radius={6} bg="#E1F5FE" align="center" justify="center">
              <Ionicons name="document-text" size={12} color="#0288D1" />
            </Box>
            <AppText variant="caption" weight="bold" color="#000000" style={{ flex: 1 }}>
              Terms of Service
            </AppText>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </Row>
        </TouchableOpacity>

        <View style={styles.actionDivider} />

        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.PRIVACY_POLICY as any)}>
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

      {/* ─── Image Picker Modal ────────────────────────────────────── */}
      <Modal visible={showImageOptions} transparent animationType="fade" onRequestClose={() => setShowImageOptions(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowImageOptions(false)}>
          <View style={styles.modalContent}>
            <AppText variant="body" weight="bold" color="#000" style={{ marginBottom: SPACING.lg }}>
              Change Profile Picture
            </AppText>
            <Row gap={SPACING.xxl} justify="center">
              <TouchableOpacity style={styles.modalOption} onPress={handleTakePhoto} activeOpacity={0.7}>
                <Box width={56} height={56} radius={28} bg="#E1F5FE" align="center" justify="center" style={{ marginBottom: 8 }}>
                  <Ionicons name="camera" size={26} color="#0288D1" />
                </Box>
                <AppText variant="micro" weight="bold" color="#333">Camera</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={handleChooseGallery} activeOpacity={0.7}>
                <Box width={56} height={56} radius={28} bg="#E8F5E9" align="center" justify="center" style={{ marginBottom: 8 }}>
                  <Ionicons name="image" size={26} color="#2E7D32" />
                </Box>
                <AppText variant="micro" weight="bold" color="#333">Gallery</AppText>
              </TouchableOpacity>
            </Row>
          </View>
        </Pressable>
      </Modal>
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

  // Modal rules
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalOption: {
    alignItems: 'center',
  },
});
