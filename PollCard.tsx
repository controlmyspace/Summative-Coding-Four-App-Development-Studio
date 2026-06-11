// the whole polls feature in one component. banner, open poll with actual
// working voting, suggest a spot input, and closed polls
// this used to be its own tab but moving it into a component means events
// can just show it as a category, no duplicate code
// voting updates state with .map() not by editing directly, and if you change
// your vote it does +1 on the new one and -1 on the old one
// the add option bit is the same pattern as the week 3 reminders exercise

import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { POLL, CLOSED_POLL } from "@/data/mockData";

export default function PollCard() {
  const [options, setOptions] = useState(POLL.options);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState("");

  const vote = (optionId: string) => {
    if (optionId === myVote) return;

    setOptions(
      options.map((option) => {
        if (option.id === optionId) {
          return { ...option, votes: option.votes + 1 };
        }
        if (option.id === myVote) {
          return { ...option, votes: option.votes - 1 };
        }
        return option;
      })
    );
    setMyVote(optionId);
  };

  const suggestSpot = () => {
    if (suggestion.trim() === "") return;

    const newOption = {
      id: Date.now().toString(),
      label: suggestion.trim(),
      votes: 0,
    };
    setOptions([...options, newOption]);
    setSuggestion("");
  };

  return (
    <View>
      {/* mission banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerKicker}>COMMUNITY-LED</Text>
        <Text style={styles.bannerTitle}>You shape where we flock next.</Text>
        <Text style={styles.bannerSub}>
          Walks with the most votes get scheduled.
        </Text>
      </View>

      {/* the open poll */}
      <View style={styles.pollCard}>
        <Text style={styles.pollStatus}>OPEN · {POLL.closes}</Text>
        <Text style={styles.pollQuestion}>{POLL.question}</Text>

        {options.map((option) => (
          <Pressable
            key={option.id}
            style={[styles.option, myVote === option.id && styles.optionVoted]}
            onPress={() => vote(option.id)}
          >
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Text style={styles.optionVotes}>
              {option.votes} votes{myVote === option.id ? " ✓" : ""}
            </Text>
          </Pressable>
        ))}

        <Text style={styles.voters}>
          {POLL.totalVoters + (myVote ? 1 : 0)} people voted
        </Text>

        {/* suggest a spot input */}
        <View style={styles.suggestRow}>
          <TextInput
            style={styles.input}
            placeholder="Suggest a spot…"
            placeholderTextColor={COLORS.creamDim}
            value={suggestion}
            onChangeText={setSuggestion}
          />
          <Pressable style={styles.addBtn} onPress={suggestSpot}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </Pressable>
        </View>
      </View>

      {/* closed polls */}
      <Text style={styles.sectionTitle}>CLOSED POLLS</Text>
      <View style={styles.closedCard}>
        <Text style={styles.closedQuestion}>{CLOSED_POLL.question}</Text>
        <Text style={styles.closedWinner}>Winner: {CLOSED_POLL.winner}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.m,
  },
  bannerKicker: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: SPACING.xs,
  },
  bannerTitle: {
    color: COLORS.cream,
    fontSize: 20,
    fontWeight: "800",
  },
  bannerSub: {
    color: COLORS.creamDim,
    fontSize: 13,
    marginTop: SPACING.xs,
  },
  pollCard: {
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.l,
  },
  pollStatus: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: SPACING.s,
  },
  pollQuestion: {
    color: COLORS.cream,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: SPACING.m,
  },
  option: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.s,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.m,
    marginBottom: SPACING.s,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionVoted: {
    borderColor: COLORS.yellow,
    backgroundColor: COLORS.darkGreen,
  },
  optionLabel: {
    color: COLORS.cream,
    fontSize: 14,
    flex: 1,
    marginRight: SPACING.s,
  },
  optionVotes: {
    color: COLORS.creamDim,
    fontSize: 13,
  },
  voters: {
    color: COLORS.creamDim,
    fontSize: 12,
    marginTop: SPACING.s,
    marginBottom: SPACING.m,
  },
  suggestRow: {
    flexDirection: "row",
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
  sectionTitle: {
    color: COLORS.creamDim,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
    marginBottom: SPACING.m,
  },
  closedCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
    opacity: 0.7,
  },
  closedQuestion: {
    color: COLORS.cream,
    fontSize: 15,
    fontWeight: "600",
  },
  closedWinner: {
    color: COLORS.green,
    fontSize: 13,
    marginTop: SPACING.xs,
  },
});
