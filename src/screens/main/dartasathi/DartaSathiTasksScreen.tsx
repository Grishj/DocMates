import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { AppText, Card, Row, Column, Box, Spacer } from "@components/index";
import { useMode } from "../../../store/ModeContext";

export default function DartaSathiTasksScreen() {
  const { acceptedTasks, updateTaskStatus } = useMode();

  const handleWhatsApp = (phone: string) => {
    Linking.openURL(`https://wa.me/977${phone}`).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <AppText variant="h2" weight="bold" color="#D15000">
          My Active Tasks
        </AppText>
        <Spacer size="xs" />
        <AppText variant="body" color={COLORS.textSecondary}>
          Tasks you have accepted and are currently handling.
        </AppText>
        <Spacer size="xl" />

        {acceptedTasks.length === 0 ? (
          <Column align="center" style={{ marginTop: 40 }}>
            <Ionicons name="clipboard-outline" size={64} color="#E5E7EB" />
            <Spacer size="md" />
            <AppText variant="body" color={COLORS.textMuted}>
              You haven't accepted any tasks yet.
            </AppText>
          </Column>
        ) : (
          acceptedTasks.map((task) => (
            <Card key={task.id} variant="flat" padding={SPACING.lg} style={styles.taskCard}>
              <Row justify="space-between" align="center">
                 <Row gap={SPACING.sm}>
                   <Box width={32} height={32} radius={16} bg="#FFF3E0" align="center" justify="center">
                     <Ionicons name="document-text" size={16} color="#E65100" />
                   </Box>
                 <Column>
                   <AppText variant="body" weight="bold" color="#000000">
                     {task.service}
                   </AppText>
                   <AppText variant="micro" color={COLORS.textSecondary}>
                     {task.university}
                   </AppText>
                 </Column>
               </Row>
               
               {/* Dynamic Status Badge */}
               {task.status === 'Accepted' && (
                 <Box bg="#E8F5E9" paddingHorizontal={8} paddingVertical={4} radius={6}>
                   <AppText variant="micro" weight="bold" color="#2E7D32">IN PROGRESS</AppText>
                 </Box>
               )}
               {task.status === 'Completed' && (
                 <Box bg="#E3F2FD" paddingHorizontal={8} paddingVertical={4} radius={6}>
                   <AppText variant="micro" weight="bold" color="#1565C0">COMPLETED</AppText>
                 </Box>
               )}
               {task.status === 'Cancelled' && (
                 <Box bg="#FFEBEE" paddingHorizontal={8} paddingVertical={4} radius={6}>
                   <AppText variant="micro" weight="bold" color="#C62828">CANCELLED</AppText>
                 </Box>
               )}
            </Row>

              <Spacer size="md" />
              <View style={styles.divider} />
              <Spacer size="md" />

              <Row justify="space-between" align="center">
                <Column>
                   <AppText variant="micro" color={COLORS.textMuted}>Client Details</AppText>
                   <AppText variant="caption" weight="bold" color="#000000">{task.userName}</AppText>
                   <AppText variant="micro" color={COLORS.textSecondary}>{task.location}</AppText>
                </Column>

                {task.status === 'Accepted' && (
                  <TouchableOpacity 
                     style={styles.chatBtn}
                     onPress={() => handleWhatsApp(task.userPhone)}
                  >
                    <Ionicons name="logo-whatsapp" size={16} color={COLORS.white} />
                    <Spacer size="xs" />
                    <AppText variant="micro" weight="bold" color={COLORS.white}>Chat</AppText>
                  </TouchableOpacity>
                )}
              </Row>

              {/* Action Buttons for Active Tasks */}
              {task.status === 'Accepted' && (
                <>
                  <Spacer size="lg" />
                  <Row gap={SPACING.md}>
                    <TouchableOpacity 
                      style={[styles.actionBtn, { backgroundColor: '#F3F4F6' }]}
                      onPress={() => updateTaskStatus(task.id, 'Cancelled')}
                    >
                      <AppText variant="caption" weight="bold" color={COLORS.textSecondary} align="center">Cancel</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.actionBtn, { backgroundColor: '#D15000' }]}
                      onPress={() => updateTaskStatus(task.id, 'Completed')}
                    >
                      <AppText variant="caption" weight="bold" color={COLORS.white} align="center">Mark Complete</AppText>
                    </TouchableOpacity>
                  </Row>
                </>
              )}
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContent: { padding: SPACING.lg },
  taskCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    width: "100%",
  },
  chatBtn: {
    backgroundColor: "#25D366",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  }
});
