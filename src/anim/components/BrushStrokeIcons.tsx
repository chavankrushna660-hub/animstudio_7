import React from 'react';

interface BrushStrokeIconProps {
  type: string;
  className?: string;
  isActive?: boolean;
}

export const BrushStrokeIcon: React.FC<BrushStrokeIconProps> = ({ type, className = "w-full h-9", isActive = false }) => {
  // Always use solid black for high contrast, thick, bold visibility on white/light surfaces
  const strokeColor = "#000000";
  const accentColor = "#475569";

  switch (type) {
    case 'solid':
      // Solid dynamic tapered stroke
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 18 C 22 10, 45 6, 70 14 C 84 18, 92 15, 94 13 C 90 20, 68 26, 42 22 C 22 19, 10 21, 6 18 Z"
            fill={strokeColor}
          />
        </svg>
      );

    case 'cold':
      // Frost / Crystalline sharp fractured stroke
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 16 L 20 12 L 28 19 L 40 9 L 52 21 L 64 11 L 76 20 L 88 13 L 94 16 L 86 19 L 74 15 L 60 23 L 48 14 L 36 22 L 22 15 Z"
            fill={strokeColor}
          />
          {/* Ice frost crystals */}
          <polygon points="30,7 33,10 30,13 27,10" fill={accentColor} />
          <polygon points="68,6 71,9 68,12 65,9" fill={accentColor} />
          <polygon points="50,23 52,25 50,27 48,25" fill={accentColor} />
        </svg>
      );

    case 'dry':
      // Dry bristle brush stroke with parallel filaments and skips
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 6 11 Q 40 8 70 14 T 94 12" stroke={strokeColor} strokeWidth="2.5" strokeDasharray="18 4 12 3 20 2" strokeLinecap="round" />
          <path d="M 7 15 Q 38 12 68 18 T 92 16" stroke={strokeColor} strokeWidth="2" strokeDasharray="14 5 16 4" strokeLinecap="round" />
          <path d="M 8 19 Q 42 16 72 21 T 93 19" stroke={strokeColor} strokeWidth="1.8" strokeDasharray="8 3 22 5 10 2" strokeLinecap="round" />
          <path d="M 12 23 Q 45 20 75 23 T 90 22" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="12 6 14 5" strokeLinecap="round" />
        </svg>
      );

    case 'smooth':
      // Streamline smooth vector curve
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 16 C 30 6, 65 26, 94 14"
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'water':
      // Watercolor wash with fluid edges
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`waterGrad-${isActive}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.4" />
              <stop offset="50%" stopColor={strokeColor} stopOpacity="0.85" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 6 16 C 18 10, 32 8, 48 12 C 64 16, 78 11, 94 15 C 88 23, 72 25, 52 21 C 34 18, 18 24, 6 16 Z"
            fill={`url(#waterGrad-${isActive})`}
            stroke={strokeColor}
            strokeWidth="1.2"
          />
        </svg>
      );

    case 'calligraphy':
      // Chisel nib calligraphy ribbon
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 22 L 14 10 C 35 7, 55 12, 70 20 C 82 25, 90 20, 94 12 L 88 24 C 72 17, 50 14, 30 18 L 6 22 Z"
            fill={strokeColor}
          />
        </svg>
      );

    case 'pencil':
      // Graphite pencil with fine textured core
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 6 16 C 30 11, 60 21, 94 14" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="13" r="0.8" fill={strokeColor} />
          <circle cx="28" cy="18" r="0.8" fill={strokeColor} />
          <circle cx="45" cy="13" r="0.8" fill={strokeColor} />
          <circle cx="62" cy="19" r="0.8" fill={strokeColor} />
          <circle cx="78" cy="14" r="0.8" fill={strokeColor} />
          <circle cx="88" cy="17" r="0.8" fill={strokeColor} />
        </svg>
      );

    case 'marker':
      // Broad translucent chisel marker
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 20 L 12 11 L 88 11 L 94 20 L 12 20 Z"
            fill={strokeColor}
            opacity="0.75"
          />
          <path
            d="M 8 18 L 13 13 L 87 13 L 92 18 Z"
            fill={strokeColor}
          />
        </svg>
      );

    case 'airbrush':
      // Soft diffused airbrush mist
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id={`airblur-${isActive}`} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>
          <path d="M 10 16 C 35 10, 65 22, 90 16" stroke={strokeColor} strokeWidth="12" strokeLinecap="round" filter={`url(#airblur-${isActive})`} opacity="0.6" />
          <path d="M 12 16 C 35 11, 65 21, 88 16" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
        </svg>
      );

    case 'glow':
      // Neon glow stroke
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id={`glowfilter-${isActive}`} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <path d="M 8 16 C 35 8, 65 24, 92 16" stroke={accentColor} strokeWidth="9" strokeLinecap="round" filter={`url(#glowfilter-${isActive})`} />
          <path d="M 8 16 C 35 8, 65 24, 92 16" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'ink':
      // Japanese Sumi ink stroke with bleed
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 18 C 14 12, 25 9, 38 12 C 45 13, 52 9, 62 14 C 74 19, 84 13, 94 16 C 88 22, 78 24, 65 20 C 50 17, 36 23, 20 21 C 12 24, 6 22, 6 18 Z"
            fill={strokeColor}
          />
          <circle cx="8" cy="18" r="3.5" fill={strokeColor} />
          <circle cx="93" cy="16" r="2.5" fill={strokeColor} />
        </svg>
      );

    case 'charcoal':
      // Heavy textured compressed charcoal
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 7 14 Q 28 8 50 16 T 93 14"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="square"
            strokeDasharray="12 2 8 3 14 1"
          />
          <path
            d="M 8 18 Q 30 13 52 19 T 92 18"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 2 10 3"
          />
        </svg>
      );

    case 'oil':
      // Thick 3D oil impasto stroke
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 17 C 28 8, 62 24, 94 15"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Specular crest */}
          <path
            d="M 12 15 C 32 9, 64 21, 88 14"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'watercolor':
      // Multi-tone translucent watercolor wash
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 8 16 C 24 9, 44 8, 60 13 C 76 17, 86 12, 92 15 C 85 24, 68 25, 50 20 C 32 17, 18 23, 8 16 Z"
            fill={strokeColor}
            opacity="0.45"
          />
          <path
            d="M 14 16 C 30 11, 48 11, 64 15 C 74 17, 82 14, 88 16 C 80 21, 68 22, 54 18 C 38 15, 24 19, 14 16 Z"
            fill={strokeColor}
            opacity="0.8"
          />
        </svg>
      );

    case 'crayon':
      // Wax crayon stippled stroke
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 16 C 30 10, 60 22, 94 15"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          <path
            d="M 8 16 C 32 11, 62 21, 92 15"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'spray':
      // Spray paint scattered splatter
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="16" r="1.5" fill={strokeColor} />
          <circle cx="16" cy="12" r="2" fill={strokeColor} />
          <circle cx="22" cy="18" r="1.2" fill={strokeColor} />
          <circle cx="28" cy="14" r="2.2" fill={strokeColor} />
          <circle cx="35" cy="17" r="1.6" fill={strokeColor} />
          <circle cx="42" cy="13" r="2.5" fill={strokeColor} />
          <circle cx="48" cy="19" r="1.4" fill={strokeColor} />
          <circle cx="55" cy="15" r="2.6" fill={strokeColor} />
          <circle cx="62" cy="18" r="1.8" fill={strokeColor} />
          <circle cx="70" cy="14" r="2.4" fill={strokeColor} />
          <circle cx="78" cy="17" r="1.5" fill={strokeColor} />
          <circle cx="85" cy="13" r="2" fill={strokeColor} />
          <circle cx="92" cy="16" r="1.2" fill={strokeColor} />
          <circle cx="26" cy="22" r="1" fill={strokeColor} />
          <circle cx="52" cy="10" r="1" fill={strokeColor} />
          <circle cx="74" cy="22" r="1" fill={strokeColor} />
        </svg>
      );

    case 'dotted':
      // Precision dotted line
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 8 16 L 92 16"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="0.1 10"
          />
        </svg>
      );

    case 'dashed':
      // Precision dashed line
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 16 L 94 16"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="8 6"
          />
        </svg>
      );

    case 'ribbon':
      // 3D twisted ribbon band
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 6 20 C 25 8, 45 10, 56 18 C 65 24, 78 22, 94 12 L 94 18 C 78 28, 62 26, 50 18 C 38 12, 20 16, 6 26 Z"
            fill={strokeColor}
          />
          <path
            d="M 50 18 C 62 26, 78 28, 94 18 L 94 12 C 78 22, 65 24, 56 18 Z"
            fill={accentColor}
            opacity="0.8"
          />
        </svg>
      );

    case 'organic':
      // Organic botanical leaf stroke
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 6 16 C 30 12, 60 20, 94 15" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 25 14 Q 30 8 36 12 Q 30 15 25 14 Z" fill={strokeColor} />
          <path d="M 45 17 Q 52 23 58 19 Q 52 16 45 17 Z" fill={strokeColor} />
          <path d="M 70 16 Q 76 10 82 14 Q 76 17 70 16 Z" fill={strokeColor} />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 6 16 L 94 16" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
};
