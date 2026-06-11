// the diy bird feeder forum thread, a full conversation view
// you can actually reply with text (goes into state), the camera attach
// button is visual only since image upload would need a picker + server

import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { THREAD, USER } from "@/data/mockData";

export default function Thread() {
  const router = useRouter();
  const [replies, setReplies] = useState(THREAD.replies);
  const [newReply, setNewReply] = useState("");

  const submitReply = () => {
    if (newReply.trim() === "") return;
    setReplies([
      ...replies,
      { id: Date.now().toString(), author: USER.name, text: newReply.trim() },
    ]);
    setNewReply("");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Forum</Text>
      </Pressable>

      <View style={styles.container}>
        <Text style={styles.title}>{THREAD.title}</Text>
        <Text style={styles.meta}>{THREAD.meta}</Text>

        <FlatList
          data={replies}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SPACING.m }}
          renderItem={({ item }) => (
            <View style={styles.reply}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.replyText}>{item.text}</Text>
              {item.image && <Image source={item.image} style={styles.replyImage} />}
            </View>
          )}
        />

        {/* reply bar */}
        <View style={styles.replyRow}>
          {/* visual only, photo upload is future development.
              no fake popup, just documented it instead */}
          <Pressable style={styles.attachBtn}>
            <Text style={styles.attachIcon}>📷</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Add a tip…"
            placeholderTextColor={COLORS.creamDim}
            value={newReply}
            onChangeText={setNewReply}
          />
          <Pressable style={styles.sendBtn} onPress={submitReply}>
            <Text style={styles.sendBtnText}>Reply</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.black },
  back: { paddingHorizontal: SPACING.m, paddingVertical: SPACING.s },
  backText: { color: COLORS.cream, fontSize: 17 },
  container: { flex: 1, paddingHorizontal: SPACING.m },
  title: { color: COLORS.cream, fontSize: 24, fontWeight: "800" },
  meta: {
    color: COLORS.creamDim,
    fontSize: 13,
    marginTop: SPACING.xs,
    marginBottom: SPACING.m,
  },
  reply: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.m,
    marginBottom: SPACING.s,
  },
  author: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  replyText: { color: COLORS.cream, fontSize: 14, lineHeight: 20 },
  replyImage: {
    width: "100%",
    height: 200,
    borderRadius: RADIUS.s,
    marginTop: SPACING.s,
  },
  replyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  attachBtn: {
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: RADIUS.pill,
    padding: SPACING.s,
    marginRight: SPACING.s,
  },
  attachIcon: { fontSize: 16 },
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
  sendBtn: {
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
  },
  sendBtnText: { color: COLORS.black, fontWeight: "700" },
});
