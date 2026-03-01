import { useEffect, useRef } from "react";

export default function ParallaxWrapper({ children }) {
  const ref = useRef();

  useEffect(() => {
    const move = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 40;
      const y = (window.innerHeight / 2 - e.clientY) / 40;
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={ref} className="transition-transform duration-300">
      {children}
    </div>
  );
}