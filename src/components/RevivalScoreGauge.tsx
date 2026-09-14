import React from 'react';

interface RevivalScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  onClick?: () => void;
}

export const RevivalScoreGauge: React.FC<RevivalScoreGaugeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  onClick,
}) => {
  // Dimensions based on size
  const dimensions = {
    sm: { radius: 18, stroke: 3.5, width: 44, textClass: 'text-xs font-bold' },
    md: { radius: 24, stroke: 4.5, width: 62, textClass: 'text-sm font-bold' },
    lg: { radius: 36, stroke: 6, width: 88, textClass: 'text-xl font-bold' },
  }[size];

  const circumference = 2 * Math.PI * dimensions.radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Color gradient definition based on score
  const getScoreColor = (val: number) => {
    if (val >= 88) return { stroke: '#059669', bg: 'text-emerald-600', fill: '#10b981' };
    if (val >= 80) return { stroke: '#0d9488', bg: 'text-teal-600', fill: '#14b8a6' };
    if (val >= 70) return { stroke: '#2563eb', bg: 'text-blue-600', fill: '#3b82f6' };
    return { stroke: '#d97706', bg: 'text-amber-600', fill: '#f59e0b' };
  };

  const colors = getScoreColor(score);

  return (
    <div
      id={`score-gauge-${score}`}
      onClick={onClick}
      className={`inline-flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
      title={`Revival Score: ${score}/100 (Click for weighted breakdown)`}
    >
      <div className="relative flex items-center justify-center" style={{ width: dimensions.width, height: dimensions.width }}>
        <svg
          width={dimensions.width}
          height={dimensions.width}
          className="transform -rotate-90"
        >
          {/* Track background */}
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.width / 2}
            r={dimensions.radius}
            stroke="#e2e8f0"
            strokeWidth={dimensions.stroke}
            fill="transparent"
          />
          {/* Active progress */}
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.width / 2}
            r={dimensions.radius}
            stroke={colors.stroke}
            strokeWidth={dimensions.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
          <span className={`${dimensions.textClass} font-mono tracking-tight`}>{score}</span>
        </div>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 leading-none">Revival</span>
          <span className="text-xs font-medium text-slate-700">Score</span>
        </div>
      )}
    </div>
  );
};
