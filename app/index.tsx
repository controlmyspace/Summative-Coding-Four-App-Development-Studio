// welcome screen, simplified version of my hi-fi sign in design
// ImageBackground is basically a View with a photo behind it, then a dark
// overlay on top so the cream text stays readable
// real sign in would need a backend which is way out of scope for this unit
// so both buttons just take you into the app
// using router.replace not push so you cant swipe back to here, feels more
// like real onboarding

import { View, Text, Image, ImageBackground, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";

export default function Welcome() {
  const router = useRouter();

  const enterApp = () => {
    router.replace("/(tabs)");
  };

  return (
    <ImageBackground
      source={require("../assets/images/welcome.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* dark overlay so the text is readable on any photo */}
      <View style={styles.overlay}>
        <Image
          source={require("../assets/images/logo-white.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.bottom}>
          <Text style={styles.kicker}>JOIN THE FLOCK</Text>
          <Text style={styles.headline}>Find your people{"\n"}in nature.</Text>

          <Pressable style={styles.primaryBtn} onPress={enterApp}>
            <Text style={styles.primaryBtnText}>Continue with email</Text>
          </Pressable>

          <Pressable style={styles.secondaryBtn} onPress={enterApp}>
            <Text style={styles.secondaryBtnText}>I already have an account</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(8, 8, 6, 0.55)", // brand black at 55%, tried 0.4 first but text got lost
    justifyContent: "space-between",
    padding: SPACING.l,
  },
  logo: {
    width: 240,
    height: 140,
    alignSelf: "center",
    marginTop: 100,
  },
  bottom: {
    marginBottom: SPACING.xl,
  },
  kicker: {
    color: COLORS.cream,
    textAlign: "center",
    letterSpacing: 3,
    fontSize: 12,
    marginBottom: SPACING.s,
  },
  headline: {
    color: COLORS.cream,
    textAlign: "center",
    fontSize: 34,
    fontWeight: "800",
    marginBottom: SPACING.l,
  },
  primaryBtn: {
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.m,
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  primaryBtnText: {
    color: COLORS.black,
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: COLORS.cream,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.m,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: COLORS.cream,
    fontSize: 16,
  },
});
