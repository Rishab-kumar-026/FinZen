const AnimatedBubbles = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="bubbleGradient" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#1db954" />
            <stop offset="100%" stopColor="#1e3c72" />
          </radialGradient>
        </defs>
        <g fill="url(#bubbleGradient)" fillOpacity="0.15">
          {Array.from({ length: 35 }).map((_, i) => (
            <circle
              key={i}
              r={Math.random() * 120 + 30}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBubbles;
