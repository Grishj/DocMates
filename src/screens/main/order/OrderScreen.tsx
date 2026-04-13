import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import {
  Header,
  AppText,
  Card,
  Row,
  Column,
  Box,
  Spacer,
  Chip,
  Button,
} from "@components/index";

type RequestStatus = "Pending" | "Accepted" | "Completed" | "Cancelled";

interface RequestItem {
  id: string;
  service: string;
  college?: string;
  provider: string;
  date: string;
  status: RequestStatus;
  priceRange: string;
  phone?: string;
  email?: string;
}

// ─── Dummy Data ────────────────────────────────────────────────
const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: "REQ-001",
    service: "Recommendation Letter",
    college: "Paschimanchal Campus",
    provider: "Grish Joshi",
    date: "Oct 24, 2023",
    status: "Pending",
    priceRange: "Rs. 500 - 1500",
    phone: "9812345678",
    email: "grish.joshi@example.com",
  },
  {
    id: "REQ-002",
    service: "Transcript",
    college: "Pulchowk Campus",
    provider: "Suman Thapa",
    date: "Oct 20, 2023",
    status: "Accepted",
    priceRange: "Rs. 500 - 1500",
    phone: "9823456789",
    email: "suman.thapa@example.com",
  },
  {
    id: "REQ-003",
    service: "Admission Support",
    college: "Thapathali Campus",
    provider: "Anisha Gurung",
    date: "Sep 15, 2023",
    status: "Completed",
    priceRange: "Rs. 500 - 1500",
    phone: "9834567890",
    email: "anisha.gurung@example.com",
  },
  {
    id: "REQ-004",
    service: "Migration",
    provider: "Rajesh Adhikari",
    date: "Aug 10, 2023",
    status: "Cancelled",
    priceRange: "Rs. free - 500",
    phone: "9845678901",
    email: "rajesh.adhikari@example.com",
  },
];

