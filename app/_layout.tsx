// root of the whole app. expo router builds navigation from the folder structure
// which took me a while to get my head around. index is the welcome screen,
// (tabs) is the main app, walk/[id] gets pushed on top
// wrapped everything in ForumProvider so the forum posts are shared between screens
// headerShown false because the default white header was ruining the dark theme

import { Stack } from "expo-router";
import { ForumProvider } from "@/providers/ForumProvider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ForumProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="walk/[id]" />
        <Stack.Screen name="thread" />
        <Stack.Screen name="robin" />
      </Stack>
    </ForumProvider>
  );
}
