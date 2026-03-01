import { useState, useEffect } from "react";

import BootSequence from "./components/BootSequence";
import Navbar from "./components/Navbar";
import NeuralBackground from "./components/NeuralBackground";
import CursorGlow from "./components/CursorGlow";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import SentimentDemo from "./components/SentimentDemo";
import Chatbot from "./components/Chatbot";
import FadeInSection from "./components/FadeInSection";
import TerminalOverlay from "./components/TerminalOverlay";
import AmbientSound from "./components/AmbientSound";

function App() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const [booted, setBooted] = useState(false);

  // 🔹 AI Boot Sequence Screen
  if (!booted) {
    return <BootSequence onFinish={() => setBooted(true)} />;
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* 🌌 Cursor Glow Layer */}
      <CursorGlow />

      <AmbientSound />

      {/* 🧠 Neural Background Layer */}
      <NeuralBackground />

      {/* 🧭 Navigation */}
      <Navbar />

      {/* 💻 Terminal Hidden Mode */}
      <TerminalOverlay />

      {/* 🔥 Main Interface */}
      <div className="relative z-10 flex flex-col items-center pt-24">

        {/* 🚀 Hero Section */}
        <Hero />

        {/* 📡 System Modules */}
        <div className="w-full flex flex-col items-center gap-32 px-4 md:px-6 pb-32">

          <FadeInSection>
            <Dashboard />
          </FadeInSection>

          <FadeInSection>
            <Projects />
          </FadeInSection>

          <FadeInSection>
            <SentimentDemo />
          </FadeInSection>

          <FadeInSection>
            <Chatbot />
          </FadeInSection>

        </div>
      </div>
    </div>
  );
}

export default App;