export default function OrderScreen({ navigation, route }: { navigation: any; route: any }) {
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS);

  useEffect(() => {
    if (route?.params?.newRequest) {
      const newReq = route.params.newRequest;
      // Prevent duplicates in case the tab is re-rendered
      setRequests((prev) => {
        if (prev.find((r) => r.id === newReq.id)) return prev;
        return [newReq, ...prev];
      });
      // Clear the param so it doesn't trigger again on subsequent renders
      navigation.setParams({ newRequest: undefined });
    }
  }, [route?.params?.newRequest]);

  const handleCancelRequest = (id: string) => {
    Alert.alert(
      "Cancel Request",
      "Are you sure you want to cancel this service request?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            setRequests((prev) =>
              prev.map((req) =>
                req.id === id ? { ...req, status: "Cancelled" } : req
              )
            );
          },
        },
      ]
    );
  };

  const handleWhatsApp = async (phone?: string) => {
    if (!phone) return;
    const url = `whatsapp://send?phone=977${phone}`;
    const webUrl = `https://wa.me/977${phone}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      Alert.alert("Error", "Could not open WhatsApp. It may not be installed.");
    }
  };

  const handleEmail = async (email?: string) => {
    if (!email) return;
    const url = `mailto:${email}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "No email client found on your device.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not open the email app.");
    }
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "Pending":
        return "#F59E0B"; // Amber
      case "Accepted":
        return COLORS.primary; // Brand Blue/Primary
      case "Completed":
        return COLORS.success; // Green
      case "Cancelled":
        return COLORS.error; // Red
      default:
        return COLORS.textMuted;
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Box
        width={80}
        height={80}
        radius={RADIUS.full}
        bg="#F3F4F6"
        align="center"
        justify="center"
      >
        <Ionicons name="document-text-outline" size={32} color={COLORS.textMuted} />
      </Box>
      <Spacer size="lg" />
      <AppText variant="body" weight="bold" color="#000000" align="center">
        No Requests Found
      </AppText>
      <Spacer size="xs" />
      <AppText variant="caption" color={COLORS.textMuted} align="center">
        You haven't made any service requests yet.
      </AppText>
      <Spacer size="xl" />
      <Button
        title="Find Services"
        variant="primary"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="My Requests"
        backgroundColor={COLORS.surface}
        showBackButton={false}
      />

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Spacer size="lg" />}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <Card variant="elevated" style={styles.requestCard} padding={0}>
            <View style={styles.cardInner}>
              {/* Header: Service Name & Status */}
              <Row justify="space-between" align="flex-start" gap={SPACING.sm}>
                <Column flex={1} gap={2}>
                  <AppText variant="body" weight="bold" color="#000000">
                    {item.service}
                  </AppText>
                  <AppText variant="micro" color={COLORS.textMuted}>
                    Requested on {item.date}
                  </AppText>
                </Column>
                <Chip
                  label={item.status}
                  variant="soft"
                  size="sm"
                  color={getStatusColor(item.status)}
                  selected
                />
              </Row>

              <Spacer size="md" />

              {/* Details: Provider & College */}
              <Column gap={SPACING.sm}>
                <Row gap={SPACING.sm} align="center">
                  <Box
                    width={28}
                    height={28}
                    radius={RADIUS.sm}
                    bg="#F3E5F5"
                    align="center"
                    justify="center"
                  >
                    <Ionicons name="person" size={14} color="#6A1B9A" />
                  </Box>
                  <Column flex={1}>
                    <AppText variant="micro" color={COLORS.textMuted}>
                      Provider
                    </AppText>
                    <AppText variant="caption" weight="semibold" color="#000000">
                      {item.provider}
                    </AppText>
                  </Column>
                </Row>

                {item.college ? (
                  <Row gap={SPACING.sm} align="center">
                    <Box
                      width={28}
                      height={28}
                      radius={RADIUS.sm}
                      bg="#E8F5E9"
                      align="center"
                      justify="center"
                    >
                      <Ionicons name="school" size={14} color={COLORS.success} />
                    </Box>
                    <Column flex={1}>
                      <AppText variant="micro" color={COLORS.textMuted}>
                        College
                      </AppText>
                      <AppText variant="caption" weight="semibold" color="#000000">
                        {item.college}
                      </AppText>
                    </Column>
                  </Row>
                ) : null}

                {item.priceRange ? (
                  <Row gap={SPACING.sm} align="center">
                    <Box
                      width={28}
                      height={28}
                      radius={RADIUS.sm}
                      bg="#E0F2F1"
                      align="center"
                      justify="center"
                    >
                      <Ionicons name="cash-outline" size={14} color="#00897B" />
                    </Box>
                    <Column flex={1}>
                      <AppText variant="micro" color={COLORS.textMuted}>
                        Estimated Service Fee
                      </AppText>
                      <AppText variant="caption" weight="bold" color="#00897B">
                        {item.priceRange}
                      </AppText>
                    </Column>
                  </Row>
                ) : null}
              </Column>

              {/* Action Buttons for Pending */}
              {item.status === "Pending" && (
                <>
                  <Spacer size="lg" />
                  <Row gap={SPACING.md}>
                    <View style={{ flex: 1 }}>
                      <Button
                        title="Cancel Request"
                        variant="outline"
                        size="sm"
                        onPress={() => handleCancelRequest(item.id)}
                        fullWidth
                        style={{ borderColor: COLORS.error }}
                        textStyle={{ color: COLORS.error }}
                      />
                    </View>
                  </Row>
                </>
              )}

              {/* Action Buttons for Accepted */}
              {item.status === "Accepted" && (
                <>
                  <Spacer size="lg" />
                  <Row gap={SPACING.md}>
                    <View style={{ flex: 1 }}>
                      <Button
                        title="WhatsApp"
                        variant="primary"
                        size="sm"
                        onPress={() => handleWhatsApp(item.phone)}
                        fullWidth
                        leftIcon={
                          <Ionicons
                            name="logo-whatsapp"
                            size={14}
                            color={COLORS.white}
                          />
                        }
                        style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button
                        title="Email"
                        variant="secondary"
                        size="sm"
                        onPress={() => handleEmail(item.email)}
                        fullWidth
                        leftIcon={
                          <Ionicons name="mail-outline" size={14} color={COLORS.primary} />
                        }
                      />
                    </View>
                  </Row>
                  <Spacer size="sm" />
                  <AppText variant="micro" color={COLORS.textMuted} align="center">
                    Send your documents securely to the provider
                  </AppText>
                </>
              )}
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    flexGrow: 1,
  },
  requestCard: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  cardInner: {
    padding: SPACING.lg,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
