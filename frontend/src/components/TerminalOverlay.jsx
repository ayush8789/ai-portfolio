import { useState } from "react";

export default function TerminalOverlay() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleCommand = () => {
    if (input === "whoami") alert("ML Engineer");
    if (input === "status") alert("AI System Online");
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 bg-black border border-cyan-400 text-cyan-400 px-4 py-2 rounded-xl z-50"
      >
        &gt;_
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
          <div className="w-96 bg-black border border-cyan-400 p-6 rounded-xl text-green-400 font-mono">
            <p>AI Terminal</p>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              className="w-full bg-black mt-4 border border-gray-700 p-2"
            />
          </div>
        </div>
      )}
    </>
  );
}