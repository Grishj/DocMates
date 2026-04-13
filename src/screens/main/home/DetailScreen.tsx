import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
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
  Chip,
  Dropdown,
  ListItemCard,
  ChipGroup,
  Column,
  Box,
  BottomSheet,
} from "@components/index";

// ─── University / Institution Data ─────────────────────────────
const INSTITUTIONS = [
  {
    id: "neb",
    nameNp: "राष्ट्रिय परीक्षा बोर्ड",
    nameEn: "National Examinations Board (NEB)",
    icon: "ribbon-outline" as const,
    iconBg: "#E8EAF6",
    iconColor: "#1A237E",
    avgDays: "2-5 Days",
    province: "Bagmati",
  },
  {
    id: "tu",
    nameNp: "त्रिभुवन विश्वविद्यालय",
    nameEn: "Tribhuvan University (TU)",
    icon: "school-outline" as const,
    iconBg: "#FFF3E0",
    iconColor: "#E65100",
    avgDays: "2-5 Days",
    province: "Bagmati",
  },
  {
    id: "ku",
    nameNp: "काठमाण्डौ विश्वविद्यालय",
    nameEn: "Kathmandu University (KU)",
    icon: "business-outline" as const,
    iconBg: "#E8F5E9",
    iconColor: "#2E7D32",
    avgDays: "3-6 Days",
    province: "Bagmati",
  },
  {
    id: "pu",
    nameNp: "पोखरा विश्वविद्यालय",
    nameEn: "Pokhara University (PU)",
    icon: "library-outline" as const,
    iconBg: "#FCE4EC",
    iconColor: "#C62828",
    avgDays: "4-6 Days",
    province: "Gandaki",
  },
  {
    id: "nous",
    nameNp: "नेपाल खुला विश्वविद्यालय",
    nameEn: "Nepal Open University (NOUS)",
    icon: "globe-outline" as const,
    iconBg: "#E0F7FA",
    iconColor: "#00838F",
    avgDays: "3-5 Days",
    province: "Bagmati",
  },
  {
    id: "purbanchal",
    nameNp: "पूर्वाञ्चल विश्वविद्यालय",
    nameEn: "Purbanchal University",
    icon: "earth-outline" as const,
    iconBg: "#F3E5F5",
    iconColor: "#6A1B9A",
    avgDays: "5-7 Days",
    province: "Koshi",
  },
];

const UNIVERSITY_OPTIONS = [
  { label: "सबै विश्वविद्यालय (All Universities)", value: "all" },
  ...INSTITUTIONS.map((i) => ({ label: i.nameEn, value: i.id })),
];

// ─── Nepal Location Data (cascading) ───────────────────────────
const PROVINCES = [
  "Koshi", "Madhesh", "Bagmati", "Gandaki",
  "Lumbini", "Karnali", "Sudurpashchim",
];

const DISTRICTS: Record<string, string[]> = {
  Koshi: ["Jhapa", "Morang", "Sunsari", "Ilam", "Dhankuta"],
  Madhesh: ["Dhanusha", "Mahottari", "Sarlahi", "Siraha", "Saptari"],
  Bagmati: ["Kathmandu", "Lalitpur", "Bhaktapur", "Kavrepalanchok", "Chitwan"],
  Gandaki: ["Kaski", "Tanahun", "Lamjung", "Gorkha", "Syangja"],
  Lumbini: ["Rupandehi", "Kapilvastu", "Palpa", "Gulmi", "Dang"],
  Karnali: ["Surkhet", "Dailekh", "Jumla", "Dolpa", "Kalikot"],
  Sudurpashchim: ["Kailali", "Kanchanpur", "Dadeldhura", "Doti", "Bajhang"],
};

const MUNICIPALITIES: Record<string, string[]> = {
  Kathmandu: ["Kathmandu Metropolitan City", "Kirtipur Municipality", "Budhanilkantha Municipality", "Tokha Municipality"],
  Lalitpur: ["Lalitpur Metropolitan City", "Godawari Municipality", "Mahalaxmi Municipality"],
  Bhaktapur: ["Bhaktapur Municipality", "Madhyapur Thimi Municipality", "Suryabinayak Municipality"],
  Kaski: ["Pokhara Metropolitan City", "Annapurna Rural Municipality", "Machhapuchchhre Rural Municipality"],
  Jhapa: ["Bhadrapur Municipality", "Birtamod Municipality", "Mechinagar Municipality"],
  Morang: ["Biratnagar Metropolitan City", "Sundar Haraicha Municipality", "Urlabari Municipality"],
  Rupandehi: ["Butwal Sub Metropolitan City", "Siddharthanagar Municipality", "Tilottama Municipality"],
  Chitwan: ["Bharatpur Metropolitan City", "Ratnanagar Municipality", "Khairahani Municipality"],
  Surkhet: ["Birendranagar Municipality", "Gurbhakot Municipality"],
  Kailali: ["Dhangadhi Sub Metropolitan City", "Tikapur Municipality", "Lamkichuha Municipality"],
};

