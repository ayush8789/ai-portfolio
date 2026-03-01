import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Dashboard", link: "#dashboard" },
    { name: "Projects", link: "#projects" },
    { name: "Demo", link: "#demo" },
    { name: "Chat", link: "#chat" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI Neural Interface
        </h1>

        <div className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="hover:text-cyan-400 transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/80 px-6 py-4 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block hover:text-cyan-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}