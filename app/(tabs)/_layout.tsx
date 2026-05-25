import React from 'react';
import { Tabs } from 'expo-router';
import { useLanguage } from '@/src/core/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6C5CE7',
        tabBarInactiveTintColor: '#A0AEC0',
        tabBarLabelStyle: styles.labelStyle,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="piano"
        options={{
          title: t('pianoTab'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="all"
        options={{
          title: t('allTab'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="guess"
        options={{
          title: t('guessTab'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size + 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 88 : 68,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    paddingTop: 10,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 15,
  },
  labelStyle: {
    fontSize: 12,
    fontWeight: '800',
  },
});
