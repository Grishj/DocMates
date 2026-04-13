// components/Avatar/Avatar.tsx

import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SHADOWS } from "../theme/shadows";
import { TYPOGRAPHY } from "../theme/typography";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type AvatarVariant = "circular" | "rounded" | "square";

interface AvatarProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  source?: string | number;
  name?: string;
  backgroundColor?: string;
  textColor?: string;
  showBadge?: boolean;
  badgeColor?: string;
  badgePosition?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  withShadow?: boolean;
}

const AVATAR_SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
  xxl: 96,
};

const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
};

const BADGE_SIZES = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 16,
};

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  variant = "circular",
  source,
  name,
  backgroundColor = COLORS.primary,
  textColor = COLORS.white,
  showBadge = false,
  badgeColor = COLORS.success,
  badgePosition = "bottom-right",
  style,
  imageStyle,
  withShadow = false,
}) => {
  const avatarSize = AVATAR_SIZES[size];
  const fontSize = FONT_SIZES[size];
  const badgeSize = BADGE_SIZES[size];

  const getBorderRadius = () => {
    switch (variant) {
      case "circular":
        return RADIUS.full;
      case "rounded":
        return RADIUS.md;
      case "square":
        return 0;
      default:
        return RADIUS.full;
    }
  };

  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const getBadgePosition = () => {
    const offset = badgeSize / 4;
    switch (badgePosition) {
      case "top-right":
        return { top: offset, right: offset };
      case "bottom-right":
        return { bottom: offset, right: offset };
      case "top-left":
        return { top: offset, left: offset };
      case "bottom-left":
        return { bottom: offset, left: offset };
      default:
        return { bottom: offset, right: offset };
    }
  };

  const containerStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: getBorderRadius(),
    backgroundColor: source ? COLORS.border : backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    ...(withShadow && SHADOWS.card),
  };

  const textStyle: TextStyle = {
    color: textColor,
    fontSize: fontSize,
    fontFamily: TYPOGRAPHY.body.fontFamily,
  };

  const badgeStyle: ViewStyle = {
    position: "absolute",
    width: badgeSize,
    height: badgeSize,
    borderRadius: RADIUS.full,
    backgroundColor: badgeColor,
    borderWidth: 2,
    borderColor: COLORS.white,
    ...getBadgePosition(),
  };

  const renderContent = () => {
    if (source) {
      return (
        <Image
          source={typeof source === "string" ? { uri: source } : source}
          style={[
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: getBorderRadius(),
            },
            imageStyle,
          ]}
          resizeMode="cover"
        />
      );
    }

    if (name) {
      return <Text style={textStyle}>{getInitials(name)}</Text>;
    }

    return <Text style={textStyle}>?</Text>;
  };

  return (
    <View style={[containerStyle, style]}>
      {renderContent()}
      {showBadge && <View style={badgeStyle} />}
    </View>
  );
};
export default Avatar;
