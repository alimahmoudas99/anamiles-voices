import { Animal } from '@/types/animal';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export type ChoiceState = 'idle' | 'correct' | 'wrong';

interface ChoiceCardProps {
  animal: Animal;
  onPress: (animal: Animal) => void;
  state: ChoiceState;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({ animal, onPress, state }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === 'wrong') {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    } else if (state === 'correct') {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.15, useNativeDriver: true, speed: 40 }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }),
      ]).start();
    }
  }, [state, scaleAnim, shakeAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true, speed: 50 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
    onPress(animal);
  };

  const cardBg =
    state === 'correct' ? '#2ECC71' : state === 'wrong' ? '#E74C3C' : '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={state !== 'idle'}
    >
      <Animated.View
        style={[
          styles.choiceCard,
          {
            backgroundColor: cardBg,
            transform: [{ scale: scaleAnim }, { translateX: shakeAnim }],
            shadowColor: state === 'correct' ? '#2ECC71' : state === 'wrong' ? '#E74C3C' : '#000',
          },
        ]}
      >
        <Text style={styles.choiceEmoji}>{animal.emoji}</Text>
        <Text style={[styles.choiceName, { color: state !== 'idle' ? '#FFFFFF' : '#333' }]}>
          {animal.nameAr}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceCard: {
    width: (width - 80) / 3,
    aspectRatio: 0.85,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(108,92,231,0.12)',
  },
  choiceEmoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  choiceName: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
});
