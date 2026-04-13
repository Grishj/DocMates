import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { Header, WrapperContainer, AppText, ListItemCard, Box, Spacer, SearchBar } from "@components/index";

const INSTITUTIONS = [
  {
    id: "tu",
    nameNp: "त्रिभुवन विश्वविद्यालय",
    nameEn: "Tribhuvan University (TU)",
    icon: "school-outline" as const,
    iconBg: "#FFF3E0",
    iconColor: "#E65100",
  },
  {
    id: "ku",
    nameNp: "काठमाण्डौ विश्वविद्यालय",
    nameEn: "Kathmandu University (KU)",
    icon: "business-outline" as const,
    iconBg: "#E8F5E9",
    iconColor: "#2E7D32",
  },
  {
    id: "pu",
    nameNp: "पोखरा विश्वविद्यालय",
    nameEn: "Pokhara University (PU)",
    icon: "library-outline" as const,
    iconBg: "#FCE4EC",
    iconColor: "#C62828",
  },
  {
    id: "nous",
    nameNp: "नेपाल खुला विश्वविद्यालय",
    nameEn: "Nepal Open University (NOUS)",
    icon: "globe-outline" as const,
    iconBg: "#E0F7FA",
    iconColor: "#00838F",
  },
  {
    id: "purbanchal",
    nameNp: "पूर्वाञ्चल विश्वविद्यालय",
    nameEn: "Purbanchal University",
    icon: "earth-outline" as const,
    iconBg: "#F3E5F5",
    iconColor: "#6A1B9A",
  },
];

export default function SelectUniversityScreen({ navigation, route }: { navigation: any; route: any }) {
  const [searchText, setSearchText] = useState("");
  const service = route?.params?.service ?? "";

  const filteredUniversities = INSTITUTIONS.filter((u) =>
    u.nameEn.toLowerCase().includes(searchText.toLowerCase()) ||
    u.nameNp.includes(searchText)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        backgroundColor={COLORS.surface}
        variant="default"
      />
      <WrapperContainer backgroundColor={COLORS.surface} edges={["left", "right", "bottom"]}>
        <View style={styles.headerBackground}>
           <View style={styles.headerSection}>
             <AppText style={styles.title}>Select University</AppText>
             <AppText style={styles.description}>
               Choose the parent university to proceed.
             </AppText>
           </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: SPACING.md, marginTop: -20 }}>
            {/* Search Bar */}
            <View style={styles.searchWrapper}>
              <SearchBar
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search universities..."
                  variant="default"
                  style={{ backgroundColor: COLORS.surface, borderRadius: RADIUS.lg }}
              />
            </View>

            <Spacer size="xl" />

            {/* University List */}
            <FlatList
              data={filteredUniversities}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: SPACING.md, paddingBottom: SPACING.xxl }}
              renderItem={({ item }) => (
                <ListItemCard
                  key={item.id}
                  title={item.nameEn}
                  description={item.nameNp}
                  variant="elevated"
                  style={styles.collegeCard}
                  onPress={() => navigation.navigate(ROUTES.SELECT_CATEGORY, { university: item.nameEn, service })}
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
  headerBackground: {
     backgroundColor: '#F5F5F5',
     marginHorizontal: -SPACING.md,
     paddingHorizontal: SPACING.md,
     paddingBottom: 40,
     paddingTop: SPACING.sm,
     borderBottomLeftRadius: RADIUS.xl,
     borderBottomRightRadius: RADIUS.xl,
  },
  headerSection: {
    paddingVertical: SPACING.sm,
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
    maxWidth: '80%'
  },
  searchWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  collegeCard: {
     borderRadius: RADIUS.md,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.04,
     shadowRadius: 6,
     elevation: 2,
     paddingVertical: SPACING.lg,
  }
});
