import { useEffect, useRef, useState } from "react";

export default function VoiceAssistant({ onTranscript }) {
  const recognitionRef = useRef(null);
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) onTranscript(transcript);
    };

    recognitionRef.current = recognition;
  }, [onTranscript]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
  };

  if (!supported) return null;

  return (
    <button
      onClick={startListening}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition z-50
        ${listening
          ? "bg-red-500 animate-pulse"
          : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-110"}`}
    >
      🎤
    </button>
  );
}