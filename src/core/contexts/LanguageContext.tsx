import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LocaleType = 'en' | 'ar';

interface LanguageContextProps {
  locale: LocaleType;
  setLanguage: (lang: LocaleType) => Promise<void>;
  isRTL: boolean;
  t: (key: keyof typeof translations['en']) => string;
  isLoaded: boolean;
  hasChosenLanguage: boolean;
}

const translations = {
  en: {
    appName: "Animal Sounds & Piano",
    selectLanguage: "Choose Language / اختر اللغة",
    welcome: "Welcome!",
    pianoTab: "Piano",
    allTab: "All Sounds",
    guessTab: "Guess",
    pianoTitle: "🎹 Animal Piano",
    pianoSubtitle: "Tap an animal to hear its sound!",
    pianoHint: "👆 Play and learn animal sounds!",
    allTitle: "🔊 All Sounds",
    allSubtitle: "Tap any animal to hear its sound!",
    guessTitle: "🔊 Guess the Sound",
    guessSubtitle: "Who makes this sound? 🤔",
    guessReplay: "🔁 Replay Sound",
    guessScore: "Points",
    guessRound: "Round",
    guessFeedbackCorrect: "Clever! 🥳🎉",
    guessFeedbackWrong: "Try again! 💪",
    arabic: "العربية",
    english: "English",
    getStarted: "Let's Play!",
    scoreText: "Score: ",
    roundPrefix: "Round",
  },
  ar: {
    appName: "بيانو وأصوات الحيوانات",
    selectLanguage: "اختر اللغة / Choose Language",
    welcome: "مرحباً بك!",
    pianoTab: "بيانو",
    allTab: "الأصوات",
    guessTab: "تخمين",
    pianoTitle: "🎹 بيانو الحيوانات",
    pianoSubtitle: "اضغط على الحيوان واسمع صوته!",
    pianoHint: "👆 العب وتعلم أصوات الحيوانات!",
    allTitle: "🔊 جميع الأصوات",
    allSubtitle: "اضغط على أي حيوان لتسمع صوته!",
    guessTitle: "🔊 مين صاحب الصوت؟",
    guessSubtitle: "صوت مين ده؟ 🤔",
    guessReplay: "🔁 العب الصوت تاني",
    guessScore: "النقاط",
    guessRound: "الجولة",
    guessFeedbackCorrect: "شاطر! 🥳🎉",
    guessFeedbackWrong: "حاول تاني! 💪",
    arabic: "العربية",
    english: "English",
    getStarted: "ابدأ اللعب!",
    scoreText: "النقاط: ",
    roundPrefix: "جولة رقم",
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<LocaleType>('en');
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadLanguage() {
      try {
        const savedLanguage = await AsyncStorage.getItem('@app_language');
        if (savedLanguage === 'ar' || savedLanguage === 'en') {
          setLocaleState(savedLanguage);
          setHasChosenLanguage(true);
          // Set RTL native flag for next boot
          const shouldBeRTL = savedLanguage === 'ar';
          if (I18nManager.isRTL !== shouldBeRTL) {
            I18nManager.allowRTL(shouldBeRTL);
            I18nManager.forceRTL(shouldBeRTL);
          }
        } else {
          setHasChosenLanguage(false);
        }
      } catch (error) {
        console.error('Error loading language from storage', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadLanguage();
  }, []);

  const setLanguage = async (lang: LocaleType) => {
    try {
      await AsyncStorage.setItem('@app_language', lang);
      setLocaleState(lang);
      setHasChosenLanguage(true);
      
      const shouldBeRTL = lang === 'ar';
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
    } catch (error) {
      console.error('Error saving language', error);
    }
  };

  const isRTL = locale === 'ar';

  const t = (key: keyof typeof translations['en']): string => {
    return translations[locale][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ locale, setLanguage, isRTL, t, isLoaded, hasChosenLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
