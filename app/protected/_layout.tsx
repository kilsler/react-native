import { useProtected } from '@/src/hooks/useProtected';
import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  const { allowed } = useProtected();

  if (allowed === null) return null;
  if (allowed === false) return null;


  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="tabs"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
