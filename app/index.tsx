import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useLanguage, LocaleType } from '@/src/core/contexts/LanguageContext';
import { Redirect } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function EntryScreen() {
  const { hasChosenLanguage, setLanguage } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<LocaleType>('en');

  // If the user has already chosen their language, redirect directly to the main piano tab
  if (hasChosenLanguage) {
    return <Redirect href="/(tabs)/piano" />;
  }

  const handleStart = async () => {
    await setLanguage(selectedLang);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6C5CE7" />
      
      {/* Background Gradients */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <View style={styles.content}>
        {/* App Branding */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🦁🎹🐶</Text>
          <Text style={styles.appName}>
            {selectedLang === 'ar' ? 'أصوات وحيوانات' : 'Animal Piano & Sounds'}
          </Text>
          <Text style={styles.appTagline}>
            {selectedLang === 'ar' ? 'العالم السحري لأصوات الحيوانات!' : 'The magical world of animal sounds!'}
          </Text>
        </View>

        {/* Card Container */}
        <View style={styles.card}>
          <Text style={styles.title}>
            {selectedLang === 'ar' ? 'اختر لغة التطبيق' : 'Choose App Language'}
          </Text>
          
          <View style={styles.optionsContainer}>
            {/* English Button */}
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                selectedLang === 'en' && styles.optionButtonActive
              ]}
              onPress={() => setSelectedLang('en')}
              activeOpacity={0.8}
            >
              <View style={styles.flagContainer}>
                <Text style={styles.flagText}>🇬🇧</Text>
              </View>
              <Text style={[styles.optionText, selectedLang === 'en' && styles.optionTextActive]}>
                English
              </Text>
              {selectedLang === 'en' && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>

            {/* Arabic Button */}
            <TouchableOpacity 
              style={[
                styles.optionButton, 
                selectedLang === 'ar' && styles.optionButtonActive
              ]}
              onPress={() => setSelectedLang('ar')}
              activeOpacity={0.8}
            >
              <View style={styles.flagContainer}>
                <Text style={styles.flagText}>🇸🇦</Text>
              </View>
              <Text style={[styles.optionText, selectedLang === 'ar' && styles.optionTextActive]}>
                العربية
              </Text>
              {selectedLang === 'ar' && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.9}
          >
            <Text style={styles.startButtonText}>
              {selectedLang === 'ar' ? 'ابدأ اللعب! 🚀' : "Let's Play! 🚀"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#6C5CE7',
    opacity: 0.85,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.3,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: '#a29bfe',
    opacity: 0.4,
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    zIndex: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoEmoji: {
    fontSize: 72,
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appTagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    width: '100%',
    padding: 24,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
  },
  optionButtonActive: {
    borderColor: '#6C5CE7',
    backgroundColor: '#EEECFF',
  },
  flagContainer: {
    marginRight: 14,
  },
  flagText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A5568',
    flex: 1,
  },
  optionTextActive: {
    color: '#6C5CE7',
  },
  checkmark: {
    fontSize: 18,
    fontWeight: '900',
    color: '#6C5CE7',
  },
  startButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 20,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
});
