import { Animal } from '@/src/types/animal';
import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '@/src/core/contexts/LanguageContext';

const { width } = Dimensions.get('window');

interface AnimalGridCardProps {
  animal: Animal;
  onPress: (animal: Animal) => void;
}

export const AnimalGridCard: React.FC<AnimalGridCardProps> = ({ animal, onPress }) => {
  const { locale } = useLanguage();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
    onPress(animal);
  };

  const animalName = locale === 'ar' ? animal.nameAr : animal.nameEn;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.wrapper}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: animal.color,
            transform: [{ scale: scaleAnim }],
            shadowColor: animal.color,
          },
        ]}
      >
        <Text style={styles.emoji}>{animal.emoji}</Text>
        <Text style={styles.name}>{animalName}</Text>
        <View style={[styles.stripe, { backgroundColor: animal.lightColor }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: (width - 32 - 14) / 2,
  },
  card: {
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 26,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    minHeight: 150,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  stripe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 12,
    opacity: 0.8,
  },
});
