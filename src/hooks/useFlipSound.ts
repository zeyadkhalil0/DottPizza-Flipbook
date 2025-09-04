import { useCallback, useRef } from "react";

export const useFlipSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playFlipSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      
      // Create a realistic page flip sound using oscillators
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect nodes
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configure oscillators for paper-like sound
      oscillator1.type = 'sawtooth';
      oscillator1.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      oscillator1.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      
      oscillator2.type = 'triangle';
      oscillator2.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
      oscillator2.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
      
      // Configure volume envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      // Start and stop oscillators
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.3);
      oscillator2.stop(audioContext.currentTime + 0.2);
      
    } catch (error) {
      console.log("Audio not supported or blocked by browser");
    }
  }, []);

  return { playFlipSound };
};