import { PianoKey } from '@/components/animal/piano-key';
import { getPlayableAnimals } from '@/constants/animals';
import { Animal } from '@/types/animal';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface Props {
  playAnimalSound: (animal: Animal) => Promise<void>;
}

export const AnimalPianoScreen: React.FC<Props> = ({ playAnimalSound }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎹 بيانو الحيوانات</Text>
        <Text style={styles.subtitle}>اضغط على الحيوان واسمع صوته!</Text>
      </View>

      <View style={styles.notesRow}>
        {['🎵', '🎶', '🎵', '🎶'].map((n, i) => (
          <Text key={i} style={[styles.musicNote, { opacity: 0.3 + i * 0.15 }]}>
            {n}
          </Text>
        ))}
      </View>

      {/* أول 4 حيوانات فقط في الرئيسية */}
      <View style={styles.keysContainer}>
        {getPlayableAnimals().slice(0, 4).map((animal) => (
          <PianoKey key={animal.id} animal={animal} onPress={playAnimalSound} />
        ))}
      </View>

      <Text style={styles.hint}>👆 العب وتعلم أصوات الحيوانات!</Text>
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
  notesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  musicNote: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  keysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 10,
    gap: 10,
  },
  hint: {
    textAlign: 'center',
    color: '#6C5CE7',
    fontWeight: '700',
    fontSize: 14,
    paddingBottom: 12,
    opacity: 0.8,
  },
});
