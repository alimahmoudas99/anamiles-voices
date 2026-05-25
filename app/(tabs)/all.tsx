import React, { useCallback } from 'react';
import { useSoundManager } from '@/src/core/hooks/use-sound-manager';
import { AllSoundsScreen } from '@/src/features/animal-sounds/screens/all-sounds-screen';
import { useFocusEffect } from 'expo-router';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function AllSoundsTab() {
  const { playAnimalSound, stopSound } = useSoundManager();

  useFocusEffect(
    useCallback(() => {
      return () => {
        stopSound();
      };
    }, [stopSound])
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.gradientBg} />
      <View style={styles.content}>
        <AllSoundsScreen playAnimalSound={playAnimalSound} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F0EEFF',
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
    backgroundColor: '#6C5CE7',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
});
