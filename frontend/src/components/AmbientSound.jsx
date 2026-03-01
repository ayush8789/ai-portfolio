import { useEffect, useRef, useState } from "react";

export default function AmbientSound() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled && audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [enabled]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/ambient.mp3"
      />

      <button
        onClick={() => setEnabled(!enabled)}
        className="fixed bottom-6 left-20 bg-black border border-cyan-400 text-cyan-400 px-4 py-2 rounded-xl z-50"
      >
        {enabled ? "Sound ON" : "Sound OFF"}
      </button>
    </>
  );
}