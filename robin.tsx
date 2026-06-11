// the robin community archive page
// three subcategories switched with the small chips, same pattern as profile
// sounds is visual only because actual recording needs expo-av and mic
// permissions which i didnt have time for, but observations and facts
// properly work, you type one and it appears
// the photo gallery at the top is community contributed too

import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import Chip from "@/components/Chip";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { ROBIN_ARCHIVE, USER } from "@/data/mockData";

const TABS = ["Sounds", "Observations", "Facts"];

export default function RobinArchive() {
  const router = useRouter();
  const [tab, setTab] = useState("Sounds");

  // contributions live in state so new ones can actually be added
  const [observations, setObservations] = useState(ROBIN_ARCHIVE.observations);
  const [facts, setFacts] = useState(ROBIN_ARCHIVE.facts);
  const [newEntry, setNewEntry] = useState("");

  const addEntry = () => {
    if (newEntry.trim() === "") return;

    if (tab === "Observations") {
      setObservations([
        { id: Date.now().toString(), text: newEntry.trim(), by: USER.name },
        ...observations,
      ]);
    }
    if (tab === "Facts") {
      setFacts([
        { id: Date.now().toString(), text: newEntry.trim(), by: USER.name },
        ...facts,
      ]);
    }
    setNewEntry("");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
      >
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Birds</Text>
        </Pressable>

        <View style={styles.container}>
          <Text style={styles.title}>Robin</Text>
          <Text style={styles.latin}>Erithacus rubecula · community archive</Text>

          {/* community photo gallery */}
          <Text style={styles.sectionTitle}>FROM THE FLOCK</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: SPACING.l }}
          >
            {ROBIN_ARCHIVE.photos.map((photo) => (
              <View key={photo.id} style={styles.photoCard}>
                <Image source={photo.image} style={styles.photo} />
                <Text style={styles.photoBy}>{photo.by}</Text>
              </View>
            ))}
          </ScrollView>

          {/* subcategory chips, small variant since theyre a sub level */}
          <View style={styles.chipRow}>
            {TABS.map((label) => (
              <Chip
                key={label}
                label={label}
                small
                active={tab === label}
                onPress={() => setTab(label)}
              />
            ))}
          </View>

          {/* sounds tab */}
          {tab === "Sounds" && (
            <View>
              {ROBIN_ARCHIVE.recordings.map((rec) => (
                <View key={rec.id} style={styles.recRow}>
                  <Text style={styles.recPlay}>▶</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recName}>{rec.name}</Text>
                    <Text style={styles.recBy}>
                      {rec.length} · recorded by {rec.by}
                    </Text>
                  </View>
                </View>
              ))}
              {/* visual only, recording needs mic access + expo-av,
                  future development */}
              <Pressable style={styles.recordBtn}>
                <Text style={styles.recordBtnText}>🎙 Add your recording</Text>
              </Pressable>
            </View>
          )}

          {/* observations tab */}
          {tab === "Observations" &&
            observations.map((obs) => (
              <View key={obs.id} style={styles.obsRow}>
                <Text style={styles.obsText}>{obs.text}</Text>
                <Text style={styles.obsBy}>- {obs.by}</Text>
              </View>
            ))}

          {/* facts tab */}
          {tab === "Facts" &&
            facts.map((fact) => (
              <View key={fact.id} style={styles.factRow}>
                <Text style={styles.factText}>🐦 {fact.text}</Text>
                <Text style={styles.obsBy}>- {fact.by}</Text>
              </View>
            ))}

          {/* one shared input for both writable tabs */}
          {tab !== "Sounds" && (
            <View style={styles.addRow}>
              <TextInput
                style={styles.input}
                placeholder={
                  tab === "Observations"
                    ? "Add an observation…"
                    : "Add a fact…"
                }
                placeholderTextColor={COLORS.creamDim}
                value={newEntry}
                onChangeText={setNewEntry}
              />
              <Pressable style={styles.addBtn} onPress={addEntry}>
                <Text style={styles.addBtnText}>Add</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.black },
  back: { paddingHorizontal: SPACING.m, paddingVertical: SPACING.s },
  backText: { color: COLORS.cream, fontSize: 17 },
  container: { paddingHorizontal: SPACING.m },
  title: { color: COLORS.cream, fontSize: 32, fontWeight: "800" },
  latin: {
    color: COLORS.green,
    fontSize: 13,
    fontStyle: "italic",
    marginTop: SPACING.xs,
    marginBottom: SPACING.m,
  },
  sectionTitle: {
    color: COLORS.creamDim,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
    marginBottom: SPACING.m,
  },
  photoCard: { marginRight: SPACING.m, width: 180 },
  photo: { width: 180, height: 220, borderRadius: RADIUS.m },
  photoBy: { color: COLORS.creamDim, fontSize: 11, marginTop: SPACING.xs },
  chipRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  // sounds styles
  recRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.m,
    marginBottom: SPACING.s,
  },
  recPlay: {
    color: COLORS.green,
    fontSize: 20,
    marginRight: SPACING.m,
  },
  recName: { color: COLORS.cream, fontSize: 14, fontWeight: "600" },
  recBy: { color: COLORS.creamDim, fontSize: 12, marginTop: 2 },
  recordBtn: {
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.s,
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  recordBtnText: { color: COLORS.green, fontWeight: "700", fontSize: 14 },
  // observations + facts styles
  obsRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    paddingVertical: SPACING.m,
  },
  obsText: { color: COLORS.cream, fontSize: 14 },
  obsBy: { color: COLORS.creamDim, fontSize: 12, marginTop: 2 },
  factRow: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.s,
    padding: SPACING.m,
    marginBottom: SPACING.s,
  },
  factText: { color: COLORS.cream, fontSize: 14, lineHeight: 20 },
  addRow: { flexDirection: "row", marginTop: SPACING.m },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: RADIUS.pill,
    color: COLORS.cream,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    marginRight: SPACING.s,
  },
  addBtn: {
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.m,
    justifyContent: "center",
  },
  addBtnText: { color: COLORS.black, fontWeight: "700" },
});
