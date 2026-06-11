// reusable pill button, used for every filter row in the app
// the small prop makes a more lowkey version for nested toggles like
// my walks / my photos. big yellow chips = sections, small green = sub sections
// made this a component after copy pasting the same chip code 3 times

import { Text, Pressable, StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";

type ChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
  small?: boolean;
};

export default function Chip({ label, active, onPress, small }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        small && styles.chipSmall,
        active && (small ? styles.chipSmallActive : styles.chipActive),
      ]}
    >
      <Text
        style={[
          styles.label,
          small && styles.labelSmall,
          active && (small ? styles.labelSmallActive : styles.labelActive),
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: COLORS.creamDim,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    marginRight: SPACING.s,
  },
  chipActive: {
    backgroundColor: COLORS.yellow,
    borderColor: COLORS.yellow,
  },
  label: {
    color: COLORS.cream,
    fontSize: 14,
  },
  labelActive: {
    color: COLORS.black,
    fontWeight: "700",
  },
  // the smaller variant
  chipSmall: {
    paddingHorizontal: SPACING.s + 4,
    paddingVertical: SPACING.xs + 2,
    borderColor: COLORS.line,
  },
  chipSmallActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.green,
  },
  labelSmall: {
    fontSize: 12,
    color: COLORS.creamDim,
  },
  labelSmallActive: {
    color: COLORS.green,
    fontWeight: "700",
  },
});
