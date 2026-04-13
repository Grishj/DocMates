import React from "react";
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { Header, WrapperContainer, AppText, ListItemCard, Box, Spacer } from "@components/index";

const CATEGORIES = [
  {
    id: "engineering",
    name: "Engineering",
    icon: "hardware-chip-outline" as const,
    iconBg: "#E3F2FD",
    iconColor: "#1565C0",
  },
  {
    id: "medical",
    name: "Medical",
    icon: "medkit-outline" as const,
    iconBg: "#FFEBEE",
    iconColor: "#C62828",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: "leaf-outline" as const,
    iconBg: "#E8F5E9",
    iconColor: "#2E7D32",
  },
  {
    id: "management",
    name: "Management",
    icon: "briefcase-outline" as const,
    iconBg: "#FFF3E0",
    iconColor: "#E65100",
  },
  {
    id: "art",
    name: "Art & Humanities",
    icon: "color-palette-outline" as const,
    iconBg: "#F3E5F5",
    iconColor: "#6A1B9A",
  },
  {
    id: "law",
    name: "Law",
    icon: "scale-outline" as const,
    iconBg: "#ECEFF1",
    iconColor: "#455A64",
  },
];

export default function SelectCategoryScreen({ navigation, route }: { navigation: any, route: any }) {
  const university = route?.params?.university;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        backgroundColor={COLORS.surface}
        variant="default"
      />
      <WrapperContainer scroll backgroundColor={COLORS.surface} edges={["left", "right", "bottom"]}>
        <View style={styles.headerSection}>
          <AppText style={styles.title}>Select Faculty / Category</AppText>
          <AppText style={styles.description}>
            Choose your field of study to help us pinpoint accurate verification steps{university ? ` for ${university}` : ''}.
          </AppText>
        </View>

        <Spacer size="md" />

        <View style={styles.listContainer}>
          <FlatList
            data={CATEGORIES}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // since it's nested inside scroll WrapperContainer
            contentContainerStyle={{ gap: SPACING.md, paddingBottom: SPACING.xxl }}
            renderItem={({ item }) => (
              <ListItemCard
                key={item.id}
                title={item.name}
                variant="elevated"
                style={styles.categoryCard}
                onPress={() => navigation.navigate(ROUTES.REGISTRATION_TYPE, { university, category: item.name })}
                leftContent={
                  <Box
                    width={48}
                    height={48}
                    radius={RADIUS.md}
                    bg={item.iconBg}
                    align="center"
                    justify="center"
                  >
                    <Ionicons name={item.icon} size={24} color={item.iconColor} />
                  </Box>
                }
                rightContent={
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </WrapperContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingVertical: SPACING.md,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  listContainer: {
    marginTop: SPACING.sm,
  },
  categoryCard: {
     borderRadius: RADIUS.md,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.04,
     shadowRadius: 6,
     elevation: 2,
     paddingVertical: SPACING.md,
  }
});
