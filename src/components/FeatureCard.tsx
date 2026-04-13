// components/cards/FeatureCard.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from "react-native";
import Card from "./Card";
import { COLORS } from "../theme/colors";
import { TYPOGRAPHY } from "../theme/typography";
import { RADIUS } from "../theme/radius";
interface FeatureCardProps {
  title: string;
  description: string;
  image?: ImageSourcePropType;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "elevated" | "outlined" | "flat";
  style?: ViewStyle;
  onPress?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
  icon,
  action,
  variant = "elevated",
  style,
  onPress,
}) => {
  return (
    <Card variant={variant} style={style} onPress={onPress} padding={0}>
      {image && (
        <Image source={image} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {action && <View style={styles.actionContainer}>{action}</View>}
      </View>
    </Card>
  );
};
export default FeatureCard;
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: RADIUS.md,
    borderTopRightRadius: RADIUS.md,
  },
  content: {
    padding: 16,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  actionContainer: {
    marginTop: 16,
  },
});
