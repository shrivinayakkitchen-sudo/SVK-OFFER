import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={`logo-animate ${props.className || ''}`}
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#1e293b" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#logoShadow)">
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      <text
        x="50"
        y="62"
        fontFamily="Poppins, sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        letterSpacing="-2"
      >
        SV
      </text>
    </g>
  </svg>
);

export default Logo;