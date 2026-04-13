import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { Header, AppText, Row, Column, Spacer } from "@components/index";

export default function NotificationScreen({ navigation }: { navigation: any }) {
  const notifications = [
    { id: "1", title: "Request Update", message: "Your Transcript request is now completed.", time: "10 min ago", icon: "checkmark-circle", color: COLORS.success },
    { id: "2", title: "New Lead", message: "A new standard delivery lead is available.", time: "1 hour ago", icon: "document-text", color: "#F59E0B" },
    { id: "3", title: "Welcome!", message: "Thank you for joining SajiloDarta.", time: "1 day ago", icon: "heart", color: "#E65100" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header 
        title="Notifications" 
        showBackButton 
        onBackPress={() => navigation.goBack()} 
        backgroundColor={COLORS.surface} 
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {notifications.map((notif) => (
          <Row key={notif.id} align="center" gap={SPACING.md} style={styles.notificationItem}>
            <View style={[styles.iconContainer, { backgroundColor: notif.color + "1A" }]}>
              <Ionicons name={notif.icon as any} size={24} color={notif.color} />
            </View>
            <Column flex={1}>
              <Row justify="space-between" align="center">
                <AppText variant="caption" weight="bold" color="#000000">{notif.title}</AppText>
                <AppText variant="micro" color={COLORS.textMuted}>{notif.time}</AppText>
              </Row>
              <Spacer size="xs" />
              <AppText variant="micro" color={COLORS.textSecondary}>{notif.message}</AppText>
            </Column>
          </Row>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.surface },
  scrollContent: { padding: SPACING.lg },
  notificationItem: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  }
});
