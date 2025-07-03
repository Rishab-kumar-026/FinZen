// src/components/BubbleBackground.jsx
import { useEffect, useRef } from "react";

const BubbleBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${document.body.scrollHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full z-10 overflow-hidden pointer-events-none"
    >
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="bubbleGradient" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#1db954" />
            <stop offset="100%" stopColor="#1e3c72" />
          </radialGradient>
        </defs>
        <g fill="url(#bubbleGradient)" fillOpacity="0.12">
          {Array.from({ length: 220 }).map((_, i) => {
            const r = Math.random() * 60 + 30; // ⬆️ bigger bubble size
            const cx = Math.random() * window.innerWidth;
            const cy = Math.random() * 10000; // ensure it covers long pages
            return (
              <circle
                key={i}
                r={r}
                cx={cx}
                cy={cy}
                className={`animate-bubble-float animation-delay-${i % 10}`}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default BubbleBackground;
