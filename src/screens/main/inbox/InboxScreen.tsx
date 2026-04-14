import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AppText, Spacer, Row, Column } from "@components/index";
import { useMode } from "../../../store/ModeContext";

const { width } = Dimensions.get("window");

export default function InboxScreen() {
  const { acceptedTasks } = useMode();
  const insets = useSafeAreaInsets();

  if (acceptedTasks.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, justifyContent: "center", alignItems: "center" }]}>
        <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
        <Spacer size="md" />
        <AppText variant="body" color="#757575">
          Your inbox is empty.
        </AppText>
        <Spacer size="xs" />
        <AppText variant="caption" color="#999" align="center" style={{ paddingHorizontal: 40 }}>
          When a DartaSathi accepts your request, you'll see their message here.
        </AppText>
      </View>
    );
  }

  // Find latest accepted task for context (if needed), for now using static UI from design
  const latestTask = acceptedTasks[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
      {/* Decorative top left grid overlay (simulated with a subtle absolute view or omitted for purity) */}
      <View style={{ paddingTop: insets.top + 40, paddingHorizontal: 24 }}>
        
        {/* Verification Icon */}
        <View style={styles.iconWrapOuter}>
          <View style={styles.iconWrapInner}>
            <Ionicons name="checkmark" size={24} color="#FFFFFF" strokeWidth={2} />
          </View>
        </View>

        <Spacer size="xl" />

        <AppText variant="h1" style={styles.title}>
          Request Accepted!
        </AppText>

        <Spacer size="sm" />

        <AppText variant="body" style={styles.subtitle}>
          Suman K. (DartaSathi) has accepted{"\n"}your request.
        </AppText>

        <Spacer size="xxxl" />

        {/* Info Layout */}
        <Row align="flex-start" gap={16}>
          <Ionicons name="document-text" size={22} color="#B83F00" style={{ marginTop: 2 }} />
          <Column flex={1}>
            <AppText variant="h3" weight="bold" color="#2D3748" style={{ fontSize: 17, lineHeight: 24 }}>
              Please submit your scanned documents to proceed.
            </AppText>
            <Spacer size="sm" />
            <AppText variant="caption" color="#718096" style={{ lineHeight: 22, fontSize: 13 }}>
              To ensure a smooth processing of your application, Suman requires high-quality scans of your Citizenship certificate and the relevant land ownership documents.
            </AppText>
          </Column>
        </Row>

        <Spacer size="xl" />

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Row align="center" gap={16}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
              style={styles.avatar}
            />
            <Column flex={1}>
              <Row align="center" gap={8} style={{ flexWrap: 'wrap' }}>
                <AppText variant="body" weight="bold" color="#1A202C">
                  Suman K.
                </AppText>
                <View style={styles.verifiedPill}>
                  <AppText variant="micro" weight="bold" color="#B83F00" style={{ fontSize: 9 }}>
                    VERIFIED SATHI
                  </AppText>
                </View>
              </Row>
              <Spacer size="xxs" />
              <Row align="center" gap={4}>
                <Ionicons name="star" size={12} color="#4A5568" />
                <AppText variant="micro" color="#4A5568" style={{ fontSize: 11 }}>
                  4.9 (120+ registrations)
                </AppText>
              </Row>
            </Column>
          </Row>
        </View>

        <Spacer size="xxxl" />
        <Spacer size="xxxl" />

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.whatsappBtn}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(`https://wa.me/9779800000000`)}
        >
          <Ionicons name="chatbox-ellipses" size={20} color="#FFFFFF" />
          <Spacer size="sm" horizontal />
          <AppText variant="body" weight="bold" color="#FFFFFF">
            Send via WhatsApp
          </AppText>
        </TouchableOpacity>

        <Spacer size="md" />

        <TouchableOpacity
          style={styles.emailBtn}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(`mailto:suman@example.com`)}
        >
          <Ionicons name="mail" size={20} color="#5C6BC0" />
          <Spacer size="sm" horizontal />
          <AppText variant="body" weight="bold" color="#5C6BC0">
            Send via Email
          </AppText>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC", // Off-white/grayish background
  },
  iconWrapOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#9FA8DA", // Light indigo
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#283593", // Deep indigo
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#C2410D", // Deep orange/brown
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#5C6BC0",
    fontWeight: "600",
    lineHeight: 24,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginLeft: 38, // align with text instead of icon
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E2E8F0",
  },
  verifiedPill: {
    backgroundColor: "#FCE4D6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  whatsappBtn: {
    flexDirection: "row",
    backgroundColor: "#C2410D",
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C2410D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  emailBtn: {
    flexDirection: "row",
    backgroundColor: "#E8EAF6",
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
