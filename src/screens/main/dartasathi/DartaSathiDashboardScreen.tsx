import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { AppText, Card, Row, Column, Box, Spacer, Button } from "@components/index";
import { useMode } from "../../../store/ModeContext";

// ─── Dummy Data ─────────────────────────────────────────────────────────
const INITIAL_LEADS = [
  {
    id: "1",
    service: "TU - Transcript",
    university: "Tribhuvan University",
    location: "Kirtipur, Kathmandu",
    type: "EXPRESS",
    status: "Pending",
    userName: "Ram Bahadur",
    userPhone: "9800000000",
  },
  {
    id: "2",
    service: "PU - Official Transcript",
    university: "Pokhara University",
    location: "Dhobighat, Lalitpur",
    type: "NORMAL",
    status: "Pending",
    userName: "Hari Sharma",
    userPhone: "9811111111",
  },
];

const ACTIVE_REQUESTS = [
  {
    id: "req1",
    statusText: "PROCESSING",
    statusColor: "#3949AB", // Indigo
    statusBg: "#E8EAF6",
    title: "TU - Degree Certificate",
    requestedBy: "Aayush Shrestha",
    type: "EXPRESS",
    deadline: "Today, 4:30 PM",
    isDeadlineAlert: true,
  },
  {
    id: "req2",
    statusText: "PENDING REVIEW",
    statusColor: "#5E35B1", // Deep Purple
    statusBg: "#EDE7F6",
    title: "KU - Official Transcript",
    requestedBy: "Priya Thapa",
    type: "NORMAL",
    deadline: "Oct 22, 2023",
    isDeadlineAlert: false,
  },
  {
    id: "req3",
    statusText: "DOCUMENT UPLOADED",
    statusColor: "#0288D1", // Light Blue
    statusBg: "#E1F5FE",
    title: "PU - Provisional Certificate",
    requestedBy: "Kiran Rai",
    type: "EXPRESS",
    deadline: "Tomorrow, 10:00 AM",
    isDeadlineAlert: false,
  },
];

