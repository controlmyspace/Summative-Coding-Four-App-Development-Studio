
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Chip from "@/components/Chip";
import EventCard from "@/components/EventCard";
import PollCard from "@/components/PollCard";
import { COLORS, SPACING } from "@/constants/theme";
import { EVENTS, USER } from "@/data/mockData";

const CATEGORIES = ["Walks", "Talks", "Polls"];

export default function Events() {
  const [category, setCategory] = useState("Walks");

  const filtered = EVENTS.filter((event) => event.type === category);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi, {USER.name} </Text>
        <Text style={styles.heading}>Events</Text>
        <Text style={styles.location}>📍 {USER.city} + diaspora flocks</Text>

        <View style={styles.chipRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipContent}
          >
            {CATEGORIES.map((label) => (
              <Chip
                key={label}
                label={label}
                active={category === label}
                onPress={() => setCategory(label)}
              />
            ))}
          </ScrollView>
        </View>

        {category === "Polls" ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            <PollCard />
          </ScrollView>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard {...item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No {category.toLowerCase()} scheduled yet, check back soon.
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.m,
  },
  greeting: {
    color: COLORS.creamDim,
    fontSize: 15,
    marginTop: SPACING.s,
  },
  heading: {
    color: COLORS.cream,
    fontSize: 32,
    fontWeight: "800",
  },
  location: {
    color: COLORS.creamDim,
    fontSize: 13,
    marginTop: SPACING.xs,
    marginBottom: SPACING.m,
  },
  // fixed height so flexbox cant squash the chips, this bug drove me mad
  chipRow: {
    height: 44,
    marginBottom: SPACING.m,
  },
  chipContent: {
    alignItems: "center",
  },
  listContent: {
    paddingBottom: SPACING.xl, // so the last card isnt hidden behind the tab bar
  },
  empty: {
    color: COLORS.creamDim,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});
