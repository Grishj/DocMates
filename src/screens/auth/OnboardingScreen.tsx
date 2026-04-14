import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
  ViewToken,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../theme";
import {
  AppText,
  Button,
  Spacer,
  WrapperContainer,
  Avatar,
  Card,
  Chip,
  Row,
} from "../../components";
import { ROUTES } from "../../constants";

const { width } = Dimensions.get("window");

// ─── Slide Data ──────────────────────────────────────
type SlideData = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
};

const SLIDES: SlideData[] = [
  {
    id: "1",
    title: "Real-time\nTracking",
    subtitle: "Stay updated at every step.",
    body: "From submission to delivery, track your documents in real-time. Our proactive service ensures you never lose sight of your vital government registrations.",
  },
  {
    id: "2",
    title: "Verified Professionals\n(DartaSathis)",
    subtitle: "Connect with vetted facilitators.",
    body: "Connect with vetted facilitators who know the ins and outs of university and government offices. Build trust with clients through our rigorous verification process.",
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      navigation.navigate(ROUTES.ROLE_SELECTION);
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: activeIndex - 1 });
    } else {
      navigation.goBack();
    }
  };

  // ─── Slide 1: Real-time Tracking ─────────────────
  const renderSlide1 = () => (
    <View style={styles.slideContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Top decorative header */}
      <View style={styles.slide1Header}>
        <View style={styles.nepaliTextRow}>
          <AppText variant="micro" color="rgba(255,255,255,0.7)">
            तपाईंको कागजात, हाम्रो जिम्मेवारी
          </AppText>
        </View>
      </View>

      {/* Tracking flow illustration */}
      <View style={styles.trackingCard}>
        <View style={styles.trackingStep}>
          <View style={[styles.trackingDot, styles.trackingDotActive]} />
          <AppText variant="micro" weight="semibold" color={COLORS.primary}>
            Submitted
          </AppText>
        </View>
        <View style={styles.trackingLine} />
        <View style={styles.trackingStep}>
          <View style={[styles.trackingDot, styles.trackingDotPending]} />
          <AppText variant="micro" color={COLORS.textMuted}>
            Processing
          </AppText>
        </View>
        <View style={styles.trackingLine} />
        <View style={styles.trackingStep}>
          <View style={[styles.trackingDot, styles.trackingDotPending]} />
          <AppText variant="micro" color={COLORS.textMuted}>
            Delivery
          </AppText>
        </View>
      </View>

      <Spacer size="xl" />

      {/* Title */}
      <AppText variant="h1" color={COLORS.textPrimary} style={styles.slideTitle}>
        {SLIDES[0].title}
      </AppText>

      <Spacer size="md" />

      {/* Body */}
      <AppText variant="body" color={COLORS.textSecondary} style={styles.slideBody}>
        {SLIDES[0].body}
      </AppText>
    </View>
  );

  // ─── Slide 2: Verified Professionals ─────────────
  const renderSlide2 = () => (
    <View style={styles.slideContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Top decorative */}
      <View style={styles.slide2Header}>
        <View style={styles.nepaliTextRow}>
          <AppText variant="micro" color="rgba(0,0,0,0.4)">
            तपाईंको कागजात, हाम्रो जिम्मेवारी
          </AppText>
        </View>

        {/* Brand logo */}
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <AppText variant="caption" weight="bold" color={COLORS.white}>
              S
            </AppText>
          </View>
          <AppText variant="h2" weight="bold" color={COLORS.primary}>
            DocsMate          </AppText>
        </View>
      </View>

      <Spacer size="lg" />

      {/* Expert profile card */}
      <View style={styles.profileSection}>
        <Avatar
          size="xl"
          name="Arjun Shrestha"
          backgroundColor={COLORS.primary}
          withShadow
        />

        <Spacer size="md" />

        <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
          Arjun Shrestha
        </AppText>

        <Spacer size="xs" />

        <Chip
          label="DartaSathi Expert"
          variant="filled"
          color="#4CAF50"
          textColor={COLORS.white}
          size="sm"
        />

        <Spacer size="xs" />

        <Row gap={SPACING.sm} justify="center">
          <View style={styles.statBadge}>
            <AppText variant="micro" color={COLORS.textMuted}>
              ⭐ 4.8/5.0
            </AppText>
          </View>
          <View style={styles.statBadge}>
            <AppText variant="micro" color={COLORS.textMuted}>
              ✓ Verified
            </AppText>
          </View>
        </Row>
      </View>

      <Spacer size="xl" />

      {/* Title */}
      <AppText variant="h2" weight="bold" color={COLORS.textPrimary}>
        Verified Professionals (DocsMates)
      </AppText>

      <Spacer size="md" />

      {/* Body */}
      <AppText variant="body" color={COLORS.textSecondary} style={styles.slideBody}>
        {SLIDES[1].body}
      </AppText>
    </View>
  );

  const renderSlide = ({ item, index }: { item: SlideData; index: number }) => {
    return (
      <View style={{ width }}>
        <View style={styles.slideInnerPadding}>
          {index === 0 ? renderSlide1() : renderSlide2()}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* ─── Bottom Controls ─────────────────────────── */}
      <View style={styles.bottomControls}>
        {/* CTA Button */}
        <Button
          title={activeIndex === SLIDES.length - 1 ? "Get Started  →" : "Next  →"}
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleNext}
          style={styles.ctaButton}
        />

        <Spacer size="md" />

        {/* Back link */}
        <TouchableOpacity onPress={handleBack}>
          <AppText variant="caption" weight="semibold" color={COLORS.textMuted} align="center">
            Back
          </AppText>
        </TouchableOpacity>

        <Spacer size="lg" />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ─── Slides ──────────────────────────────────────
  slideContainer: {
    flex: 1,
  },
  slideInnerPadding: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxxl + SPACING.xl,
  },
  slideTitle: {
    lineHeight: 34,
  },
  slideBody: {
    lineHeight: 24,
  },

  // ─── Slide 1 ─────────────────────────────────────
  slide1Header: {
    marginBottom: SPACING.xl,
  },
  nepaliTextRow: {
    marginBottom: SPACING.sm,
  },
  trackingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  trackingStep: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  trackingDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  trackingDotActive: {
    backgroundColor: COLORS.primary,
  },
  trackingDotPending: {
    backgroundColor: COLORS.border,
  },
  trackingLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.xs,
    marginBottom: SPACING.lg,
  },

  // ─── Slide 2 ─────────────────────────────────────
  slide2Header: {
    marginBottom: SPACING.md,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  statBadge: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // ─── Bottom Controls ─────────────────────────────
  bottomControls: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  ctaButton: {
    borderRadius: RADIUS.md,
  },
});
