import { AnimalGridCard } from '@/src/features/animal-sounds/components/animal-grid-card';
import { getPlayableAnimals } from '@/src/core/constants/animals';
import { Animal } from '@/src/types/animal';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '@/src/core/contexts/LanguageContext';

interface Props {
  playAnimalSound: (animal: Animal) => Promise<void>;
}

export const AllSoundsScreen: React.FC<Props> = ({ playAnimalSound }) => {
  const { t, isRTL } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('allTitle')}</Text>
        <Text style={styles.subtitle}>{t('allSubtitle')}</Text>
      </View>
      <ScrollView contentContainerStyle={[styles.grid, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} showsVerticalScrollIndicator={false}>
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