export default function DartaSathiDashboardScreen() {
  const { isOnline, setIsOnline, addAcceptedTask, isDarkMode, setIsDarkMode } = useMode();
  const insets = useSafeAreaInsets();
  const [leads, setLeads] = useState(INITIAL_LEADS);

  const handleAccept = (id: string) => {
    setLeads((prev) => {
      const updated = prev.map((lead) => (lead.id === id ? { ...lead, status: "Accepted" } : lead));
      const acceptedLead = updated.find((l) => l.id === id);
      if (acceptedLead) addAcceptedTask(acceptedLead);
      return updated;
    });
  };

  const handleWhatsApp = (phone: string) => {
    Linking.openURL(`https://wa.me/977${phone}`).catch(() => {
      // safe fallback
    });
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ─── Header ──────────────────────────────────────────────────── */}
        <Row justify="space-between" align="center">

          <AppText variant="h2" weight="bold" color="#D15000" >
            SajiloDarta
          </AppText>
          <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
            <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color="#000000" />
          </TouchableOpacity>
        </Row>

        <Spacer size="xl" />

        {/* ─── Greeting ────────────────────────────────────────────────── */}
        <AppText variant="h1" weight="bold" color="#D15000">
          Namaste, Suman!
        </AppText>
        <Spacer size="xs" />
        <AppText variant="body" color={COLORS.textSecondary}>
          {isOnline
            ? "Your dashboard is ready for today's requests."
            : "You're offline. Go online to receive today's requests."}
        </AppText>

        <Spacer size="lg" />

        {/* ─── Toggle Online/Offline ───────────────────────────────────── */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, isOnline && styles.toggleBtnActive]}
            onPress={() => setIsOnline(true)}
            activeOpacity={0.8}
          >
            <AppText
              variant="caption"
              weight="bold"
              color={isOnline ? COLORS.white : COLORS.textSecondary}
              align="center"
            >
              ONLINE
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, !isOnline && styles.toggleBtnActiveOffline]}
            onPress={() => setIsOnline(false)}
            activeOpacity={0.8}
          >
            <AppText
              variant="caption"
              weight="bold"
              color={!isOnline ? COLORS.white : COLORS.textSecondary}
              align="center"
            >
              OFFLINE
            </AppText>
          </TouchableOpacity>
        </View>

        <Spacer size="xl" />

        {/* ─── Stats Cards ─────────────────────────────────────────────── */}
        <Card variant="flat" padding={SPACING.lg} style={styles.statCard}>
          <Row gap={SPACING.sm} align="center">
            <Box width={24} height={24} radius={6} bg="#E8EAF6" align="center" justify="center">
              <Ionicons name="briefcase" size={14} color="#3949AB" />
            </Box>
            <AppText variant="micro" weight="bold" color="#3949AB" style={{ letterSpacing: 0.5 }}>
              ACTIVE TASKS
            </AppText>
          </Row>
          <Spacer size="md" />
          <AppText variant="h1" weight="bold" color="#000000">
            03
          </AppText>
          <Spacer size="sm" />
          {/* Progress Bar inside Active Tasks */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
        </Card>

        <Spacer size="md" />

        <Card variant="flat" padding={SPACING.lg} style={styles.statCard}>
          <Row gap={SPACING.sm} align="center">
            <Box width={24} height={24} radius={6} bg="#FBE9E7" align="center" justify="center">
              <Ionicons name="checkmark-done-circle" size={16} color="#D84315" />
            </Box>
            <AppText variant="micro" weight="bold" color="#D84315" style={{ letterSpacing: 0.5 }}>
              COMPLETED TODAY
            </AppText>
          </Row>
          <Spacer size="md" />
          <Row align="flex-end" justify="space-between">
            <AppText variant="h1" weight="bold" color="#000000">
              01
            </AppText>
            <AppText variant="micro" color={COLORS.textSecondary} style={{ marginBottom: 4 }}>
              Ready to verify
            </AppText>
          </Row>
        </Card>

        <Spacer size="md" />


        {/* ─── New Leads (Horizontal Scroll) ───────────────────────────── */}
        {isOnline ? (
          <>
            <Row justify="space-between" align="center">
              <AppText variant="h3" weight="bold" color="#000000">
                New Leads
              </AppText>
              <TouchableOpacity>
                <AppText variant="micro" weight="bold" color="#D15000">
                  See All &gt;
                </AppText>
              </TouchableOpacity>
            </Row>
            <Spacer size="md" />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: SPACING.lg }}
              style={{ marginHorizontal: -SPACING.lg, paddingLeft: SPACING.lg }}
            >
              {leads.map((lead) => (
                <Card key={lead.id} variant="flat" padding={SPACING.md} style={styles.leadCard}>
                  <Row justify="space-between" align="flex-start">
                    <Row gap={SPACING.sm} style={{ flex: 1 }}>
                      <Box width={24} height={24} radius={12} bg="#FFF3E0" align="center" justify="center">
                        <Ionicons name="document-text" size={12} color="#E65100" />
                      </Box>
                      <Column flex={1}>
                        <Row align="center" gap={SPACING.xs}>
                          <AppText variant="body" weight="bold" color="#000000" numberOfLines={1}>
                            {lead.service}
                          </AppText>
                          <Box bg="#FFF3E0" paddingHorizontal={6} paddingVertical={2} radius={4}>
                            <AppText variant="micro" color="#E65100" weight="bold" style={{ fontSize: 8 }}>
                              {lead.type}
                            </AppText>
                          </Box>
                        </Row>
                        <Spacer size="xxs" />
                        <AppText variant="micro" color={COLORS.textSecondary}>
                          {lead.university}
                        </AppText>
                      </Column>
                    </Row>
                  </Row>

                  <Spacer size="md" />

                  <Row gap={SPACING.sm} align="center">
                    <Ionicons name="location" size={14} color={COLORS.textMuted} />
                    <AppText variant="micro" color={COLORS.textSecondary}>
                      {lead.location}
                    </AppText>
                  </Row>

                  <Spacer size="lg" />

                  {lead.status === "Pending" ? (
                    <Row gap={SPACING.md}>
                      <TouchableOpacity style={[styles.leadBtn, { backgroundColor: '#F3F4F6' }]}>
                        <AppText variant="caption" weight="bold" color={COLORS.textSecondary} align="center">
                          Decline
                        </AppText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.leadBtn, { backgroundColor: '#D15000' }]}
                        onPress={() => handleAccept(lead.id)}
                      >
                        <AppText variant="caption" weight="bold" color={COLORS.white} align="center">
                          Accept
                        </AppText>
                      </TouchableOpacity>
                    </Row>
                  ) : (
                    <View style={{ backgroundColor: "#E8F5E9", padding: SPACING.md, borderRadius: RADIUS.md }}>
                      <Row justify="space-between" align="center">
                        <Column>
                          <AppText variant="micro" color={COLORS.textSecondary}>Client</AppText>
                          <AppText variant="caption" weight="bold" color="#2E7D32">{lead.userName}</AppText>
                        </Column>
                        <TouchableOpacity
                          style={{ backgroundColor: "#25D366", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}
                          onPress={() => handleWhatsApp(lead.userPhone)}
                        >
                          <Ionicons name="logo-whatsapp" size={14} color={COLORS.white} />
                          <Spacer size="xs" />
                          <AppText variant="micro" weight="bold" color={COLORS.white}>Chat</AppText>
                        </TouchableOpacity>
                      </Row>
                    </View>
                  )}
                </Card>
              ))}
            </ScrollView>
          </>
        ) : (
          <View style={{ paddingVertical: SPACING.xl, alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: RADIUS.lg, borderWidth: 1, borderColor: '#E5E7EB' }}>
            <Ionicons name="moon" size={48} color="#9CA3AF" />
            <Spacer size="md" />
            <AppText variant="body" weight="bold" color="#4B5563" align="center">
              You are currently Offline
            </AppText>
            <Spacer size="xs" />
            <AppText variant="caption" color="#6B7280" align="center">
              Go online to see new feeds for today
            </AppText>
            <Spacer size="lg" />
            <TouchableOpacity
              style={{ backgroundColor: '#D15000', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }}
              onPress={() => setIsOnline(true)}
            >
              <AppText variant="caption" weight="bold" color="#FFFFFF">
                Go Online
              </AppText>
            </TouchableOpacity>
          </View>
        )}

        <Spacer size="xxl" />

        {/* ─── Active Requests (Vertical List) ─────────────────────────── */}
        <AppText variant="h3" weight="bold" color="#000000">
          Active Requests
        </AppText>
        <Spacer size="md" />

        {ACTIVE_REQUESTS.map((req) => (
          <View key={req.id}>
            <Card variant="flat" padding={SPACING.lg} style={styles.activeReqCard}>
              {/* Status Header */}
              <Row gap={SPACING.md} align="center">
                <Box width={40} height={40} radius={20} bg={req.statusBg} align="center" justify="center">
                  <Ionicons name="sync" size={20} color={req.statusColor} />
                </Box>
                <Column flex={1}>
                  <View style={{ alignSelf: 'flex-start', backgroundColor: req.statusBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginBottom: 4 }}>
                    <AppText variant="micro" weight="bold" color={req.statusColor} style={{ fontSize: 9, letterSpacing: 0.5 }}>
                      {req.statusText}
                    </AppText>
                  </View>
                  <AppText variant="body" weight="bold" color="#000000">
                    {req.title}
                  </AppText>
                  <AppText variant="micro" color={COLORS.textSecondary}>
                    Requested by: <AppText variant="micro" weight="bold" color="#000000">{req.requestedBy}</AppText>
                  </AppText>
                </Column>
              </Row>

              <Spacer size="md" />

              {/* Express Tag Row */}
              <Box bg={req.type === 'EXPRESS' ? '#FFF3E0' : '#F5F5F5'} paddingHorizontal={12} paddingVertical={4} radius={12} style={{ alignSelf: 'flex-start' }}>
                <AppText variant="micro" weight="bold" color={req.type === 'EXPRESS' ? '#E65100' : COLORS.textSecondary} style={{ fontSize: 10 }}>
                  {req.type}
                </AppText>
              </Box>

              <Spacer size="md" />
              <View style={styles.divider} />
              <Spacer size="md" />

              {/* Footer */}
              <Row justify="space-between" align="center">
                <Column>
                  <AppText variant="micro" color={COLORS.textMuted}>
                    Deadline
                  </AppText>
                  <AppText variant="caption" weight="bold" color={req.isDeadlineAlert ? '#D32F2F' : '#000000'}>
                    {req.deadline}
                  </AppText>
                </Column>
                <TouchableOpacity style={styles.viewDetailsBtn}>
                  <AppText variant="micro" weight="bold" color="#3949AB">
                    View Details
                  </AppText>
                </TouchableOpacity>
              </Row>
            </Card>
            <Spacer size="md" />
          </View>
        ))}

        <Spacer size="xxxl" />
      </ScrollView>

      {/* Floating Action Button (Matches image bottom right overlay) */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="chatbubbles" size={24} color={COLORS.white} />
        <View style={styles.fabBadge}>
          <Ionicons name="checkmark" size={10} color={COLORS.white} />
        </View>
      </TouchableOpacity>

    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 80, // for FAB spacing
  },
  avatarMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
  },

  // Toggle switch
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: RADIUS.full,
    padding: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  toggleBtnActive: {
    backgroundColor: "#D15000",
    shadowColor: "#D15000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  toggleBtnActiveOffline: {
    backgroundColor: "#9CA3AF", // Gray for offline
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  // Stat Cards
  statCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#E8EAF6",
    borderRadius: 2,
    width: "100%",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3949AB",
    borderRadius: 2,
  },

  // Earnings Orange Card
  earningsOrangeCard: {
    backgroundColor: "#D15000",
    borderRadius: RADIUS.lg,
    borderWidth: 0,
    shadowColor: "#D15000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },

  // New Leads
  leadCard: {
    width: 260,
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
  },
  leadBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },

  // Active Requests
  activeReqCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    width: "100%",
  },
  viewDetailsBtn: {
    backgroundColor: "#E8EAF6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#A0522D", // Earthy orange brown
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A0522D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  fabBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#A0522D",
    alignItems: "center",
    justifyContent: "center",
  },
});
