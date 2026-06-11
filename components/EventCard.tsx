// one card = one event
// tapping the live card goes to walk detail, the id gets passed through the
// url like /walk/1 which is how expo router does it

import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  going: number;
  tag: string;
  live?: boolean;
  cta?: string;
  image?: any; // the require()d photo from mockData
};

export default function EventCard({ id, title, date, going, tag, live, image, cta }: EventCardProps) {
  const router = useRouter();

  // only the live walk opens a detail page, the rest are visual
  // scope decision, one fully working detail flow beats eight half done ones
  const openWalk = live ? () => router.push(`/walk/${id}`) : undefined;

  return (
    <Pressable style={styles.card} onPress={openWalk}>
      {image && <Image source={image} style={styles.photo} />}
      <View style={styles.tagRow}>
        <Text style={styles.tag}>{tag}</Text>
        {live && <Text style={styles.live}>● LIVE</Text>}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{date}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.meta}>{going} going</Text>
        <Text style={styles.cta}>{cta}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: SPACING.m,
    marginBottom: SPACING.m,
  },
  photo: {
    width: "100%",
    height: 140,
    borderRadius: RADIUS.s,
    marginBottom: SPACING.m,
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.s,
  },
  tag: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  live: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    color: COLORS.cream,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  meta: {
    color: COLORS.creamDim,
    fontSize: 13,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cta: {
    color: COLORS.yellow,
    fontSize: 13,
    fontWeight: "700",
  },
});
