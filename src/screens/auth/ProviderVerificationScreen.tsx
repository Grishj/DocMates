import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../theme";
import {
  AppText,
  Button,
  Input,
  Spacer,
  WrapperContainer,
  Card,
  Dropdown,
  Header,
  Row,
  Modal, // Needed if I want custom pickers, but I'll use Alert for camera/gallery choice
} from "../../components";

// ─── Location Mock Data ─────────────────────────────
const PROVINCES = [
  { label: "Koshi", value: "koshi" },
  { label: "Bagmati", value: "bagmati" },
  { label: "Gandaki", value: "gandaki" },
];

const DISTRICTS: Record<string, { label: string; value: string }[]> = {
  koshi: [
    { label: "Morang", value: "morang" },
    { label: "Sunsari", value: "sunsari" },
  ],
  bagmati: [
    { label: "Kathmandu", value: "kathmandu" },
    { label: "Lalitpur", value: "lalitpur" },
    { label: "Bhaktapur", value: "bhaktapur" },
  ],
  gandaki: [
    { label: "Kaski", value: "kaski" },
  ]
};

const MUNICIPALITIES: Record<string, { label: string; value: string }[]> = {
  morang: [{ label: "Biratnagar", value: "biratnagar" }],
  sunsari: [{ label: "Dharan", value: "dharan" }, { label: "Itahari", value: "itahari" }],
  kathmandu: [{ label: "Kathmandu Metro", value: "ktm_metro" }],
  lalitpur: [{ label: "Lalitpur Metro", value: "lal_metro" }],
  bhaktapur: [{ label: "Bhaktapur Municipality", value: "bhak_mun" }],
  kaski: [{ label: "Pokhara Metro", value: "pok_metro" }],
};

// ─── University & Service Data ──────────────────────
const UNIVERSITIES = [
  { label: "Tribhuvan University (TU)", value: "tu" },
  { label: "Kathmandu University (KU)", value: "ku" },
  { label: "Pokhara University (PU)", value: "pu" },
];

const CATEGORIES = [
  { label: "Engineering", value: "engineering" },
  { label: "Management", value: "management" },
  { label: "Medical", value: "medical" },
];

const REGISTERED_TYPES = [
  { label: "Affiliated", value: "affiliated" },
  { label: "Constituent", value: "constituent" },
];

const COLLEGES: Record<string, { label: string; value: string }[]> = {
  engineering: [
    { label: "Pulchowk Campus", value: "pulchowk" },
    { label: "Kantipur Engineering College", value: "kec" },
  ],
  management: [
    { label: "Shanker Dev Campus", value: "sdc" },
    { label: "Nepal Commerce Campus", value: "ncc" },
  ],
  medical: [
    { label: "Institute of Medicine (IOM)", value: "iom" },
  ]
};

const SERVICES = [
  { label: "Transcript Collection", value: "transcript" },
  { label: "Degree Certificate", value: "degree" },
  { label: "Migration Certificate", value: "migration" },
  { label: "Provisional Certificate", value: "provisional" },
];

// ─── Multi Select Component ─────────────────────────────
type MultiSelectDropdownProps = {
  options: { label: string; value: string | number }[];
  values: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  placeholder?: string;
  label?: string;
};

