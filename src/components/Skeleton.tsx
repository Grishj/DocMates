// components/Skeleton.tsx

import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle, Easing } from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";

// ============================================================================
// TYPES
// ============================================================================

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  borderRadius?: number;
  style?: ViewStyle;
  backgroundColor?: string;
  highlightColor?: string;
}

// ============================================================================
// BASE SKELETON COMPONENT
// ============================================================================

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  variant = "text",
  animation = "pulse",
  borderRadius,
  style,
  backgroundColor = COLORS.border,
  highlightColor = "#F5F5F5",
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animation === "none") return;

    const animationType =
      animation === "pulse"
        ? Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 1000,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 1000,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ])
        : Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.ease,
            useNativeDriver: true,
          });

    Animated.loop(animationType).start();
  }, [animation]);

  const getBorderRadius = (): number => {
    if (borderRadius !== undefined) return borderRadius;

    switch (variant) {
      case "circular":
        return typeof width === "number" ? width / 2 : 50;
      case "rounded":
        return RADIUS.md;
      case "rectangular":
        return 0;
      case "text":
      default:
        return RADIUS.sm;
    }
  };

  const getHeight = (): number | string => {
    if (variant === "circular" && typeof width === "number") {
      return width;
    }
    return height;
  };

  const opacity =
    animation === "pulse"
      ? animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        })
      : 1;

  const translateX =
    animation === "wave"
      ? animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-350, 350],
        })
      : 0;

  const containerStyle: ViewStyle = {
    width: width as any,
    height: getHeight() as any,
    backgroundColor,
    borderRadius: getBorderRadius(),
    overflow: "hidden",
  };

  return (
    <View style={[containerStyle, style]}>
      {animation === "pulse" && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: highlightColor,
              opacity,
            },
          ]}
        />
      )}
      {animation === "wave" && (
        <Animated.View
          style={[
            styles.wave,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <View
            style={[styles.gradient, { backgroundColor: highlightColor }]}
          />
        </Animated.View>
      )}
    </View>
  );
};

// ============================================================================
// SKELETON GROUP
// ============================================================================

interface SkeletonGroupProps {
  children: React.ReactNode;
  spacing?: number;
  style?: ViewStyle;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  children,
  spacing = 0,
  style,
}) => {
  return <View style={[{ gap: spacing }, style]}>{children}</View>;
};

// ============================================================================
// PRE-BUILT TEMPLATES
// ============================================================================

interface TemplateProps {
  style?: ViewStyle;
  animation?: SkeletonAnimation;
}

// Avatar
export const SkeletonAvatar: React.FC<{
  size?: number;
  style?: ViewStyle;
  animation?: SkeletonAnimation;
}> = ({ size = 40, style, animation = "pulse" }) => (
  <Skeleton
    width={size}
    height={size}
    variant="circular"
    animation={animation}
    style={style}
  />
);

// Text Lines
export const SkeletonText: React.FC<{
  width?: number | string;
  lines?: number;
  spacing?: number;
  style?: ViewStyle;
  animation?: SkeletonAnimation;
}> = ({
  width = "100%",
  lines = 1,
  spacing = 8,
  style,
  animation = "pulse",
}) => {
  if (lines === 1) {
    return (
      <Skeleton width={width} height={16} animation={animation} style={style} />
    );
  }

  return (
    <SkeletonGroup spacing={spacing} style={style}>
      {Array.from({ length: lines }).map((_, index) => {
        const lineWidth = index === lines - 1 ? "70%" : width;
        return (
          <Skeleton
            key={index}
            width={lineWidth}
            height={16}
            animation={animation}
          />
        );
      })}
    </SkeletonGroup>
  );
};

// Card
export const SkeletonCard: React.FC<TemplateProps> = ({
  style,
  animation = "pulse",
}) => (
  <View style={[styles.card, style]}>
    <Skeleton
      width="100%"
      height={200}
      variant="rectangular"
      animation={animation}
    />
    <View style={{ marginTop: 12 }}>
      <SkeletonText lines={3} spacing={8} animation={animation} />
    </View>
  </View>
);

// List Item
export const SkeletonListItem: React.FC<{
  showAvatar?: boolean;
  showThumbnail?: boolean;
  style?: ViewStyle;
  animation?: SkeletonAnimation;
}> = ({
  showAvatar = true,
  showThumbnail = false,
  style,
  animation = "pulse",
}) => (
  <View style={[styles.listItem, style]}>
    {showAvatar && <SkeletonAvatar size={48} animation={animation} />}
    {showThumbnail && (
      <Skeleton
        width={80}
        height={80}
        variant="rounded"
        animation={animation}
      />
    )}
    <View style={styles.listContent}>
      <Skeleton
        width="80%"
        height={16}
        animation={animation}
        style={{ marginBottom: 8 }}
      />
      <Skeleton width="60%" height={14} animation={animation} />
    </View>
  </View>
);

// Profile
export const SkeletonProfile: React.FC<TemplateProps> = ({
  style,
  animation = "pulse",
}) => (
  <View style={[styles.profile, style]}>
    <SkeletonAvatar
      size={80}
      animation={animation}
      style={{ marginBottom: 16 }}
    />
    <Skeleton
      width={150}
      height={20}
      animation={animation}
      style={{ marginBottom: 8 }}
    />
    <Skeleton
      width={100}
      height={16}
      animation={animation}
      style={{ marginBottom: 16 }}
    />
    <View style={styles.profileStats}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.statItem}>
          <Skeleton
            width={40}
            height={24}
            animation={animation}
            style={{ marginBottom: 4 }}
          />
          <Skeleton width={60} height={14} animation={animation} />
        </View>
      ))}
    </View>
  </View>
);

