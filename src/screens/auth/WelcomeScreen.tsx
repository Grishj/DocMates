import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Box,
  Button,
  Chip,
  ChipGroup,
  Column,
  Divider,
  Row,
  Spacer,
  WrapperContainer,
} from "@components/index";
import { useState } from "react";
import AppText from "@components/ui/Text";
import { COLORS, RADIUS, SPACING } from "@theme/index";
import { FONTS } from "@constants/fonts";
import AppImage from "@components/AppImage";
import Card from "@components/Card";
import FeatureCard from "@components/FeatureCard";
import ListItemCard from "@components/ListItemCard";
import FAB from "@components/FAB";
const WelcomeScreen = () => {
  const [amenities, setAmenities] = useState<string[]>([]);

  return (
    <WrapperContainer>
      <AppText variant="h1" color={COLORS.primary} align="center">
        Welcome To DocsMate
      </AppText>
      <AppText
        variant="body"
        color={COLORS.black}
        align="center"
        weight="regular"
      >
        Campus too far? No worries! DocMate's got you covered!
      </AppText>
      <Row justify="flex-start" gap={SPACING.md} wrap>
        <Chip label="Furnished" />
        <Chip label="Available" variant="outline" />
        <Chip label="New" variant="soft" color={COLORS.success} selected />
      </Row>

      <Button
        title="Go to Login"
        onPress={() => console.log("Navigate to Login")}
        variant="primary"
        size="lg"
        leftIcon={<Text>👋</Text>}
        rightIcon={<Text>➡️</Text>}
        loading={false}
      />
      <ChipGroup
        options={[
          { label: "WiFi", value: "wifi", leftIcon: <Text>📶</Text> },
          { label: "Parking", value: "parking", leftIcon: <Text>🅿️</Text> },
          { label: "Water", value: "water", leftIcon: <Text>💧</Text> },
          { label: "Furnished", value: "furnished", leftIcon: <Text>🛋️</Text> },
        ]}
        value={amenities}
        onChange={(val) => setAmenities(val as string[])}
        variant="soft"
        color={COLORS.primary}
      />
      <Box bg={COLORS.surface} radius={RADIUS.md} p={SPACING.md} shadow>
        <Row justify="space-between">
          <AppText variant="h2">Butwal Flat</AppText>
          <AppText color={COLORS.primary}>Rs 8,000</AppText>
        </Row>
        <Spacer size="sm" />
        <AppImage source="https://..." variant="rounded" height={180} />
        <Spacer size="sm" />
        <Divider label="Details" />
        <Spacer size="sm" />
        <Column gap={SPACING.xs}>
          <AppText variant="caption" color={COLORS.textSecondary}>
            2BHK · Kalikanagar
          </AppText>
          <AppText variant="micro" color={COLORS.textMuted}>
            Posted 2 days ago
          </AppText>
        </Column>
      </Box>

      <Card variant="elevated" padding={SPACING.md} margin={SPACING.md}>
        <AppText variant="h2">Elevated Card</AppText>
        <AppText variant="body" color={COLORS.textSecondary}>
          This card has a shadow to give it an elevated look.
        </AppText>
      </Card>

      <FeatureCard
        title="Feature Card"
        description="This is a simple feature card with an image and action button."
        image={{ uri: "https://..." }}
        action={
          <Button
            title="Learn More"
            variant="secondary"
            size="sm"
            onPress={() => console.log("pressed")}
          />
        }
      />
      <FAB
        color={COLORS.primary}
        actions={[
          {
            label: "Add Room",
            onPress: () => navigation.navigate("AddRoom"),
            color: COLORS.primary,
            icon: <Text>🏠</Text>,
          },
          {
            label: "Add Photo",
            onPress: () => console.log("Add Photo"),
            color: COLORS.navy,
            icon: <Text>📸</Text>,
          },
          {
            label: "Scan Document",
            onPress: () => console.log("Scan Document"),
            color: COLORS.success,
            icon: <Text>🔍</Text>,
          },
        ]}
      />
      <Chip label="Furnished" />
      <Chip label="Available" variant="outline" />
      <Chip label="New" variant="soft" color={COLORS.success} selected />
    </WrapperContainer>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
