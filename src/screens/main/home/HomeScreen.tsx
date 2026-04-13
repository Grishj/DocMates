import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from "../../../theme";
import {
  Header,
  WrapperContainer,
  AppText,
  SearchBar,
  Row,
  Card,
  Spacer,
  FAB,
  Button,
  Chip,
} from "@components/index";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Service Data ──────────────────────────────────────────────
const SERVICES = [
  {
    id: "transcript",
    title: "Transcript",
    description: "Request official\ncopy",
    icon: "document-text-outline" as const,
    color: "#E65100",
    bgColor: "#FFF3E0",
  },
  {
    id: "migration",
    title: "Migration",
    description: "Transfer\ndocuments",
    icon: "swap-horizontal-outline" as const,
    color: "#E65100",
    bgColor: "#FFF3E0",
  },
  {
    id: "degree",
    title: "Degree",
    description: "Convocation/Original",
    icon: "school-outline" as const,
    color: "#2E7D32",
    bgColor: "#E8F5E9",
  },
  {
    id: "exam-form",
    title: "Exam Form",
    description: "Submission\nsupport",
    icon: "create-outline" as const,
    color: "#2E7D32",
    bgColor: "#E8F5E9",
  },
  {
    id: "admission",
    title: "Admission",
    description: "Guidance &\nSupport",
    icon: "people-outline" as const,
    color: "#1A237E",
    bgColor: "#E8EAF6",
  },
  {
    id: "more",
    title: "More Services",
    description: "DISCOVER",
    icon: "grid-outline" as const,
    color: "#757575",
    bgColor: "#F5F5F5",
  },
];

