import React, { useState, useMemo } from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { Header, WrapperContainer, AppText, Row, Column, SearchBar, ListItemCard, Box, Spacer } from "@components/index";

const COLLEGES_DB = [
  // --- TU Engineering ---
  { id: "1", name: "Pulchowk Campus", location: "Lalitpur", icon: "business", university: "Tribhuvan University (TU)", category: "Engineering", type: "government" },
  { id: "2", name: "Thapathali Campus", location: "Thapathali, Kathmandu", icon: "business", university: "Tribhuvan University (TU)", category: "Engineering", type: "government" },
  { id: "3", name: "Paschimanchal Campus (WRC)", location: "Pokhara", icon: "business", university: "Tribhuvan University (TU)", category: "Engineering", type: "government" },
  { id: "4", name: "Sagarmatha Engineering College", location: "Sanepa, Lalitpur", icon: "school", university: "Tribhuvan University (TU)", category: "Engineering", type: "affiliated" },
  { id: "5", name: "Khwopa Engineering College", location: "Bhaktapur", icon: "school", university: "Tribhuvan University (TU)", category: "Engineering", type: "affiliated" },
  { id: "6", name: "Everest Engineering College", location: "Sanepa, Lalitpur", icon: "school", university: "Tribhuvan University (TU)", category: "Engineering", type: "affiliated" },
  { id: "7", name: "Himalayan College of Engineering", location: "Chyasal, Lalitpur", icon: "school", university: "Tribhuvan University (TU)", category: "Engineering", type: "affiliated" },
  { id: "8", name: "Kantipur Engineering College", location: "Dhapakhel, Lalitpur", icon: "school", university: "Tribhuvan University (TU)", category: "Engineering", type: "affiliated" },

  // --- TU Medical ---
  { id: "9", name: "Institute of Medicine (IOM)", location: "Maharajgunj, Kathmandu", icon: "medkit", university: "Tribhuvan University (TU)", category: "Medical", type: "government" },
  { id: "10", name: "Chitwan Medical College", location: "Bharatpur, Chitwan", icon: "medkit", university: "Tribhuvan University (TU)", category: "Medical", type: "affiliated" },
  { id: "11", name: "National Medical College", location: "Birgunj", icon: "medkit", university: "Tribhuvan University (TU)", category: "Medical", type: "affiliated" },

  // --- TU Management ---
  { id: "12", name: "Shanker Dev Campus", location: "Putalisadak, Kathmandu", icon: "briefcase", university: "Tribhuvan University (TU)", category: "Management", type: "government" },
  { id: "13", name: "Nepal Commerce Campus", location: "Minbhawan, Kathmandu", icon: "briefcase", university: "Tribhuvan University (TU)", category: "Management", type: "government" },
  { id: "14", name: "KFA Business School", location: "Mid Baneshwor", icon: "briefcase", university: "Tribhuvan University (TU)", category: "Management", type: "affiliated" },

  // --- TU Art & Humanities / General ---
  { id: "15", name: "Amrit Campus (ASCOL)", location: "Lainchaur, Kathmandu", icon: "color-palette", university: "Tribhuvan University (TU)", category: "Art & Humanities", type: "government" },
  { id: "16", name: "Tri-Chandra Campus", location: "Ghantaghar, Kathmandu", icon: "business", university: "Tribhuvan University (TU)", category: "Art & Humanities", type: "government" },

  // --- PU Engineering ---
  { id: "17", name: "Nepal Engineering College (NEC)", location: "Changunarayan, Bhaktapur", icon: "school", university: "Pokhara University (PU)", category: "Engineering", type: "affiliated" },
  { id: "18", name: "NCIT", location: "Balkumari, Lalitpur", icon: "school", university: "Pokhara University (PU)", category: "Engineering", type: "affiliated" },
  { id: "19", name: "Cosmos College of Management and Technology", location: "Tutepani, Lalitpur", icon: "school", university: "Pokhara University (PU)", category: "Engineering", type: "affiliated" },

  // --- KU Engineering ---
  { id: "20", name: "KU School of Engineering", location: "Dhulikhel, Kavre", icon: "business", university: "Kathmandu University (KU)", category: "Engineering", type: "government" }, // Categorized as govt/public to show up
  
  // --- KU Medical ---
  { id: "21", name: "KU School of Medical Sciences", location: "Dhulikhel, Kavre", icon: "medkit", university: "Kathmandu University (KU)", category: "Medical", type: "government" },
  { id: "22", name: "Manipal College of Medical Sciences", location: "Pokhara", icon: "medkit", university: "Kathmandu University (KU)", category: "Medical", type: "affiliated" },
  { id: "23", name: "Kathmandu Medical College (KMC)", location: "Sinamangal, Kathmandu", icon: "medkit", university: "Kathmandu University (KU)", category: "Medical", type: "affiliated" },
];

export default function SelectCollegeScreen({ navigation, route }: { navigation: any, route: any }) {
  const [searchText, setSearchText] = useState("");

  const registrationType = route?.params?.registrationType; // "government" or "affiliated"
  const university = route?.params?.university;
  const category = route?.params?.category;

  const filteredColleges = useMemo(() => {
    return COLLEGES_DB.filter((college) => {
      // Filter by university
      if (university && college.university !== university) return false;
      // Filter by category
      if (category && college.category !== category) return false;
      // Filter by registration type
      if (registrationType && college.type !== registrationType) return false;
      
      // Filter by search text
      if (searchText.trim() !== "") {
        const query = searchText.toLowerCase();
        return (
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [university, category, registrationType, searchText]);

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
             <AppText style={styles.title}>Select College</AppText>
             <AppText style={styles.description}>
               Choose your institution to proceed with document verification.
             </AppText>
           </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: SPACING.md, marginTop: -20 }}>
            {/* Search Bar */}
            <View style={styles.searchWrapper}>
              <SearchBar
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder={`Search ${category ? category + ' ' : ''}colleges...`}
                  variant="default"
                  style={{ backgroundColor: COLORS.surface, borderRadius: RADIUS.lg }}
              />
            </View>

            <Spacer size="md" />

            {/* Empty State / Colleges List */}
            {filteredColleges.length === 0 ? (
               <View style={styles.emptyState}>
                 <Ionicons name="search-outline" size={48} color={COLORS.border} />
                 <Spacer size="md" />
                 <AppText variant="body" color={COLORS.textMuted} align="center">
                   No {registrationType} {category} colleges found{university ? ` for ${university}` : ''}.
                 </AppText>
               </View>
            ) : (
                <FlatList
                  data={filteredColleges}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ gap: SPACING.md, paddingBottom: SPACING.xxl }}
                  renderItem={({ item }) => (
                    <ListItemCard
                      key={item.id}
                      title={item.name}
                      description={item.location}
                      variant="elevated"
                      style={styles.collegeCard}
                      onPress={() => navigation.navigate(ROUTES.CHECKOUT, { 
                        college: item.name,
                        university: item.university,
                        category: item.category,
                      })}
                      leftContent={
                        <Box
                          width={48}
                          height={48}
                          radius={RADIUS.md}
                          bg="#FDF1E5"
                          align="center"
                          justify="center"
                        >
                          <Ionicons name={item.icon as any} size={22} color="#B84318" />
                        </Box>
                      }
                      rightContent={
                        <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                      }
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
            )}

        </View>
      </WrapperContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
     backgroundColor: '#F5F5F5',
     marginHorizontal: -SPACING.md, // To bleed full width
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
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  }
});
