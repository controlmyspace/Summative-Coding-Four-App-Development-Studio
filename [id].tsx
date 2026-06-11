// walk detail screen. dynamic route so /walk/1, /walk/2 etc all open this,
// useLocalSearchParams reads the id from the url and i look the event up
// the live walk also has the animal fact competition, a little community game
// where walkers vote for the best fact heard on the walk and can add their own
// same state logic as the polls basically

import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { EVENTS, FACTS } from "@/data/mockData";

export default function WalkDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [joined, setJoined] = useState(false);

  // fact competition state, only shows on the live walk
  const [facts, setFacts] = useState(FACTS);
  const [myFactVote, setMyFactVote] = useState<string | null>(null);
  const [newFact, setNewFact] = useState("");

  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Walk not found.</Text>
      </SafeAreaView>
    );
  }

  const voteFact = (factId: string) => {
    if (factId === myFactVote) return;
    setFacts(
      facts.map((fact) => {
        if (fact.id === factId) return { ...fact, votes: fact.votes + 1 };
        if (fact.id === myFactVote) return { ...fact, votes: fact.votes - 1 };
        return fact;
      })
    );
    setMyFactVote(factId);
  };

  const submitFact = () => {
    if (newFact.trim() === "") return;
    setFacts([
      ...facts,
      { id: Date.now().toString(), text: newFact.trim(), by: "Maya", votes: 0 },
    ]);
    setNewFact("");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
      >
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        {/* stylised map image with the pins positioned on top */}
        <ImageBackground
          source={require("../../assets/images/map-hampstead.jpg")}
          style={styles.map}
          imageStyle={{ borderRadius: RADIUS.l }}
          resizeMode="cover"
        >
          {event.live && (
            <Text style={styles.liveBadge}>● LIVE · {event.going} here</Text>
          )}
          <View style={styles.groupDot}>
            <Text style={styles.groupDotText}>🐦</Text>
          </View>
          <View style={styles.youDot}>
            <Text style={styles.youDotText}>you</Text>
          </View>
        </ImageBackground>

        <View style={styles.body}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.duration}
          </Text>
          <Text style={styles.meta}>
            {event.going + (joined ? 1 : 0)} going · {event.cta}
          </Text>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.actionRow}>
            {/* visual only buttons, messaging and live pins are future
                development. decided no fake popups */}
            <Pressable style={styles.smallBtn}>
              <Text style={styles.smallBtnText}>💬 Message flock</Text>
            </Pressable>
            <Pressable style={styles.smallBtn}>
              <Text style={styles.smallBtnText}>📍 Share my pin</Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.joinBtn, joined && styles.joinedBtn]}
            onPress={() => setJoined(!joined)}
          >
            <Text style={styles.joinBtnText}>
              {joined ? "✓ You're going, tap to leave" : "Join walk"}
            </Text>
          </Pressable>

          {/* animal fact competition, live walks only */}
          {event.live && (
            <View style={styles.factCard}>
              <Text style={styles.factKicker}>🏆 ANIMAL FACT COMPETITION</Text>
              <Text style={styles.factHeading}>
                Best fact heard on this walk wins glory.
              </Text>

              {facts.map((fact) => (
                <Pressable
                  key={fact.id}
                  style={[
                    styles.factRow,
                    myFactVote === fact.id && styles.factRowVoted,
                  ]}
                  onPress={() => voteFact(fact.id)}
                >
                  <View style={{ flex: 1, marginRight: SPACING.s }}>
                    <Text style={styles.factText}>{fact.text}</Text>
                    <Text style={styles.factBy}>- {fact.by}</Text>
                  </View>
                  <Text style={styles.factVotes}>
                    {fact.votes}{myFactVote === fact.id ? " ✓" : ""}
                  </Text>
                </Pressable>
              ))}

              <View style={styles.factInputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Add your fact…"
                  placeholderTextColor={COLORS.creamDim}
                  value={newFact}
                  onChangeText={setNewFact}
                />
                <Pressable style={styles.addBtn} onPress={submitFact}>
                  <Text style={styles.addBtnText}>Enter</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  back: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
  },
  backText: {
    color: COLORS.cream,
    fontSize: 17,
  },
  map: {
    height: 300,
    margin: SPACING.m,
    borderRadius: RADIUS.l,
    padding: SPACING.m,
    overflow: "hidden",
  },
  liveBadge: {
    color: COLORS.green,
    fontWeight: "700",
    fontSize: 12,
    backgroundColor: COLORS.black,
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
  },
  groupDot: {
    position: "absolute",
    top: 90,
    left: 70,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },
  groupDotText: {
    fontSize: 26,
  },
  youDot: {
    position: "absolute",
    top: 170,
    right: 60,
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
  },
  youDotText: {
    color: COLORS.black,
    fontWeight: "700",
  },
  body: {
    paddingHorizontal: SPACING.m,
  },
  title: {
    color: COLORS.cream,
    fontSize: 26,
    fontWeight: "800",
  },
  meta: {
    color: COLORS.creamDim,
    fontSize: 14,
    marginTop: SPACING.xs,
  },
  description: {
    color: COLORS.cream,
    fontSize: 15,
    lineHeight: 22,
    marginVertical: SPACING.m,
  },
  actionRow: {
    flexDirection: "row",
    marginBottom: SPACING.m,
  },
  smallBtn: {
    borderWidth: 1,
    borderColor: COLORS.creamDim,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    marginRight: SPACING.s,
  },
  smallBtnText: {
    color: COLORS.cream,
    fontSize: 13,
  },
  joinBtn: {
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.m,
    alignItems: "center",
    marginBottom: SPACING.l,
  },
  joinedBtn: {
    backgroundColor: COLORS.green,
  },
  joinBtnText: {
    color: COLORS.black,
    fontWeight: "700",
    fontSize: 16,
  },
  // fact competition styles
  factCard: {
    borderWidth: 1,
    borderColor: COLORS.yellow,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
  },
  factKicker: {
    color: COLORS.yellow,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: SPACING.xs,
  },
  factHeading: {
    color: COLORS.cream,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: SPACING.m,
  },
  factRow: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.s,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.m,
    marginBottom: SPACING.s,
    flexDirection: "row",
    alignItems: "center",
  },
  factRowVoted: {
    borderColor: COLORS.yellow,
    backgroundColor: COLORS.darkGreen,
  },
  factText: {
    color: COLORS.cream,
    fontSize: 14,
  },
  factBy: {
    color: COLORS.creamDim,
    fontSize: 12,
    marginTop: 2,
  },
  factVotes: {
    color: COLORS.creamDim,
    fontSize: 14,
    fontWeight: "700",
  },
  factInputRow: {
    flexDirection: "row",
    marginTop: SPACING.s,
  },
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
  addBtnText: {
    color: COLORS.black,
    fontWeight: "700",
  },
});
