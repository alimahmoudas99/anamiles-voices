import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider, useLanguage } from '@/src/core/contexts/LanguageContext';
import { ActivityIndicator, View } from 'react-native';

function LayoutContent() {
  const { isLoaded } = useLanguage();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6C5CE7' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <LayoutContent />
      <StatusBar style="light" />
    </LanguageProvider>
  );
}
