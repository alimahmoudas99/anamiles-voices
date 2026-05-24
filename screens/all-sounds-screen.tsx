import { AnimalGridCard } from '@/components/animal/animal-grid-card';
import { getPlayableAnimals } from '@/constants/animals';
import { Animal } from '@/types/animal';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {
  playAnimalSound: (animal: Animal) => Promise<void>;
}

export const AllSoundsScreen: React.FC<Props> = ({ playAnimalSound }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔊 جميع الأصوات</Text>
        <Text style={styles.subtitle}>اضغط على أي حيوان لتسمع صوته!</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {getPlayableAnimals().map((animal) => (
          <AnimalGridCard key={animal.id} animal={animal} onPress={playAnimalSound} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingBottom: 40,
    gap: 14,
  },
});
