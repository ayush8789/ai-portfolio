import { useState, useRef, useEffect } from "react";
import VoiceAssistant from "./VoiceAssistant";
import { speakText, stopSpeaking } from "../utils/tts";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
  {
    sender: "bot",
    text: "Hello, I am Ayush Personal Assistant. How can I assist you today?"
  }
]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const chatEndRef = useRef(null);

  // Scroll only when conversation actually exists
  useEffect(() => {
    if (chat.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const sendMessage = async (inputMessage) => {
    const finalMessage = inputMessage || message;
    if (!finalMessage.trim()) return;

    stopSpeaking();

    setChat((prev) => [
      ...prev,
      { sender: "user", text: finalMessage },
      { sender: "bot", text: "" },
    ]);

    setMessage("");
    setIsStreaming(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat/stream`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: finalMessage }),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let botText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        botText += decoder.decode(value, { stream: true });

        setChat((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = botText;
          return updated;
        });
      }

      if (voiceEnabled && botText) {
        speakText(botText);
      }

    } catch (err) {
      console.error("Streaming error:", err);
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Connection error. Please try again." },
      ]);
    }

    setIsStreaming(false);
  };

  return (
    <section id="chat" className="w-full flex justify-center px-4">
      <div className="glass-card w-full max-w-xl p-6 md:p-8 rounded-3xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-200">
            Assistant
          </h2>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`text-xs px-3 py-1 rounded-md transition ${
              voiceEnabled
                ? "bg-cyan-500 text-black"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {voiceEnabled ? "Voice ON" : "Voice OFF"}
          </button>
        </div>

        {/* Chat Window */}
        <div className="h-72 overflow-y-auto bg-black/40 p-4 rounded-xl space-y-3 border border-gray-700 text-sm md:text-base">

          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {msg.text}

                {isStreaming &&
                  msg.sender === "bot" &&
                  index === chat.length - 1 && (
                    <span className="animate-pulse"> ▌</span>
                  )}
              </div>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="flex mt-4 gap-2">
          <input
            className="flex-1 p-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={() => sendMessage()}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 rounded-xl hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* Floating Mic Button */}
      <VoiceAssistant onTranscript={sendMessage} />
    </section>
  );
}