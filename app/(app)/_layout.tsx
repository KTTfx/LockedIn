import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function AppLayout() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}