import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Chip from "@/components/Chip";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { USER, MY_WALKS, MY_PHOTOS, FAQS, ABOUT_CARDS } from "@/data/mockData";

const SECTIONS = ["Archive", "FAQs"];
const ARCHIVE_TABS = ["My walks", "My photos"];

// profile screen, archive of your walks + photos, and the faqs / about stuff
export default function Profile() {
  const [section, setSection] = useState("Archive");
  const [archiveTab, setArchiveTab] = useState("My walks");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
      >
        <Text style={styles.heading}>Profile</Text>

        <View style={styles.avatarRow}>
          <Image
            source={require("../../assets/images/maya.jpg")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{USER.name}</Text>
            <Text style={styles.meta}>{USER.city} flock · joined 2025</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{MY_WALKS.length}</Text>
            <Text style={styles.statLabel}>walks</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>34</Text>
            <Text style={styles.statLabel}>birds spotted</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{MY_PHOTOS.length}</Text>
            <Text style={styles.statLabel}>photos</Text>
          </View>
        </View>

        <View style={styles.chipRow}>
          {SECTIONS.map((label) => (
            <Chip
              key={label}
              label={label}
              active={section === label}
              onPress={() => setSection(label)}
            />
          ))}
        </View>

        {section === "Archive" && (
          <View>
            
            <View style={styles.chipRow}>
              {ARCHIVE_TABS.map((label) => (
                <Chip
                  key={label}
                  label={label}
                  small
                  active={archiveTab === label}
                  onPress={() => setArchiveTab(label)}
                />
              ))}
            </View>

            {archiveTab === "My walks" &&
              MY_WALKS.map((walk) => (
                <View key={walk.id} style={styles.walkRow}>
                  <Text style={styles.walkTitle}>{walk.title}</Text>
                  <Text style={styles.walkDate}>{walk.date}</Text>
                </View>
              ))}

            {archiveTab === "My photos" && (
              <View style={styles.photoGrid}>
                {MY_PHOTOS.map((photo) => (
                  <Image key={photo.id} source={photo.image} style={styles.gridPhoto} />
                ))}
              </View>
            )}
          </View>
        )}

        {section === "FAQs" && (
          <View>
    
            {ABOUT_CARDS.map((card) => (
              <View key={card.id} style={styles.aboutCard}>
                <Text style={styles.aboutKicker}>{card.kicker}</Text>
                <Text style={styles.aboutText}>{card.text}</Text>
              </View>
            ))}
            {FAQS.map((faq) => (
              <View key={faq.id} style={styles.faqRow}>
                <Text style={styles.faqQ}>{faq.q}</Text>
                <Text style={styles.faqA}>{faq.a}</Text>
              </View>
            ))}
          </View>
        )}

        <Pressable style={styles.settingsRow}>
          <Text style={styles.settingsText}>  Settings</Text>
          <Text style={styles.settingsChevron}>›</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.black },
  container: { flex: 1, paddingHorizontal: SPACING.m },
  heading: {
    color: COLORS.cream,
    fontSize: 32,
    fontWeight: "800",
    marginTop: SPACING.s,
    marginBottom: SPACING.l,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.l,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.green,
    marginRight: SPACING.m,
  },
  name: { color: COLORS.cream, fontSize: 22, fontWeight: "800" },
  meta: { color: COLORS.creamDim, fontSize: 13, marginTop: 2 },
  statsRow: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.l,
  },
  stat: { flex: 1, alignItems: "center" },
  statNumber: { color: COLORS.yellow, fontSize: 24, fontWeight: "800" },
  statLabel: { color: COLORS.creamDim, fontSize: 12, marginTop: 2 },
  chipRow: {
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  walkRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    paddingVertical: SPACING.m,
  },
  walkTitle: { color: COLORS.cream, fontSize: 15, fontWeight: "600" },
  walkDate: { color: COLORS.creamDim, fontSize: 12, marginTop: 2 },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.m,
  },
  gridPhoto: {
    width: "47%",
    height: 150,
    borderRadius: RADIUS.s,
  },
  aboutCard: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.s,
  },
  aboutKicker: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: SPACING.xs,
  },
  aboutText: {
    color: COLORS.cream,
    fontSize: 13,
    lineHeight: 19,
  },
  faqRow: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.m,
    marginBottom: SPACING.s,
  },
  faqQ: { color: COLORS.cream, fontSize: 15, fontWeight: "700" },
  faqA: { color: COLORS.creamDim, fontSize: 13, marginTop: SPACING.xs, lineHeight: 18 },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingVertical: SPACING.m,
    marginTop: SPACING.l,
  },
  settingsText: { color: COLORS.cream, fontSize: 16 },
  settingsChevron: { color: COLORS.creamDim, fontSize: 22 },
});
