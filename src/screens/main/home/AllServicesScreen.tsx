import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { Header, WrapperContainer, Card, AppText, Spacer } from "@components/index";
import { ROUTES } from "@constants/index";
import { SERVICES } from "./HomeScreen";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AllServicesScreen = ({ navigation }: any) => {
  return (
    <>
      <Header
        title="All Services"
        leftIcon={<Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />}
        leftAction={() => navigation.goBack()}
        elevated
      />
      <WrapperContainer scroll backgroundColor={COLORS.surface} edges={['left', 'right']}>
        <Spacer size="lg" />
        <View style={styles.servicesGrid}>
          {SERVICES.map((service) => {
            if (service.id === "more") return null; // We don't need 'more' tile in All Services

            return (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCardWrapper}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(ROUTES.DETAIL, { service: service.title })}
              >
                <Card variant="elevated" padding={SPACING.lg} style={styles.serviceCard}>
                  <View style={[styles.serviceIconWrap, { backgroundColor: service.bgColor }]}>
                    <Ionicons name={service.icon as any} size={28} color={service.color} />
                  </View>
                  <Spacer size="sm" />
                  <AppText variant="caption" weight="bold" color={COLORS.textPrimary} numberOfLines={1} style={styles.serviceTitle}>
                    {service.title}
                  </AppText>
                  <AppText variant="micro" color={COLORS.textMuted} numberOfLines={2} style={styles.serviceDesc}>
                    {service.description}
                  </AppText>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
        <Spacer size="xxxl" />
      </WrapperContainer>
    </>
  );
};

export default AllServicesScreen;

const styles = StyleSheet.create({
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  serviceCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.lg * 2 - SPACING.md) / 2,
    marginBottom: SPACING.md,
  },
  serviceCard: {
    alignItems: "center",
    minHeight: 140,
    justifyContent: "center",
    borderRadius: RADIUS.md,
  },
  serviceIconWrap: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  serviceDesc: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 2,
  },
});
