// components/cards/ListItemCard.tsx

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Card from "./Card";
import { COLORS } from "../theme/colors";
import { TYPOGRAPHY } from "../theme/typography";

interface ListItemCardProps {
  title: string;
  description?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  variant?: "elevated" | "outlined" | "flat";
  style?: ViewStyle;
  onPress?: () => void;
}

const ListItemCard: React.FC<ListItemCardProps> = ({
  title,
  description,
  leftContent,
  rightContent,
  badge,
  badgeColor = COLORS.primary,
  variant = "elevated",
  style,
  onPress,
}) => {
  return (
    <Card variant={variant} style={style} onPress={onPress} padding={12}>
      <View style={styles.container}>
        {leftContent && <View style={styles.leftContent}>{leftContent}</View>}

        <View style={styles.mainContent}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {badge && (
              <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>

        {rightContent && (
          <View style={styles.rightContent}>{rightContent}</View>
        )}
      </View>
    </Card>
  );
};
export default ListItemCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    marginRight: 12,
  },
  mainContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    flex: 1,
  },
  description: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    ...TYPOGRAPHY.micro,
    color: COLORS.white,
  },
  rightContent: {
    marginLeft: 12,
  },
});
