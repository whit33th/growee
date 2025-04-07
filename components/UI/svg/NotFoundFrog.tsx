import React from "react";

export default function NotFoundFrog() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="70" fill="#f0fdf4" />

      {/* Frog body */}
      <ellipse cx="100" cy="110" rx="50" ry="40" fill="#4ADE80" />

      {/* Frog eyes base */}
      <ellipse cx="80" cy="95" rx="15" ry="15" fill="white" />
      <ellipse cx="120" cy="95" rx="15" ry="15" fill="white" />

      {/* Eye with X mark (left) */}
      <line
        x1="75"
        y1="90"
        x2="85"
        y2="100"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="85"
        y1="90"
        x2="75"
        y2="100"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Eye with X mark (right) */}
      <line
        x1="115"
        y1="90"
        x2="125"
        y2="100"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="125"
        y1="90"
        x2="115"
        y2="100"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Confused mouth */}
      <path
        d="M85 125 Q100 115 115 125"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Spots */}
      <circle cx="85" cy="135" r="6" fill="#22C55E" />
      <circle cx="115" cy="135" r="6" fill="#22C55E" />

      {/* Question mark above head */}
      <text
        x="98"
        y="60"
        fontSize="30"
        fontWeight="bold"
        textAnchor="middle"
        fill="#111827"
      >
        ?
      </text>

      {/* Small map/path under frog */}
      <path
        d="M50 160 Q70 150 90 160 Q110 170 130 160 Q150 150 170 160"
        stroke="#22C55E"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 2"
      />
      <circle cx="165" cy="160" r="5" fill="#ef4444" />
    </svg>
  );
}
