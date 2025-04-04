"use client";
import React, { useState } from "react";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Water/pond */}
      <path d="M4 42 Q32 30 60 42 Q60 54 32 60 Q4 54 4 42Z" fill="#7dd3fc" />
      <path
        d="M15 40 Q32 34 49 40 Q49 48 32 52 Q15 48 15 40Z"
        fill="#0ea5e9"
        opacity="0.6"
      />

      {/* Lily pad */}
      <ellipse cx="32" cy="38" rx="15" ry="7" fill="#15803d" />

      {/* Frog body */}
      <ellipse cx="32" cy="32" rx="11" ry="8" fill="#65a30d" />

      {/* Frog eyes */}
      <circle cx="27" cy="29" r="3" fill="white" />
      <circle cx="37" cy="29" r="3" fill="white" />
      <circle cx="27" cy="29" r="1.5" fill="black" />
      <circle cx="37" cy="29" r="1.5" fill="black" />

      {/* Frog mouth */}
      <path
        d="M29 35 Q32 38 35 35"
        fill="none"
        stroke="#558B2F"
        strokeWidth="1.5"
      />

      {/* Frog tongue - only shown on hover */}
      {isHovered && (
        <path
          d="M32 37 L32 52"
          fill="none"
          stroke="#e16d10"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-tongue"
        />
      )}

      {/* Frog front legs */}
      <path
        d="M25 36 Q20 42 23 44"
        fill="none"
        stroke="#65a30d"
        strokeWidth="2"
      />
      <path
        d="M39 36 Q44 42 41 44"
        fill="none"
        stroke="#65a30d"
        strokeWidth="2"
      />

      {/* Add a style tag for the tongue animation */}
      <style>
        {`
          @keyframes tongueFlick {
            0% { transform: scaleY(0.2); transform-origin: 32px 35px; }
            50% { transform: scaleY(1); transform-origin: 32px 35px; }
            100% { transform: scaleY(0.9); transform-origin: 32px 35px; }
          }
          .animate-tongue {
            animation: tongueFlick 0.1s ease-out forwards;
          }
        `}
      </style>
    </svg>
  );
}
