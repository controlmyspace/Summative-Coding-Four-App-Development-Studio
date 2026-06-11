import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import Chip from "@/components/Chip";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { BIRDS, CONTENT, BOOK, USER } from "@/data/mockData";
import { useForum, useForumDispatch } from "@/providers/ForumProvider";

const SECTIONS = ["Forum", "Birds", "Content"];
const CONTENT_KINDS = ["Featured", "Watch", "Listen", "Read", "Visit"];

export default function Discover() {
  const router = useRouter();
  const [section, setSection] = useState("Forum");
  const [contentKind, setContentKind] = useState("Featured");

  const posts = useForum();
  const dispatch = useForumDispatch();
  const [newPost, setNewPost] = useState("");

  const submitPost = () => {
    if (newPost.trim() === "") return;
    dispatch({
      type: "add",
      data: { title: newPost.trim(), meta: `by ${USER.name} · just now` },
    });
    setNewPost("");
  };

  const filteredContent = CONTENT.filter((item) => item.kind === contentKind);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.heading}>Discover</Text>
        <Text style={styles.sub}>The flock beyond the walks</Text>

        <View style={styles.chipRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipContent}
          >
            {SECTIONS.map((label) => (
              <Chip
                key={label}
                label={label}
                active={section === label}
                onPress={() => setSection(label)}
              />
            ))}
          </ScrollView>
        </View>

        {/* forum section */}
        {section === "Forum" && (
          <View style={{ flex: 1 }}>
            <View style={styles.postRow}>
              <TextInput
                style={styles.input}
                placeholder="Ask the flock anything…"
                placeholderTextColor={COLORS.creamDim}
                value={newPost}
                onChangeText={setNewPost}
              />
              <Pressable style={styles.postBtn} onPress={submitPost}>
                <Text style={styles.postBtnText}>Post</Text>
              </Pressable>
            </View>

            <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) =>
                item.thread ? (
                  // only the diy thread opens a full thread page, rest are display
                  <Pressable
                    style={styles.forumRow}
                    onPress={() => router.push("/thread")}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.forumTitle}>{item.title}</Text>
                      <Text style={styles.forumMeta}>{item.meta}</Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </Pressable>
                ) : (
                  <View style={styles.forumRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.forumTitle}>{item.title}</Text>
                      <Text style={styles.forumMeta}>{item.meta}</Text>
                    </View>
                  </View>
                )
              }
            />
          </View>
        )}

        {/* bird directory section */}
        {section === "Birds" && (
          <FlatList
            data={BIRDS}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: SPACING.m }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            // header explains the whole directory is the community archive,
            // said once here instead of repeating it on every card
            ListHeaderComponent={
              <View style={styles.birdsHeader}>
                <Text style={styles.birdsHeaderTitle}>COMMUNITY ARCHIVE</Text>
                <Text style={styles.birdsHeaderSub}>
                  Built by the flock, bird by bird.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <Pressable
                // yellow border means this one actually opens. only built the
                // robin archive fully, rest are visual for now
                style={[styles.birdCard, item.archive && styles.birdCardActive]}
                onPress={() => item.archive && router.push("/robin")}
              >
                <Image source={item.image} style={styles.birdPhoto} />
                <Text style={styles.birdName}>{item.name}</Text>
                <Text style={styles.birdLatin}>{item.latin}</Text>
                <Text style={styles.birdFact}>{item.fact}</Text>
              </Pressable>
            )}
          />
        )}

        {/* content section */}
        {section === "Content" && (
          <View style={{ flex: 1 }}>
            {/* smaller chips for the sub categories */}
            <View style={styles.chipRow}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipContent}
              >
                {CONTENT_KINDS.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    active={contentKind === label}
                    onPress={() => setContentKind(label)}
                  />
                ))}
              </ScrollView>
            </View>

            {contentKind === "Featured" ? (
              // featured shows the outsiders book by the founders
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              >
                {/* display only, i cut the shop page for scope reasons.
                    in app purchases would be future development */}
                <View style={styles.featuredCard}>
                  <Image source={BOOK.image} style={styles.featuredCover} />
                  <View style={styles.featuredInfo}>
                    <Text style={styles.contentKind}>BY OUR FOUNDERS</Text>
                    <Text style={styles.featuredTitle}>{BOOK.title}</Text>
                    <Text style={styles.featuredSub}>{BOOK.subtitle}</Text>
                    <Text style={styles.featuredAuthors}>{BOOK.authors}</Text>
                    <Text style={styles.featuredNote}>
                      In bookshops now. Every copy supports the free walks.
                    </Text>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <FlatList
                data={filteredContent}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                  <View style={styles.contentRow}>
                    <Text style={styles.contentKind}>{item.kind.toUpperCase()}</Text>
                    <Text style={styles.contentTitle}>{item.title}</Text>
                    <Text style={styles.contentSource}>{item.source}</Text>
                  </View>
                )}
              />
            )}
          </View>
        )}
      </View>
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
  },
  sub: {
    color: COLORS.creamDim,
    fontSize: 13,
    marginTop: SPACING.xs,
    marginBottom: SPACING.m,
  },
  chipRow: { height: 44, marginBottom: SPACING.m },
  chipContent: { alignItems: "center" },
  listContent: { paddingBottom: SPACING.xl },
  // forum
  postRow: { flexDirection: "row", marginBottom: SPACING.m },
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
  postBtn: {
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.m,
    justifyContent: "center",
  },
  postBtnText: { color: COLORS.black, fontWeight: "700" },
  forumRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    paddingVertical: SPACING.m,
    flexDirection: "row",
    alignItems: "center",
  },
  forumTitle: { color: COLORS.cream, fontSize: 15, fontWeight: "600" },
  forumMeta: { color: COLORS.creamDim, fontSize: 12, marginTop: 2 },
  chevron: { color: COLORS.yellow, fontSize: 24, marginLeft: SPACING.s },
  // birds
  birdCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.s,
    marginBottom: SPACING.m,
  },
  // was 120px before but it kept cropping the birds heads off lol
  // 170 roughly matches the photos actual ratio at card width so barely
  // anything gets cut now. documented this bug in my write up
  birdPhoto: {
    width: "100%",
    height: 170,
    borderRadius: RADIUS.s,
    marginBottom: SPACING.s,
  },
  birdName: { color: COLORS.cream, fontSize: 15, fontWeight: "700" },
  birdLatin: {
    color: COLORS.green,
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: SPACING.xs,
  },
  birdFact: { color: COLORS.creamDim, fontSize: 12, lineHeight: 16 },
  birdCardActive: {
    borderColor: COLORS.yellow,
    borderWidth: 2,
  },
  birdsHeader: {
    marginBottom: SPACING.m,
  },
  birdsHeaderTitle: {
    color: COLORS.creamDim,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
  },
  birdsHeaderSub: {
    color: COLORS.creamDim,
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  // content
  featuredCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    padding: SPACING.m,
  },
  featuredCover: {
    width: 110,
    height: 170,
    borderRadius: RADIUS.s,
    marginRight: SPACING.m,
  },
  featuredInfo: { flex: 1, justifyContent: "center" },
  featuredTitle: { color: COLORS.cream, fontSize: 22, fontWeight: "800" },
  featuredSub: { color: COLORS.cream, fontSize: 13, marginTop: 2 },
  featuredAuthors: {
    color: COLORS.creamDim,
    fontSize: 12,
    marginTop: SPACING.xs,
    marginBottom: SPACING.m,
  },
  featuredNote: { color: COLORS.green, fontSize: 12, lineHeight: 17 },
  contentRow: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.m,
    marginBottom: SPACING.s,
  },
  contentKind: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: SPACING.xs,
  },
  contentTitle: { color: COLORS.cream, fontSize: 16, fontWeight: "700" },
  contentSource: { color: COLORS.creamDim, fontSize: 13, marginTop: 2 },
});
