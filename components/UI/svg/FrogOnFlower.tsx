export default function FrogOnFlower({ message = "No plants found" }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width="180"
        height="130"
        viewBox="0 0 180 130"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flower */}
        <circle cx="90" cy="85" r="35" fill="#FF9800" />
        <circle cx="73" cy="68" r="15" fill="#FFEB3B" />
        <circle cx="107" cy="68" r="15" fill="#FFEB3B" />
        <circle cx="73" cy="102" r="15" fill="#FFEB3B" />
        <circle cx="107" cy="102" r="15" fill="#FFEB3B" />
        <circle cx="90" cy="85" r="18" fill="#FFC107" />

        {/* Frog body */}
        <ellipse cx="90" cy="50" rx="28" ry="20" fill="#8BC34A" />

        {/* Frog eyes */}
        <circle cx="78" cy="42" r="7" fill="white" />
        <circle cx="102" cy="42" r="7" fill="white" />
        <circle cx="78" cy="42" r="3.5" fill="black" />
        <circle cx="102" cy="42" r="3.5" fill="black" />

        {/* Frog mouth */}
        <path
          d="M83 58 Q90 65 97 58"
          fill="none"
          stroke="#558B2F"
          strokeWidth="2.5"
        />

        {/* Frog legs */}
        <path
          d="M70 55 Q60 70 68 78"
          fill="none"
          stroke="#8BC34A"
          strokeWidth="4"
        />
        <path
          d="M110 55 Q120 70 112 78"
          fill="none"
          stroke="#8BC34A"
          strokeWidth="4"
        />
      </svg>
      <h2 className="mt-2 text-center font-semibold text-green-100 lg:text-xl">
        {message}
      </h2>
    </div>
  );
}
