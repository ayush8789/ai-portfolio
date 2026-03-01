import NeuralCore3D from "./NeuralCore3D";
import ParallaxWrapper from "./ParallaxWrapper";
import SystemStatus from "./SystemStatus";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <NeuralCore3D />

      <ParallaxWrapper>
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI Neural Command Center
        </h1>

        <p className="text-gray-400 max-w-2xl mb-12">
          Architecting intelligent systems with real-time machine learning,
          scalable APIs, and immersive interfaces.
        </p>
      </ParallaxWrapper>

      <div className="mt-10">
        <SystemStatus />
      </div>
    </section>
  );
}