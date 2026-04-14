import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppText, Header, Row, Column, Spacer, Card, Box } from '@components/index';
import { COLORS, SPACING } from '../../../theme';
import { useMode } from '../../../store/ModeContext';

const STUDENT_HISTORY = [
  { id: "1", title: "TU - Degree Certificate", date: "12 Oct 2023", status: "Completed", amount: "Rs. 2500" },
  { id: "2", title: "PU - Official Transcript", date: "05 Sep 2023", status: "Cancelled", amount: "Rs. 1500" },
];

const DS_HISTORY = [
  { id: "1", title: "TU - Degree Certificate", client: "Ram Bahadur", date: "12 Oct 2023", status: "Delivered", earnings: "+ Rs. 500" },
  { id: "2", title: "TU - Transcript", client: "Sita Sharma", date: "10 Oct 2023", status: "Delivered", earnings: "+ Rs. 350" },
];

export default function RequestHistoryScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { appMode } = useMode();
  
  const isDS = appMode === "DartaSathi";
  const data = isDS ? DS_HISTORY : STUDENT_HISTORY;

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Card variant="flat" padding={SPACING.lg} style={styles.historyCard}>
        <Row justify="space-between" align="center">
          <Row gap={SPACING.md} style={{ flex: 1 }}>
            <Box width={36} height={36} radius={18} bg="#E8EAF6" align="center" justify="center">
              <Ionicons name="document-text" size={16} color="#3949AB" />
            </Box>
            <Column flex={1}>
              <AppText variant="caption" weight="bold" color="#000" numberOfLines={1}>
                {item.title}
              </AppText>
              <Spacer size="xxs" />
              <AppText variant="micro" color={COLORS.textSecondary}>
                {isDS ? `Client: ${item.client} • ` : ""}{item.date}
              </AppText>
            </Column>
          </Row>

          <Column align="flex-end">
            <AppText variant="caption" weight="bold" color="#2E7D32">
              {isDS ? item.earnings : item.amount}
            </AppText>
            <Spacer size="xxs" />
            <AppText variant="micro" color={item.status === 'Cancelled' ? '#D32F2F' : '#3949AB'} weight="bold">
              {item.status}
            </AppText>
          </Column>
        </Row>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header 
        title={isDS ? "Task & Order History" : "Request History"}
        leftIcon={<Ionicons name="arrow-back" size={24} color="#000" />}
        leftAction={() => navigation.goBack()}
      />

      <FlatList 
        data={data}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <Spacer size="md" />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <AppText variant="body" color={COLORS.textMuted}>No history found.</AppText>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  content: {
    padding: SPACING.lg,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  }
});
