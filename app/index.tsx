import { TabBar } from '@/components/animal/tab-bar';
import { useSoundManager } from '@/hooks/use-sound-manager';
import { AllSoundsScreen } from '@/screens/all-sounds-screen';
import { AnimalPianoScreen } from '@/screens/animal-piano-screen';
import { GuessScreen } from '@/screens/guess-screen';
import { TabKey } from '@/types/animal';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('piano');
  const { playAnimalSound, stopSound } = useSoundManager();

  const handleTabChange = (tab: TabKey) => {
    stopSound();
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#6C5CE7" />
      <View style={styles.gradientBg} />

      <View style={styles.content}>
        {activeTab === 'piano' && <AnimalPianoScreen playAnimalSound={playAnimalSound} />}
        {activeTab === 'all' && <AllSoundsScreen playAnimalSound={playAnimalSound} />}
        {activeTab === 'guess' && (
          <GuessScreen playAnimalSound={playAnimalSound} stopSound={stopSound} />
        )}
      </View>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
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
