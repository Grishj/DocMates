import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@constants/fonts";
import { ROUTES } from "@constants/index";
import { COLORS, SPACING, RADIUS } from "../../../theme";
import { Header, WrapperContainer, AppText, Card, Row, Column } from "@components/index";

export default function RegistrationTypeScreen({ navigation, route }: { navigation: any, route: any }) {
  const university = route?.params?.university;
  const category = route?.params?.category;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        backgroundColor={COLORS.surface}
        variant="default"
      />
      <WrapperContainer scroll backgroundColor={COLORS.surface} edges={["left", "right", "bottom"]}>
        <View style={styles.headerSection}>
          <AppText style={styles.title}>Where is your college <AppText style={{ color: '#B84318', fontFamily: FONTS.bold, fontSize: 28 }}>registered?</AppText></AppText>
          <AppText style={styles.description}>
            Select the administrative category of your institution to help us curate the correct document verification workflow for you.
          </AppText>
        </View>

        <View style={styles.cardsContainer}>
          {/* Government College Card */}
          <Card
            variant="flat"
            style={[styles.card, { borderLeftColor: "#B84318" }]}
            onPress={() => navigation.navigate(ROUTES.SELECT_COLLEGE, { university, category, registrationType: "government" })}
            padding={SPACING.lg}
          >
            <View style={styles.watermarkContainer}>
              <Ionicons name="business" size={80} color="#E0E0E0" style={{ opacity: 0.5 }} />
            </View>
            <Column gap={SPACING.md} style={{ zIndex: 1 }}>
              <View style={[styles.iconWrapper, { backgroundColor: "#F3E6E1" }]}>
                <Ionicons name="business" size={24} color="#B84318" />
              </View>
              <Column gap={2}>
                <AppText style={styles.cardTitle}>Government College</AppText>
              </Column>
              <AppText style={styles.cardDesc}>
                Institutions fully owned and managed by the provincial or national government agencies.
              </AppText>
              <View style={{ marginTop: SPACING.sm }}>
                  <Row align="center">
                    <AppText style={styles.actionTextGov}>Select Institution</AppText>
                    <Ionicons name="chevron-forward" size={14} color="#B84318" style={{marginLeft: 4, marginTop: 2}} />
                  </Row>
              </View>
            </Column>
          </Card>

          {/* Affiliated College Card */}
          <Card
            variant="flat"
            style={[styles.card, { borderLeftColor: COLORS.navy }]}
            onPress={() => navigation.navigate(ROUTES.SELECT_COLLEGE, { university, category, registrationType: "affiliated" })}
            padding={SPACING.lg}
          >
             <View style={styles.watermarkContainer}>
              <Ionicons name="git-network" size={80} color="#E0E0E0" style={{ opacity: 0.5 }} />
            </View>
            <Column gap={SPACING.md} style={{ zIndex: 1 }}>
              <View style={[styles.iconWrapper, { backgroundColor: "#E8EAF6" }]}>
                <Ionicons name="git-network" size={24} color={COLORS.navy} />
              </View>
              <Column gap={2}>
                <AppText style={styles.cardTitleNavy}>Affiliated College</AppText>
              </Column>
              <AppText style={styles.cardDesc}>
                Private or community institutions registered under a parent University's framework.
              </AppText>
              <View style={{ marginTop: SPACING.sm }}>
                  <Row align="center">
                    <AppText style={styles.actionTextNavy}>Select Institution</AppText>
                    <Ionicons name="chevron-forward" size={14} color={COLORS.navy} style={{marginLeft: 4, marginTop: 2}} />
                  </Row>
              </View>
            </Column>
          </Card>
        </View>
        <View style={{ height: 40 }} />
      </WrapperContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingVertical: SPACING.md,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: '#000000',
    marginBottom: 16,
  },
  description: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: '#757575',
    lineHeight: 22,
  },
  cardsContainer: {
    marginTop: SPACING.xl,
    gap: SPACING.lg,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: RADIUS.lg,
    // The image doesn't seem to have the left border, but it looks good so we can keep it or remove it.
    // We'll remove it to match screenshot more closely, but maybe keep a subtle flat border. 
    // The previous screen had a left border, this image doesn't show one explicitly, but let's test without it.
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden'
  },
  watermarkContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 0,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 20,
    color: '#B84318',
  },
  cardTitleNavy: {
    fontFamily: FONTS.semibold,
    fontSize: 20,
    color: COLORS.navy,
  },
  cardDesc: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  actionTextGov: {
      fontFamily: FONTS.medium,
      fontSize: 14,
      color: '#B84318',
  },
  actionTextNavy: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.navy,
}
});
