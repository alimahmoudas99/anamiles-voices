import { ChoiceCard, ChoiceState } from '@/src/features/guess-animal/components/choice-card';
import { ANIMALS } from '@/src/core/constants/animals';
import { Animal } from '@/src/types/animal';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '@/src/core/contexts/LanguageContext';
import { useFocusEffect } from 'expo-router';

interface Props {
  playAnimalSound: (animal: Animal) => Promise<void>;
  stopSound: () => Promise<void>;
}

export const GuessScreen: React.FC<Props> = ({ playAnimalSound, stopSound }) => {
  const { t, isRTL } = useLanguage();
  const [correctAnimal, setCorrectAnimal] = useState<Animal | null>(null);
  const [choices, setChoices] = useState<Animal[]>([]);
  const [feedback, setFeedback] = useState<ChoiceState>('idle');
  const [cardStates, setCardStates] = useState<Record<string, ChoiceState>>({});
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  // Stop sound when leaving screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        stopSound();
      };
    }, [stopSound])
  );

  const generateRound = useCallback(() => {
    const playable = ANIMALS.filter((a) => !!a.sound);
    const correct = playable[Math.floor(Math.random() * playable.length)];
    const others = ANIMALS.filter((a) => a.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const all = [correct, ...others].sort(() => Math.random() - 0.5);
    setCorrectAnimal(correct);
    setChoices(all);
    setFeedback('idle');
    setCardStates({});
    return correct;
  }, []);

  useEffect(() => {
    const animal = generateRound();
    const timer = setTimeout(() => playAnimalSound(animal), 600);
    return () => clearTimeout(timer);
  }, [round, generateRound, playAnimalSound]);

  const handleChoice = (animal: Animal) => {
    if (feedback !== 'idle' || !correctAnimal) return;
    if (animal.id === correctAnimal.id) {
      setCardStates({ [animal.id]: 'correct' });
      setFeedback('correct');
      setScore((s) => s + 1);
      setTimeout(() => setRound((r) => r + 1), 2000);
    } else {
      setCardStates({ [animal.id]: 'wrong' });
      setFeedback('wrong');
      setTimeout(() => {
        setCardStates({});
        setFeedback('idle');
        playAnimalSound(correctAnimal);
      }, 1500);
    }
  };

  const feedbackBg =
    feedback === 'correct' ? '#2ECC71' : feedback === 'wrong' ? '#E74C3C' : 'transparent';
  const feedbackText =
    feedback === 'correct' ? t('guessFeedbackCorrect') : feedback === 'wrong' ? t('guessFeedbackWrong') : '';

  return (
    <View style={styles.container}>
      <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Text style={styles.title}>{t('guessTitle')}</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>{t('guessScore')}</Text>
          <Text style={styles.scoreValue}>⭐ {score}</Text>
        </View>
      </View>

      <View style={styles.questionBubble}>
        <Text style={styles.questionText}>{t('guessSubtitle')}</Text>
        <TouchableOpacity
          style={styles.replayBtn}
          onPress={() => correctAnimal && playAnimalSound(correctAnimal)}
          activeOpacity={0.8}
        >
          <Text style={styles.replayText}>{t('guessReplay')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.choicesGrid, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        {choices.map((animal) => (
          <ChoiceCard
            key={animal.id}
            animal={animal}
            onPress={handleChoice}
            state={cardStates[animal.id] || 'idle'}
          />
        ))}
      </View>

      {feedback !== 'idle' && (
        <Animated.View style={[styles.feedbackBanner, { backgroundColor: feedbackBg }]}>
          <Text style={styles.feedbackText}>{feedbackText}</Text>
        </Animated.View>
      )}

      <Text style={styles.roundText}>{t('roundPrefix')} {round}</Text>
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  scoreRow: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  scoreLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  questionBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2D3436',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  replayBtn: {
    backgroundColor: '#6C5CE7',
    borderRadius: 50,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  replayText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  choicesGrid: {
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 14,
    paddingHorizontal: 4,
  },
  feedbackBanner: {
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  feedbackText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  roundText: {
    textAlign: 'center',
    color: '#6C5CE7',
    fontWeight: '700',
    fontSize: 13,
    marginTop: 10,
    opacity: 0.7,
    paddingBottom: 8,
  },
});
