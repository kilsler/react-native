import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="tabs"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="[id]"
        options={{ title: 'Edit Todo' }}
      />
    </Stack>
  );
}
