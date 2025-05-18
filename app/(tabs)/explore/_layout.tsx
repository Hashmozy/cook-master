import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      {/* Stack for all auth screens */}
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  );
}
