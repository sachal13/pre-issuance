import { useState, useCallback, useEffect } from "react";

interface UseTextToSpeechProps {
  language: "en" | "hi";
}

export const useTextToSpeech = ({ language }: UseTextToSpeechProps) => {
  const [currentText, setCurrentText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = language === "hi" ? "hi-IN" : "en-US";
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1.1;
    
    // Try to use female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.lang.startsWith(language === "hi" ? "hi" : "en") &&
        (voice.name.includes("Female") || voice.name.includes("female"))
    );
    
    if (femaleVoice) {
      newUtterance.voice = femaleVoice;
    }

    newUtterance.onstart = () => {
      setCurrentText(text);
      setIsPlaying(true);
    };

    newUtterance.onend = () => {
      setIsPlaying(false);
    };

    newUtterance.onerror = () => {
      setIsPlaying(false);
    };

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  }, [language]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const replay = useCallback(() => {
    if (utterance) {
      if (isPlaying) {
        stop();
      } else {
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  }, [utterance, isPlaying, stop]);

  return { speak, stop, replay, currentText, isPlaying };
};
