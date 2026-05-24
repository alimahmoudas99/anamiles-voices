import { Animal } from '@/types/animal';
import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

interface PianoKeyProps {
  animal: Animal;
  onPress: (animal: Animal) => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ animal, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 0.88, useNativeDriver: false, speed: 50, bounciness: 4 }),
      Animated.timing(glowAnim, { toValue: 1, duration: 80, useNativeDriver: false }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: false, speed: 30, bounciness: 8 }),
      Animated.timing(glowAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();
    onPress(animal);
  };

  const shadowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.7] });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.keyWrapper}
    >
      <Animated.View
        style={[
          styles.pianoKey,
          {
            backgroundColor: animal.color,
            transform: [{ scale: scaleAnim }],
            shadowOpacity,
            shadowColor: animal.color,
          },
        ]}
      >
        <Text style={styles.keyEmoji}>{animal.emoji}</Text>
        <Text style={styles.keyName}>{animal.nameAr}</Text>
        <View style={[styles.keyStripe, { backgroundColor: animal.lightColor }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  keyWrapper: {
    flex: 1,
  },
  pianoKey: {
    flex: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
    minHeight: height * 0.42,
  },
  keyStripe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    opacity: 0.8,
  },
  keyEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  keyName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
});
