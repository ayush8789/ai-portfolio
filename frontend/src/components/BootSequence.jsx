import { useEffect, useState } from "react";

export default function BootSequence({ onFinish }) {
  const [lines, setLines] = useState([]);
  const bootLines = [
    "Initializing Neural Core...",
    "Loading ML Modules...",
    "Starting FastAPI Engine...",
    "Establishing Secure Connection...",
    "AI System Online."
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < bootLines.length) {
        setLines((prev) => [...prev, bootLines[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => onFinish(), 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center text-green-400 font-mono text-lg z-[100]">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}