// Product
export const SkeletonProduct: React.FC<TemplateProps> = ({
  style,
  animation = "pulse",
}) => (
  <View style={[styles.product, style]}>
    <Skeleton
      width="100%"
      height={180}
      variant="rounded"
      animation={animation}
      style={{ marginBottom: 12 }}
    />
    <Skeleton
      width="80%"
      height={18}
      animation={animation}
      style={{ marginBottom: 8 }}
    />
    <Skeleton
      width="60%"
      height={16}
      animation={animation}
      style={{ marginBottom: 8 }}
    />
    <View style={styles.productFooter}>
      <Skeleton width={80} height={24} animation={animation} />
      <Skeleton
        width={40}
        height={40}
        variant="circular"
        animation={animation}
      />
    </View>
  </View>
);

// Article
export const SkeletonArticle: React.FC<TemplateProps> = ({
  style,
  animation = "pulse",
}) => (
  <View style={[styles.article, style]}>
    <Skeleton
      width="100%"
      height={200}
      variant="rounded"
      animation={animation}
      style={{ marginBottom: 16 }}
    />
    <Skeleton
      width="90%"
      height={24}
      animation={animation}
      style={{ marginBottom: 12 }}
    />
    <SkeletonText
      lines={4}
      spacing={8}
      animation={animation}
      style={{ marginBottom: 16 }}
    />
    <View style={styles.articleMeta}>
      <SkeletonAvatar size={32} animation={animation} />
      <View style={styles.articleAuthor}>
        <Skeleton
          width={100}
          height={14}
          animation={animation}
          style={{ marginBottom: 4 }}
        />
        <Skeleton width={80} height={12} animation={animation} />
      </View>
    </View>
  </View>
);

// Comment
export const SkeletonComment: React.FC<TemplateProps> = ({
  style,
  animation = "pulse",
}) => (
  <View style={[styles.comment, style]}>
    <SkeletonAvatar size={40} animation={animation} />
    <View style={styles.commentContent}>
      <Skeleton
        width={120}
        height={14}
        animation={animation}
        style={{ marginBottom: 8 }}
      />
      <SkeletonText lines={2} spacing={6} animation={animation} />
    </View>
  </View>
);

// Form
export const SkeletonForm: React.FC<{
  fields?: number;
  style?: ViewStyle;
  animation?: SkeletonAnimation;
}> = ({ fields = 3, style, animation = "pulse" }) => (
  <View style={[styles.form, style]}>
    {Array.from({ length: fields }).map((_, index) => (
      <View key={index} style={styles.formField}>
        <Skeleton
          width={100}
          height={14}
          animation={animation}
          style={{ marginBottom: 8 }}
        />
        <Skeleton
          width="100%"
          height={48}
          variant="rounded"
          animation={animation}
        />
      </View>
    ))}
  </View>
);

// Feed Item
export const SkeletonFeedItem: React.FC<TemplateProps> = ({
  style,
  animation = "pulse",
}) => (
  <View style={[styles.feedItem, style]}>
    <View style={styles.feedHeader}>
      <SkeletonAvatar size={40} animation={animation} />
      <View style={styles.feedHeaderText}>
        <Skeleton
          width={120}
          height={16}
          animation={animation}
          style={{ marginBottom: 4 }}
        />
        <Skeleton width={80} height={12} animation={animation} />
      </View>
    </View>
    <SkeletonText
      lines={3}
      spacing={6}
      animation={animation}
      style={{ marginVertical: 12 }}
    />
    <Skeleton
      width="100%"
      height={250}
      variant="rounded"
      animation={animation}
      style={{ marginBottom: 12 }}
    />
    <View style={styles.feedActions}>
      {[1, 2, 3].map((item) => (
        <Skeleton
          key={item}
          width={60}
          height={32}
          variant="rounded"
          animation={animation}
        />
      ))}
    </View>
  </View>
);

// Table Row
export const SkeletonTableRow: React.FC<{
  columns?: number;
  style?: ViewStyle;
  animation?: SkeletonAnimation;
}> = ({ columns = 4, style, animation = "pulse" }) => (
  <View style={[styles.tableRow, style]}>
    {Array.from({ length: columns }).map((_, index) => (
      <Skeleton
        key={index}
        width={`${100 / columns}%`}
        height={16}
        animation={animation}
        style={{ marginHorizontal: 4 }}
      />
    ))}
  </View>
);

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  wave: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  gradient: {
    flex: 1,
    opacity: 0.5,
  },
  card: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  listContent: {
    flex: 1,
  },
  profile: {
    alignItems: "center",
    padding: 20,
  },
  profileStats: {
    flexDirection: "row",
    gap: 24,
  },
  statItem: {
    alignItems: "center",
  },
  article: {
    padding: 16,
  },
  articleMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  articleAuthor: {
    flex: 1,
  },
  product: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comment: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
  commentContent: {
    flex: 1,
  },
  form: {
    gap: 16,
  },
  formField: {
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  feedItem: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    marginBottom: 16,
  },
  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  feedHeaderText: {
    flex: 1,
  },
  feedActions: {
    flexDirection: "row",
    gap: 12,
  },
});
