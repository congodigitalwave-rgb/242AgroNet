import React from "react";

interface Logo242AgroProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  showText?: boolean;
  withGlow?: boolean;
}

export const Logo242Agro: React.FC<Logo242AgroProps> = ({
  size = "md",
  className = "",
  showText = true,
  withGlow = true,
}) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    hero: "w-32 h-32 sm:w-40 sm:h-40",
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SVG Badge Emblem */}
      <div className={`relative ${sizeMap[size]} shrink-0 select-none`}>
        {withGlow && (
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md -z-10 animate-pulse" />
        )}
        
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
        >
          <defs>
            {/* Metallic Outer Ring Gradient */}
            <linearGradient id="silverRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            {/* Inner Rim Bevel */}
            <radialGradient id="innerRimShadow" cx="50%" cy="50%" r="50%">
              <stop offset="90%" stopColor="#000000" stopOpacity="0" />
              <stop offset="97%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </radialGradient>

            {/* Wood Texture / Gradient */}
            <linearGradient id="woodPlank1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8D5B28" />
              <stop offset="30%" stopColor="#B27B3D" />
              <stop offset="70%" stopColor="#C48B47" />
              <stop offset="100%" stopColor="#8A5826" />
            </linearGradient>
            <linearGradient id="woodPlank2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#784B1D" />
              <stop offset="40%" stopColor="#A46E34" />
              <stop offset="80%" stopColor="#B88040" />
              <stop offset="100%" stopColor="#75471A" />
            </linearGradient>

            {/* Soil Mound Gradient */}
            <radialGradient id="soilGradient" cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#633C1D" />
              <stop offset="60%" stopColor="#452711" />
              <stop offset="100%" stopColor="#2E1809" />
            </radialGradient>

            {/* Leaf Left Gradient */}
            <linearGradient id="leafLeftGrad" x1="20%" y1="100%" x2="70%" y2="0%">
              <stop offset="0%" stopColor="#3B8B23" />
              <stop offset="50%" stopColor="#5BB32C" />
              <stop offset="100%" stopColor="#7FD236" />
            </linearGradient>

            {/* Leaf Right Gradient */}
            <linearGradient id="leafRightGrad" x1="80%" y1="100%" x2="30%" y2="0%">
              <stop offset="0%" stopColor="#2D7A19" />
              <stop offset="50%" stopColor="#4EAA22" />
              <stop offset="100%" stopColor="#76CE30" />
            </linearGradient>

            {/* Vein Light Glow */}
            <linearGradient id="veinGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E2FAD0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
            </linearGradient>

            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* 1. Outer Metallic Bevel & Circle */}
          <circle cx="200" cy="200" r="192" fill="url(#silverRim)" />
          <circle cx="200" cy="200" r="184" fill="#FFFFFF" />
          <circle cx="200" cy="200" r="184" fill="url(#innerRimShadow)" />

          {/* 2. Top Arch Enclosing Green Ring */}
          <path
            d="M 52 270 A 155 155 0 1 1 348 270"
            fill="none"
            stroke="#205B32"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* 3. Soil Mound */}
          <path
            d="M 135 235 C 135 220, 160 212, 200 212 C 240 212, 265 220, 265 235 Z"
            fill="url(#soilGradient)"
          />
          <ellipse cx="170" cy="225" rx="8" ry="4" fill="#452711" />
          <ellipse cx="230" cy="227" rx="10" ry="5" fill="#452711" />
          <ellipse cx="200" cy="223" rx="12" ry="6" fill="#5A3418" />

          {/* 4. Wooden Planter Box (2 Planks with nails & seams) */}
          {/* Plank 1 (Top) */}
          <rect
            x="130"
            y="234"
            width="140"
            height="18"
            rx="2"
            fill="url(#woodPlank1)"
            stroke="#593412"
            strokeWidth="1.5"
          />
          {/* Plank 1 details */}
          <line x1="140" y1="243" x2="260" y2="243" stroke="#9A652B" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="137" cy="243" r="2" fill="#3D200A" />
          <circle cx="263" cy="243" r="2" fill="#3D200A" />

          {/* Plank 2 (Bottom) */}
          <rect
            x="130"
            y="254"
            width="140"
            height="18"
            rx="2"
            fill="url(#woodPlank2)"
            stroke="#593412"
            strokeWidth="1.5"
          />
          {/* Plank 2 details */}
          <line x1="145" y1="263" x2="255" y2="263" stroke="#875120" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="137" cy="263" r="2" fill="#3D200A" />
          <circle cx="263" cy="263" r="2" fill="#3D200A" />

          {/* Vertical edge braces on wooden planter */}
          <rect x="130" y="234" width="7" height="38" fill="#6B3F15" />
          <rect x="263" y="234" width="7" height="38" fill="#6B3F15" />

          {/* 5. Center Stem */}
          <path
            d="M 193 230 C 193 185, 196 145, 200 120 C 204 145, 207 185, 207 230 Z"
            fill="#32881E"
          />

          {/* 6. Sprouting Leaves (Large, organic, vibrant) */}
          {/* Left Leaf */}
          <g filter="url(#softShadow)">
            <path
              d="M 200 170 C 175 168, 110 148, 85 85 C 138 68, 185 105, 200 170 Z"
              fill="url(#leafLeftGrad)"
            />
            {/* Left Leaf Vein */}
            <path
              d="M 198 165 C 180 140, 145 110, 105 88"
              fill="none"
              stroke="url(#veinGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 165 135 C 145 138, 125 142, 115 146"
              fill="none"
              stroke="#D2F6B8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            <path
              d="M 142 112 C 128 112, 112 114, 102 118"
              fill="none"
              stroke="#D2F6B8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
          </g>

          {/* Right Leaf */}
          <g filter="url(#softShadow)">
            <path
              d="M 200 170 C 225 168, 290 148, 315 85 C 262 68, 215 105, 200 170 Z"
              fill="url(#leafRightGrad)"
            />
            {/* Right Leaf Vein */}
            <path
              d="M 202 165 C 220 140, 255 110, 295 88"
              fill="none"
              stroke="url(#veinGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 235 135 C 255 138, 275 142, 285 146"
              fill="none"
              stroke="#D2F6B8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            <path
              d="M 258 112 C 272 112, 288 114, 298 118"
              fill="none"
              stroke="#D2F6B8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
          </g>

          {/* 7. Chicken Silhouette (Left Side) */}
          <g fill="#184524">
            <path d="M 60 252 C 58 245, 62 238, 68 234 C 64 230, 60 220, 64 214 C 68 208, 72 208, 76 210 C 78 205, 84 204, 88 206 C 92 201, 98 203, 100 208 C 104 207, 108 210, 109 214 C 114 218, 118 226, 117 236 C 116 244, 112 250, 106 256 C 102 260, 96 264, 90 266 C 88 271, 88 274, 86 276 L 81 276 L 82 267 C 78 266, 74 263, 70 260 C 64 260, 61 257, 60 252 Z" />
            {/* Beak & Comb details */}
            <path d="M 108 211 L 115 213 L 109 217 Z" fill="#184524" />
            <path d="M 94 199 C 97 197, 102 198, 103 203 C 100 202, 97 202, 94 199 Z" fill="#184524" />
            {/* Tail feather tufts */}
            <path d="M 62 230 C 54 220, 56 208, 63 216 Z" fill="#184524" />
            <path d="M 57 240 C 48 232, 50 220, 58 228 Z" fill="#184524" />
          </g>

          {/* 8. Rabbit Silhouette (Right Side) */}
          <g fill="#184524">
            {/* Body, head, ears & fluffy tail */}
            <path d="M 330 265 C 334 262, 337 258, 335 252 C 333 247, 328 245, 325 247 C 322 238, 316 230, 308 225 C 304 222, 298 220, 294 222 C 293 217, 294 207, 298 198 C 300 193, 297 190, 294 191 C 290 193, 288 202, 287 210 C 285 204, 285 195, 287 188 C 288 183, 284 181, 282 183 C 279 186, 278 196, 280 208 C 276 211, 274 216, 274 222 C 272 227, 276 232, 280 236 C 278 242, 279 250, 284 258 C 290 266, 300 270, 314 270 C 322 270, 327 268, 330 265 Z" />
          </g>

          {/* 9. Bottom Curved Brand Text: 242Agro inside the circle badge */}
          <g id="badgeText">
            <text
              x="138"
              y="336"
              fill="#144626"
              fontSize="48"
              fontWeight="900"
              fontFamily="Outfit, Plus Jakarta Sans, system-ui, sans-serif"
              letterSpacing="-1.5"
            >
              242
            </text>
            <text
              x="218"
              y="336"
              fill="#66B928"
              fontSize="48"
              fontWeight="900"
              fontFamily="Outfit, Plus Jakarta Sans, system-ui, sans-serif"
              letterSpacing="-1.5"
            >
              Agro
            </text>
          </g>
        </svg>
      </div>

      {/* Optional Companion Brand Text Header */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black text-2xl tracking-tight font-['Outfit'] text-white">
              242<span className="text-[#66B928]">Agro</span>
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-300 tracking-wide mt-0.5">
            Pointe-Noire &bull; Hors-Sol & Élevage
          </span>
        </div>
      )}
    </div>
  );
};