const WARDS: Record<string, string[]> = {
  "Kathmandu Metropolitan City": Array.from({ length: 32 }, (_, i) => `Ward ${i + 1}`),
  "Lalitpur Metropolitan City": Array.from({ length: 29 }, (_, i) => `Ward ${i + 1}`),
  "Pokhara Metropolitan City": Array.from({ length: 33 }, (_, i) => `Ward ${i + 1}`),
  "Biratnagar Metropolitan City": Array.from({ length: 19 }, (_, i) => `Ward ${i + 1}`),
  "Bharatpur Metropolitan City": Array.from({ length: 29 }, (_, i) => `Ward ${i + 1}`),
};

// ─── Detail Screen Component ───────────────────────────────────
const DetailScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const serviceName = route?.params?.service ?? "Service";

  const [searchText, setSearchText] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    "all"
  );

  // Location filters
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // BottomSheet visibility
  const [showProvinceSheet, setShowProvinceSheet] = useState(false);
  const [showDistrictSheet, setShowDistrictSheet] = useState(false);
  const [showMunicipalitySheet, setShowMunicipalitySheet] = useState(false);
  const [showWardSheet, setShowWardSheet] = useState(false);

  // Derived options (cascading)
  const districtOptions = selectedProvince ? (DISTRICTS[selectedProvince] ?? []) : [];
  const municipalityOptions = selectedDistrict ? (MUNICIPALITIES[selectedDistrict] ?? []) : [];
  const wardOptions = selectedMunicipality ? (WARDS[selectedMunicipality] ?? []) : [];

  // Cascade reset helpers
  const selectProvince = (val: string) => {
    setSelectedProvince(val);
    setSelectedDistrict("");
    setSelectedMunicipality("");
    setSelectedWard("");
    setShowProvinceSheet(false);
  };
  const selectDistrict = (val: string) => {
    setSelectedDistrict(val);
    setSelectedMunicipality("");
    setSelectedWard("");
    setShowDistrictSheet(false);
  };
  const selectMunicipality = (val: string) => {
    setSelectedMunicipality(val);
    setSelectedWard("");
    setShowMunicipalitySheet(false);
  };
  const selectWard = (val: string) => {
    setSelectedWard(val);
    setShowWardSheet(false);
  };

  // ─── Filter institutions ────────────────────────────────────
  const filteredInstitutions = useMemo(() => {
    let list = [...INSTITUTIONS];

    // University filter
    if (selectedUniversity && selectedUniversity !== "all") {
      list = list.filter((i) => i.id === selectedUniversity);
    }

    // Province filter
    if (selectedProvince) {
      list = list.filter((i) => i.province === selectedProvince);
    }

    // Search filter
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (i) =>
          i.nameEn.toLowerCase().includes(q) ||
          i.nameNp.includes(searchText)
      );
    }

    return list;
  }, [selectedUniversity, selectedProvince, selectedDistrict, searchText]);

  const renderInstitution = (item: (typeof INSTITUTIONS)[0]) => (
    <ListItemCard
      key={item.id}
      title={item.nameNp}
      description={item.nameEn}
      variant="elevated"
      style={styles.instCard}
      leftContent={
        <Box
          width={52}
          height={52}
          radius={RADIUS.md}
          bg={item.iconBg}
          align="center"
          justify="center"
        >
          <Ionicons name={item.icon} size={26} color={item.iconColor} />
        </Box>
      }
      rightContent={
        <Column align="flex-end" gap={SPACING.xs}>
          <Row gap={4}>
            <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
            <AppText variant="micro" color={COLORS.textMuted}>
              Avg. {item.avgDays}
            </AppText>
          </Row>
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(ROUTES.CHECKOUT, {
                institution: item.nameEn,
                service: serviceName,
              })
            }
          >
            <AppText variant="micro" weight="bold" color={COLORS.primary}>
              View Details
            </AppText>
            <Ionicons
              name="arrow-forward"
              size={14}
              color={COLORS.primary}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </Column>
      }
    />
  );

  return (
    <>
      {/* ─── Header ──────────────────────────────────────────── */}
      <Header
        variant="colored"
        backgroundColor={COLORS.navy}
        showBackButton
        onBack={() => navigation.goBack()}
        title={serviceName}
        titleColor={COLORS.white}
        iconColor={COLORS.white}
        elevated
        rightIcon={
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={COLORS.white}
          />
        }
      />

      {/* ─── Content ───────────────────────────────────────────── */}
      <WrapperContainer
        scroll
        backgroundColor={COLORS.background}
        edges={["left", "right"]}
      >
        <Spacer size="md" />

        {/* ─── University Dropdown ──────────────────────────── */}
        <Dropdown
          label="विश्वविद्यालय छान्नुहोस् (Select University)"
          options={UNIVERSITY_OPTIONS}
          value={selectedUniversity}
          onChange={(opt) => setSelectedUniversity(String(opt.value))}
          placeholder="सबै विश्वविद्यालय (All)"
        />

        {/* ─── Search ──────────────────────────────────────────── */}
        <Spacer size="md" />
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="विश्वविद्यालय खोज्नुहोस् वा खोज्नु..."
          variant="outline"
        />

        {/* ─── Location Filter Chips ──────────────────────────── */}
        <Spacer size="md" />
        <Row gap={SPACING.sm} style={{ flexWrap: "wrap" }}>
          {/* Province */}
          <Chip
            label={selectedProvince || "Province"}
            variant="outline"
            size="md"
            selected={!!selectedProvince}
            leftIcon={
              <Ionicons
                name="location-outline"
                size={14}
                color={selectedProvince ? COLORS.primary : COLORS.textMuted}
              />
            }
            closable={!!selectedProvince}
            onClose={() => selectProvince("")}
            onPress={() => setShowProvinceSheet(true)}
          />

          {/* District — visible after province selected */}
          {selectedProvince !== "" && (
            <Chip
              label={selectedDistrict || "District"}
              variant="outline"
              size="md"
              selected={!!selectedDistrict}
              leftIcon={
                <Ionicons
                  name="map-outline"
                  size={14}
                  color={selectedDistrict ? COLORS.primary : COLORS.textMuted}
                />
              }
              closable={!!selectedDistrict}
              onClose={() => selectDistrict("")}
              onPress={() => setShowDistrictSheet(true)}
            />
          )}

          {/* Municipality — visible after district selected */}
          {selectedDistrict !== "" && (
            <Chip
              label={selectedMunicipality || "Municipality"}
              variant="outline"
              size="md"
              selected={!!selectedMunicipality}
              leftIcon={
                <Ionicons
                  name="business-outline"
                  size={14}
                  color={selectedMunicipality ? COLORS.primary : COLORS.textMuted}
                />
              }
              closable={!!selectedMunicipality}
              onClose={() => selectMunicipality("")}
              onPress={() => setShowMunicipalitySheet(true)}
            />
          )}

          {/* Ward — visible after municipality selected */}
          {selectedMunicipality !== "" && (
            <Chip
              label={selectedWard || "Ward"}
              variant="outline"
              size="md"
              selected={!!selectedWard}
              leftIcon={
                <Ionicons
                  name="pin-outline"
                  size={14}
                  color={selectedWard ? COLORS.primary : COLORS.textMuted}
                />
              }
              closable={!!selectedWard}
              onClose={() => selectWard("")}
              onPress={() => setShowWardSheet(true)}
            />
          )}
        </Row>

        {/* ─── Institution List ────────────────────────────────── */}
        <Spacer size="lg" />

        {filteredInstitutions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="search-outline"
              size={48}
              color={COLORS.border}
            />
            <Spacer size="md" />
            <AppText
              variant="body"
              color={COLORS.textMuted}
              align="center"
            >
              No institutions found.{"\n"}Try adjusting your filters.
            </AppText>
          </View>
        ) : (
          filteredInstitutions.map((item) => (
            <React.Fragment key={item.id}>
              {renderInstitution(item)}
              <Spacer size="md" />
            </React.Fragment>
          ))
        )}

        <Spacer size="xxl" />
      </WrapperContainer>

      {/* ─── Province BottomSheet ────────────────────────────── */}
      <BottomSheet
        visible={showProvinceSheet}
        onClose={() => setShowProvinceSheet(false)}
        title="Select Province"
        scrollable
        showCloseButton
      >
        {PROVINCES.map((prov) => (
          <TouchableOpacity
            key={prov}
            style={[
              styles.sheetOption,
              selectedProvince === prov && styles.sheetOptionActive,
            ]}
            onPress={() => selectProvince(prov)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="location-outline"
              size={18}
              color={selectedProvince === prov ? COLORS.primary : COLORS.textMuted}
            />
            <AppText
              variant="body"
              weight={selectedProvince === prov ? "bold" : "regular"}
              color={selectedProvince === prov ? COLORS.primary : COLORS.textPrimary}
              style={{ flex: 1, marginLeft: SPACING.sm }}
            >
              {prov}
            </AppText>
            {selectedProvince === prov && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </BottomSheet>

      {/* ─── District BottomSheet ────────────────────────────── */}
      <BottomSheet
        visible={showDistrictSheet}
        onClose={() => setShowDistrictSheet(false)}
        title={`Districts — ${selectedProvince}`}
        scrollable
        showCloseButton
      >
        {districtOptions.map((dist) => (
          <TouchableOpacity
            key={dist}
            style={[
              styles.sheetOption,
              selectedDistrict === dist && styles.sheetOptionActive,
            ]}
            onPress={() => selectDistrict(dist)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="map-outline"
              size={18}
              color={selectedDistrict === dist ? COLORS.primary : COLORS.textMuted}
            />
            <AppText
              variant="body"
              weight={selectedDistrict === dist ? "bold" : "regular"}
              color={selectedDistrict === dist ? COLORS.primary : COLORS.textPrimary}
              style={{ flex: 1, marginLeft: SPACING.sm }}
            >
              {dist}
            </AppText>
            {selectedDistrict === dist && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </BottomSheet>

      {/* ─── Municipality BottomSheet ────────────────────────── */}
      <BottomSheet
        visible={showMunicipalitySheet}
        onClose={() => setShowMunicipalitySheet(false)}
        title={`Municipalities — ${selectedDistrict}`}
        scrollable
        showCloseButton
      >
        {municipalityOptions.length === 0 ? (
          <View style={styles.emptySheet}>
            <Ionicons name="information-circle-outline" size={32} color={COLORS.textMuted} />
            <Spacer size="sm" />
            <AppText variant="caption" color={COLORS.textMuted} align="center">
              No municipality data available for {selectedDistrict}.
            </AppText>
          </View>
        ) : (
          municipalityOptions.map((mun) => (
            <TouchableOpacity
              key={mun}
              style={[
                styles.sheetOption,
                selectedMunicipality === mun && styles.sheetOptionActive,
              ]}
              onPress={() => selectMunicipality(mun)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="business-outline"
                size={18}
                color={selectedMunicipality === mun ? COLORS.primary : COLORS.textMuted}
              />
              <AppText
                variant="body"
                weight={selectedMunicipality === mun ? "bold" : "regular"}
                color={selectedMunicipality === mun ? COLORS.primary : COLORS.textPrimary}
                style={{ flex: 1, marginLeft: SPACING.sm }}
              >
                {mun}
              </AppText>
              {selectedMunicipality === mun && (
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))
        )}
      </BottomSheet>

      {/* ─── Ward BottomSheet ────────────────────────────────── */}
      <BottomSheet
        visible={showWardSheet}
        onClose={() => setShowWardSheet(false)}
        title={`Wards — ${selectedMunicipality}`}
        scrollable
        showCloseButton
      >
        {wardOptions.length === 0 ? (
          <View style={styles.emptySheet}>
            <Ionicons name="information-circle-outline" size={32} color={COLORS.textMuted} />
            <Spacer size="sm" />
            <AppText variant="caption" color={COLORS.textMuted} align="center">
              No ward data available for {selectedMunicipality}.
            </AppText>
          </View>
        ) : (
          wardOptions.map((ward) => (
            <TouchableOpacity
              key={ward}
              style={[
                styles.sheetOption,
                selectedWard === ward && styles.sheetOptionActive,
              ]}
              onPress={() => selectWard(ward)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="pin-outline"
                size={18}
                color={selectedWard === ward ? COLORS.primary : COLORS.textMuted}
              />
              <AppText
                variant="body"
                weight={selectedWard === ward ? "bold" : "regular"}
                color={selectedWard === ward ? COLORS.primary : COLORS.textPrimary}
                style={{ flex: 1, marginLeft: SPACING.sm }}
              >
                {ward}
              </AppText>
              {selectedWard === ward && (
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))
        )}
      </BottomSheet>
    </>
  );
};

export default DetailScreen;

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Institution card
  instCard: {
    borderRadius: RADIUS.md,
    overflow: "hidden",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  viewDetailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
    backgroundColor: "#FFF3E0",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxxl,
  },

  // BottomSheet options
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  sheetOptionActive: {
    backgroundColor: "#FFF3E0",
    borderRadius: RADIUS.sm,
    borderBottomWidth: 0,
  },
  emptySheet: {
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
});