// ─── HomeScreen Component ──────────────────────────────────────
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState<"EN" | "NP">("EN");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const selectLanguage = (lang: "EN" | "NP") => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      {/* ─── Custom Header ──────────────────────────────────── */}
      <Header
        elevated

        //style={{ backgroundColor: 'red' }}
        variant="default"
        backgroundColor={COLORS.surface}
        leftIcon={
          <Ionicons name="menu" size={24} color={COLORS.textPrimary} />
        }
        leftAction={() => { }}
        centerElement={
          <AppText
            variant="caption"
            weight="semibold"
            color={COLORS.textPrimary}
            style={{ fontFamily: FONTS.nepalisemibold, fontSize: 13 }}
          >
            लगाउँछौ दर्ता, हाम्रो जिम्मा।
          </AppText>
        }
        rightIcon={
          <View style={styles.languageChip}>
            <Ionicons name="globe-outline" size={14} color={COLORS.primary} />
            <AppText
              variant="micro"
              weight="semibold"
              color={COLORS.primary}
              style={{ marginLeft: 3 }}
            >
              {language === "EN" ? "EN" : "NP"}
            </AppText>
            <Ionicons
              name={langDropdownOpen ? "chevron-up" : "chevron-down"}
              size={12}
              color={COLORS.primary}
              style={{ marginLeft: 2 }}
            />
          </View>
        }
        rightIconStyle={{ width: "auto" as any, height: "auto" as any }}
        rightAction={() => setLangDropdownOpen((prev) => !prev)}
      />

      {/* ─── Language Dropdown ─────────────────────────────── */}
      {langDropdownOpen && (
        <>
          <TouchableOpacity
            style={styles.langOverlay}
            activeOpacity={1}
            onPress={() => setLangDropdownOpen(false)}
          />
          <View style={styles.langDropdown}>
            <TouchableOpacity
              style={styles.langOption}
              activeOpacity={0.7}
              onPress={() => selectLanguage("EN")}
            >
              <Ionicons name="language-outline" size={18} color={language === "EN" ? COLORS.primary : COLORS.textMuted} />
              <AppText
                variant="caption"
                weight={language === "EN" ? "bold" : "medium"}
                color={language === "EN" ? COLORS.primary : COLORS.textPrimary}
                style={{ flex: 1, marginLeft: SPACING.sm }}
              >
                English
              </AppText>
              {language === "EN" && (
                <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
              )}
            </TouchableOpacity>

            <View style={styles.langDivider} />

            <TouchableOpacity
              style={styles.langOption}
              activeOpacity={0.7}
              onPress={() => selectLanguage("NP")}
            >
              <Ionicons name="language-outline" size={18} color={language === "NP" ? COLORS.primary : COLORS.textMuted} />
              <AppText
                variant="caption"
                weight={language === "NP" ? "bold" : "medium"}
                color={language === "NP" ? COLORS.primary : COLORS.textPrimary}
                style={{ flex: 1, marginLeft: SPACING.sm, fontFamily: FONTS.nepalisemibold }}
              >
                नेपाली
              </AppText>
              {language === "NP" && (
                <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
        </>
      )}

      <WrapperContainer scroll backgroundColor={COLORS.surface} edges={['left', 'right']}>
        {/* ─── Tagline ───────────────────────────────────────── */}
        <Spacer size="sm" />
        <AppText
          variant="h2"
          weight="bold"
          color={COLORS.primary}
          style={styles.tagline}
        >
          Need something done for you today?
        </AppText>

        {/* ─── Search Bar ────────────────────────────────────── */}
        <Spacer size="md" />
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search for documents or services..."
          variant="default"
          style={styles.searchBar}
          suggestions={SERVICES.map((s) => ({
            id: s.id,
            label: s.title,
            subtitle: s.description.replace(/\n/g, " "),
            icon: s.icon as any,
          }))}
          onSuggestionPress={(item) => {
            navigation.navigate(ROUTES.DETAIL, { service: item.label });
          }}
          showSuggestionsOnFocus={false}
        />

        {/* ─── Stats Row ─────────────────────────────────────── */}
        <Spacer size="lg" />
        <Row justify="space-between" gap={SPACING.sm}>
          <Card
            variant="outlined"
            padding={SPACING.md}
            style={styles.statCard}
          >
            <Row gap={SPACING.sm}>
              <View style={styles.statIconWrap}>
                <Ionicons
                  name="checkmark-done-circle"
                  size={20}
                  color={COLORS.success}
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppText
                  variant="caption"
                  weight="bold"
                  color={COLORS.success}
                >
                  1,247 documents delivered
                </AppText>
              </View>
            </Row>
          </Card>

          <Card
            variant="outlined"
            padding={SPACING.md}
            style={styles.phoneCard}
            onPress={() => { }}
          >
            <Row gap={SPACING.xs}>
              <Ionicons name="call-outline" size={18} color={COLORS.primary} />
              <AppText variant="caption" weight="bold" color={COLORS.primary}>
                98..
              </AppText>
            </Row>
          </Card>
        </Row>

        {/* ─── Essential Services ────────────────────────────── */}
        <Spacer size="xl" />
        <Row justify="space-between" align="center">
          <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
            Essential Services
          </AppText>
          <TouchableOpacity>
            <AppText variant="caption" weight="semibold" color={COLORS.primary}>
              View All
            </AppText>
          </TouchableOpacity>
        </Row>

        <Spacer size="lg" />
        <View style={styles.servicesGrid}>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCardWrapper}
              activeOpacity={0.7}
              onPress={() => {
                if (service.id !== "more") {
                  navigation.navigate(ROUTES.DETAIL, {
                    service: service.title,
                  });
                }
              }}
            >
              <Card
                variant="elevated"
                padding={SPACING.lg}
                style={styles.serviceCard}
              >
                <View
                  style={[
                    styles.serviceIconWrap,
                    { backgroundColor: service.bgColor },
                  ]}
                >
                  <Ionicons
                    name={service.icon as any}
                    size={24}
                    color={service.color}
                  />
                </View>
                <Spacer size="sm" />
                <AppText
                  variant="caption"
                  weight="bold"
                  color={COLORS.textPrimary}
                  numberOfLines={1}
                  style={styles.serviceTitle}
                >
                  {service.title}
                </AppText>
                <AppText
                  variant="micro"
                  color={COLORS.textMuted}
                  numberOfLines={2}
                  style={styles.serviceDesc}
                >
                  {service.description}
                </AppText>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── Promo Banner ──────────────────────────────────── */}
        <Spacer size="xl" />
        <View style={styles.promoBanner}>
          <View style={styles.promoGradient}>
            <View style={styles.promoContent}>
              <AppText
                variant="h2"
                weight="bold"
                color={COLORS.white}
                style={styles.promoTitle}
              >
                Skip the  queue.{"\n"}Let us wait for you.
              </AppText>
              <Spacer size="md" />
              <TouchableOpacity style={styles.promoButton}>
                <AppText
                  variant="caption"
                  weight="bold"
                  color={COLORS.primary}
                >
                  Learn How
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ─── Bottom spacer for FAB clearance ───────────────── */}
        <Spacer size="xxxl" />
        <Spacer size="xxxl" />
      </WrapperContainer>

      {/* ─── FAB ─────────────────────────────────────────────── */}
      <FAB
        size="md"
        color={COLORS.primary}
        onPress={() => {
          navigation.navigate(ROUTES.DETAIL);
        }}
      />
    </>
  );
};

export default HomeScreen;

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Language toggle chip in header
  languageChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },

  // Language dropdown
  langOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
  },
  langDropdown: {
    position: "absolute",
    top: 90,
    right: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.xs,
    minWidth: 160,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 51,
  },
  langOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
  },
  langDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },

  // Tagline
  tagline: {
    fontSize: 18,
    lineHeight: 26,
  },

  // Search bar
  searchBar: {
    marginHorizontal: 0,
  },

  // Stats cards
  statCard: {
    flex: 1,
    borderRadius: RADIUS.full,
    borderColor: "#E8F5E9",
    backgroundColor: "#FAFFFE",
  },
  statIconWrap: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneCard: {
    borderRadius: RADIUS.full,
    borderColor: "#FFF3E0",
    backgroundColor: "#FFFCF8",
  },

  // Services grid
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  serviceCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.lg * 2 - SPACING.md) / 2,
  },
  serviceCard: {
    alignItems: "center",
    minHeight: 130,
    justifyContent: "center",
    borderRadius: RADIUS.md,
  },
  serviceIconWrap: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 13,
    textAlign: "center",
  },
  serviceDesc: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 15,
    marginTop: 2,
  },

  // Promo banner
  promoBanner: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  promoGradient: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  promoContent: {
    padding: SPACING.xl,
    paddingVertical: SPACING.xxl,
  },
  promoTitle: {
    fontSize: 18,
    lineHeight: 26,
    color: COLORS.white,
  },
  promoButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
  },
});