const MultiSelectDropdown = ({ options, values, onChange, placeholder, label }: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (val: string | number) => {
    if (values.includes(val)) {
      onChange(values.filter(v => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  const displayValue = values.length > 0
    ? `${values.length} selected`
    : placeholder;

  return (
    <View style={{ gap: SPACING.xs }}>
      <TouchableOpacity
        style={{
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
          borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, backgroundColor: COLORS.surface
        }}
        onPress={() => setOpen(true)}
      >
        <AppText variant="body" color={values.length > 0 ? COLORS.textPrimary : COLORS.textMuted}>{displayValue}</AppText>
        <View style={{ width: 8, height: 8, borderRightWidth: 2, borderBottomWidth: 2, borderColor: COLORS.textMuted, transform: [{ rotate: "45deg" }], marginTop: -4 }} />
      </TouchableOpacity>

      <Modal visible={open} onClose={() => setOpen(false)} position="bottom" title={label || "Select Options"}>
        <View style={{ maxHeight: 300, paddingBottom: SPACING.xl }}>
          <ScrollView>
            {options.map((item, index) => {
              const isSelected = values.includes(item.value);
              return (
                <View key={String(item.value)}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                      paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg,
                      backgroundColor: isSelected ? COLORS.background : COLORS.surface
                    }}
                    onPress={() => toggleOption(item.value)}
                  >
                    <AppText variant="body" color={isSelected ? COLORS.primary : COLORS.textPrimary} weight={isSelected ? "semibold" : "regular"}>
                      {item.label}
                    </AppText>
                    {isSelected && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary }} />}
                  </TouchableOpacity>
                  {index < options.length - 1 && <View style={{ height: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.lg }} />}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const ProviderVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // Image states
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [studentIdImage, setStudentIdImage] = useState<string | null>(null);
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);
  const [currentPickSide, setCurrentPickSide] = useState<"front" | "back" | "studentId" | null>(null);

  // Location states
  const [province, setProvince] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [municipality, setMunicipality] = useState<string | null>(null);

  // University Service Selection states
  const [selectedUniversities, setSelectedUniversities] = useState<(string | number)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<(string | number)[]>([]);
  const [selectedRegTypes, setSelectedRegTypes] = useState<(string | number)[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<(string | number)[]>([]);
  const [selectedServices, setSelectedServices] = useState<(string | number)[]>([]);

  // Fee Range states
  const [minCharge, setMinCharge] = useState("");
  const [maxCharge, setMaxCharge] = useState("");

  // Custom Addition States
  const [showCustomUniversity, setShowCustomUniversity] = useState(false);
  const [customUniversity, setCustomUniversity] = useState("");

  const [showCustomCollege, setShowCustomCollege] = useState(false);
  const [customCollege, setCustomCollege] = useState("");

  const handlePickImage = (side: "front" | "back" | "studentId") => {
    setCurrentPickSide(side);
    setPickerModalVisible(true);
  };

  const handleLaunchCamera = async () => {
    setPickerModalVisible(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (currentPickSide === "front") setFrontImage(result.assets[0].uri);
      if (currentPickSide === "back") setBackImage(result.assets[0].uri);
      if (currentPickSide === "studentId") setStudentIdImage(result.assets[0].uri);
    }
  };

  const handleLaunchGallery = async () => {
    setPickerModalVisible(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (currentPickSide === "front") setFrontImage(result.assets[0].uri);
      if (currentPickSide === "back") setBackImage(result.assets[0].uri);
      if (currentPickSide === "studentId") setStudentIdImage(result.assets[0].uri);
    }
  };

  const renderUploadCard = (title: string, side: "front" | "back", imageUri: string | null) => (
    <Card variant="outlined" style={styles.uploadCard} padding={0}>
      <TouchableOpacity style={styles.uploadContent} onPress={() => handlePickImage(side)}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} resizeMode="contain" />
        ) : (
          <>
            <View style={styles.uploadIconContainer}>
              <View style={styles.uploadIcon}>
                <Ionicons name="camera-outline" size={28} color={COLORS.primary} />
              </View>
            </View>
            <Spacer size="sm" />
            <AppText variant="caption" weight="semibold" color={COLORS.textPrimary} align="center">
              {title}
            </AppText>
            <AppText variant="micro" color={COLORS.textMuted} align="center">
              Tap to capture or upload
            </AppText>
          </>
        )}
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* ─── Header ───────────────────────────────────── */}
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        title="Provider Verification"
        variant="default"
        elevated
      />

      {/* ─── Progress Bar ─────────────────────────────── */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: "30%" }]} />
        </View>
      </View>

      <WrapperContainer scroll keyboardAvoiding style={styles.container} disablePadding edges={[]}>
        <View style={styles.content}>
          <Spacer size="xl" />

          {/* ─── Title ──────────────────────────────────── */}
          <AppText variant="h1" weight="bold" color={COLORS.textPrimary} style={styles.italicTitle}>
            Become a Verified{"\n"}DartaSathi
          </AppText>

          <Spacer size="sm" />

          <AppText variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
            Join Nepal's elite network of document facilitators. Build trust using our rigorous verification process.
          </AppText>

          <Spacer size="xxl" />

          {/* ─── Section: Identity Verification ─────────── */}
          <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
            Identity Verification
          </AppText>
          <Spacer size="xs" />
          <AppText variant="micro" color={COLORS.textMuted}>
            Upload a clear photo of your Citizenship (Nagarikta) or National ID
          </AppText>

          <Spacer size="lg" />

          {/* Front, Back & Student ID Upload */}
          {renderUploadCard("Front Side", "front", frontImage)}
          <Spacer size="md" />
          {renderUploadCard("Back Side", "back", backImage)}
          <Spacer size="md" />
          {renderUploadCard("Student ID (Optional)", "studentId", studentIdImage)}

          <Spacer size="xxl" />

          {/* ─── Section: Primary Location ──────────────── */}
          <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
            Primary Location
          </AppText>
          <Spacer size="xs" />
          <AppText variant="micro" color={COLORS.textMuted}>
            Select your operation hub down to the municipality level.
          </AppText>

          <Spacer size="md" />

          <Dropdown
            options={PROVINCES}
            value={province}
            onChange={(option) => {
              setProvince(String(option.value));
              setDistrict(null);
              setMunicipality(null);
            }}
            placeholder="Select Province"
            label="Province"
          />

          <Spacer size="md" />

          <Dropdown
            options={province && DISTRICTS[province] ? DISTRICTS[province] : []}
            value={district}
            onChange={(option) => {
              setDistrict(String(option.value));
              setMunicipality(null);
            }}
            placeholder="Select District"
            label="District"
            disabled={!province}
          />

          <Spacer size="md" />

          <Dropdown
            options={district && MUNICIPALITIES[district] ? MUNICIPALITIES[district] : []}
            value={municipality}
            onChange={(option) => setMunicipality(String(option.value))}
            placeholder="Select Municipality"
            label="Municipality"
            disabled={!district}
          />

          <Spacer size="xxl" />

          {/* ─── Section: University & Service Setup ────── */}
          <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
            Facilitation Details
          </AppText>
          <Spacer size="xs" />
          <AppText variant="micro" color={COLORS.textMuted}>
            Select the universities, colleges, and services you intend to provide (optional).
          </AppText>

          <Spacer size="md" />

          <AppText variant="caption" color={COLORS.textSecondary} style={{ marginBottom: SPACING.xs }}>
            Universities
          </AppText>
          <MultiSelectDropdown
            options={UNIVERSITIES}
            values={selectedUniversities}
            onChange={(val) => setSelectedUniversities(val)}
            placeholder="Select Universities"
            label="Universities"
          />
          {!showCustomUniversity ? (
            <TouchableOpacity onPress={() => setShowCustomUniversity(true)} style={{ marginTop: SPACING.xs }}>
              <AppText variant="micro" color={COLORS.primary} weight="semibold">
                + Can't find your University? Request to add
              </AppText>
            </TouchableOpacity>
          ) : (
            <View style={{ marginTop: SPACING.xs }}>
              <Input
                placeholder="Enter university name"
                value={customUniversity}
                onChangeText={setCustomUniversity}
              />
              <TouchableOpacity onPress={() => { setShowCustomUniversity(false); setCustomUniversity(""); }} style={{ alignSelf: "flex-end", marginTop: SPACING.xs }}>
                <AppText variant="micro" color={COLORS.error} weight="semibold">
                  Cancel
                </AppText>
              </TouchableOpacity>
            </View>
          )}

          <Spacer size="md" />

          <AppText variant="caption" color={COLORS.textSecondary} style={{ marginBottom: SPACING.xs }}>
            Categories
          </AppText>
          <MultiSelectDropdown
            options={CATEGORIES}
            values={selectedCategories}
            onChange={(val) => setSelectedCategories(val)}
            placeholder="Select Categories"
            label="Categories"
          />

          <Spacer size="md" />

          <AppText variant="caption" color={COLORS.textSecondary} style={{ marginBottom: SPACING.xs }}>
            Registration Types
          </AppText>
          <MultiSelectDropdown
            options={REGISTERED_TYPES}
            values={selectedRegTypes}
            onChange={(val) => setSelectedRegTypes(val)}
            placeholder="Select Registration Types"
            label="Registration Types"
          />

          <Spacer size="md" />

          <AppText variant="caption" color={COLORS.textSecondary} style={{ marginBottom: SPACING.xs }}>
            Colleges
          </AppText>
          <MultiSelectDropdown
            options={selectedCategories.flatMap(cat => COLLEGES[String(cat)] || [])}
            values={selectedColleges}
            onChange={(val) => setSelectedColleges(val)}
            placeholder="Select Colleges"
            label="Colleges"
          />
          {!showCustomCollege ? (
            <TouchableOpacity onPress={() => setShowCustomCollege(true)} style={{ marginTop: SPACING.xs }}>
              <AppText variant="micro" color={COLORS.primary} weight="semibold">
                + Can't find your College? Request to add
              </AppText>
            </TouchableOpacity>
          ) : (
            <View style={{ marginTop: SPACING.xs }}>
              <Input
                placeholder="Enter college name"
                value={customCollege}
                onChangeText={setCustomCollege}
              />
              <TouchableOpacity onPress={() => { setShowCustomCollege(false); setCustomCollege(""); }} style={{ alignSelf: "flex-end", marginTop: SPACING.xs }}>
                <AppText variant="micro" color={COLORS.error} weight="semibold">
                  Cancel
                </AppText>
              </TouchableOpacity>
            </View>
          )}

          <Spacer size="md" />

          <AppText variant="caption" color={COLORS.textSecondary} style={{ marginBottom: SPACING.xs }}>
            Services you want to provide
          </AppText>
          <MultiSelectDropdown
            options={SERVICES}
            values={selectedServices}
            onChange={(val) => setSelectedServices(val)}
            placeholder="Select Services"
            label="Services"
          />

          <Spacer size="xl" />

          {/* ─── Section: Service Charges ───────────────── */}
          <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
            Service Charges
          </AppText>
          <Spacer size="xs" />
          <AppText variant="micro" color={COLORS.textMuted}>
            What is your estimated fee range?
          </AppText>
          <Spacer size="md" />
          <Row justify="space-between" gap={SPACING.md}>
            <View style={{ flex: 1 }}>
              <Input
                label="Min Price (Rs.)"
                placeholder="e.g. 500"
                keyboardType="numeric"
                value={minCharge}
                onChangeText={setMinCharge}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label="Max Price (Rs.)"
                placeholder="e.g. 2000"
                keyboardType="numeric"
                value={maxCharge}
                onChangeText={setMaxCharge}
              />
            </View>
          </Row>

          <Spacer size="xxl" />


          <Spacer size="xxl" />
        </View>
      </WrapperContainer>

      {/* ─── Sticky Bottom Button ────────────────────── */}
      <View style={[styles.stickyBottom, { paddingBottom: Math.max(insets.bottom, SPACING.md) }]}>
        <Button
          title="Submit for Verification  →"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!frontImage || !backImage || !municipality}
          onPress={() => {
            // Handle submission to backend, then navigate:
            navigation.replace("Main");
          }}
          style={styles.submitButton}
        />
      </View>

      {/* ─── Image Picker Modal ──────────────────────── */}
      <Modal
        visible={isPickerModalVisible}
        onClose={() => setPickerModalVisible(false)}
        position="bottom"
        title="Upload Document"
      >
        <Row justify="space-around" style={styles.pickerModalContent}>
          <TouchableOpacity style={styles.pickerOption} onPress={handleLaunchCamera}>
            <View style={styles.pickerIcon}>
              <Ionicons name="camera" size={32} color={COLORS.primary} />
            </View>
            <Spacer size="xs" />
            <AppText variant="body" weight="semibold">Camera</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerOption} onPress={handleLaunchGallery}>
            <View style={styles.pickerIcon}>
              <Ionicons name="images" size={32} color={COLORS.primary} />
            </View>
            <Spacer size="xs" />
            <AppText variant="body" weight="semibold">Gallery</AppText>
          </TouchableOpacity>
        </Row>
      </Modal>
    </View>
  );
};

export default ProviderVerificationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  italicTitle: {
    fontStyle: "italic",
    lineHeight: 32,
  },
  subtitle: {
    lineHeight: 22,
  },
  uploadCard: {
    borderRadius: RADIUS.md,
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  uploadContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    minHeight: 160,
  },
  uploadIconContainer: {
    alignItems: "center",
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadedImage: {
    width: "100%",
    height: 140,
    borderRadius: RADIUS.sm,
  },
  disclaimerBox: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  disclaimerText: {
    lineHeight: 18,
  },
  stickyBottom: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitButton: {
    borderRadius: RADIUS.md,
  },
  pickerModalContent: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  pickerOption: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
