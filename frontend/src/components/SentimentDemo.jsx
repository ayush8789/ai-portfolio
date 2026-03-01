import { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default function SentimentDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/sentiment/predict",
        { text }
      );
      setResult(res.data);
    } catch (error) {
      alert("Backend not reachable.");
    }
    setLoading(false);
  };

  return (
    <section id="demo" className="w-full flex justify-center">
      <div className="glass-card neon-border hover-lift w-full max-w-lg p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Live Neural Sentiment Model
        </h2>

        <input
          className="w-full p-3 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter text..."
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 rounded-xl hover:opacity-90 transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="mt-8">
            <p className="mb-4 text-center text-gray-300">
              Sentiment:{" "}
              <span className="font-semibold text-white">
                {result.sentiment}
              </span>
            </p>

            <Bar
              data={{
                labels: ["Confidence"],
                datasets: [
                  {
                    label: result.sentiment,
                    data: [result.probability],
                    backgroundColor: "rgba(59,130,246,0.8)",
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}