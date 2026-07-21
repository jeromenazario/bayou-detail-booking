/**
 * Full-bleed flat illustration: a moonlit bayou with rolling hills, a winding
 * river, cypress trees, and the wash crew's gear — Clay-style scene, flat
 * shapes only. Rendered as a static SVG, cropped from center via slice.
 */
export function BayouScene() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* sky */}
      <rect width="1600" height="900" fill="#0b1e3c" />

      {/* clouds */}
      <path
        d="M180 150 q 30 -46 86 -40 q 20 -34 70 -28 q 46 6 52 44 q 40 4 38 36 q -2 26 -40 26 l -180 0 q -34 -4 -26 -38 z"
        fill="#11274a"
      />
      <path
        d="M1180 130 q 26 -40 76 -34 q 18 -30 62 -24 q 40 6 46 38 q 36 4 34 32 q -2 24 -36 24 l -158 0 q -30 -4 -24 -36 z"
        fill="#0f2444"
      />
      <path
        d="M620 210 q 22 -34 64 -30 q 16 -26 54 -20 q 34 4 40 32 q 30 4 28 28 q -2 20 -30 20 l -134 0 q -26 -4 -22 -30 z"
        fill="#0f2444"
      />

      {/* moon */}
      <circle cx="1010" cy="150" r="64" fill="#f5f3ec" opacity="0.95" />
      <circle cx="1010" cy="150" r="94" fill="none" stroke="#f5f3ec" strokeOpacity="0.14" strokeWidth="3" />

      {/* stars */}
      <path d="M420 140 l3.5 10 10 3.5 -10 3.5 -3.5 10 -3.5 -10 -10 -3.5 10 -3.5 z" fill="#f5f3ec" opacity="0.5" />
      <path d="M760 90 l3 8.5 8.5 3 -8.5 3 -3 8.5 -3 -8.5 -8.5 -3 8.5 -3 z" fill="#f5f3ec" opacity="0.4" />
      <path d="M960 260 l3 8.5 8.5 3 -8.5 3 -3 8.5 -3 -8.5 -8.5 -3 8.5 -3 z" fill="#d6e326" opacity="0.7" />
      <path d="M300 320 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5 z" fill="#f5f3ec" opacity="0.35" />
      <path d="M1450 300 l3 8.5 8.5 3 -8.5 3 -3 8.5 -3 -8.5 -8.5 -3 8.5 -3 z" fill="#f5f3ec" opacity="0.45" />
      <path d="M660 330 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5 z" fill="#d6e326" opacity="0.5" />
      <path d="M1360 120 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5 z" fill="#f5f3ec" opacity="0.4" />

      {/* back hills */}
      <path
        d="M0 330 C 260 270 480 360 800 315 C 1120 270 1340 355 1600 305 L 1600 900 L 0 900 Z"
        fill="#17325e"
      />

      {/* cypress trees — back ridge */}
      <g fill="#1e3d6e">
        <ellipse cx="130" cy="280" rx="22" ry="58" />
        <ellipse cx="196" cy="302" rx="16" ry="42" />
        <ellipse cx="1420" cy="270" rx="24" ry="62" />
        <ellipse cx="1496" cy="298" rx="16" ry="44" />
        <ellipse cx="920" cy="290" rx="14" ry="38" />
      </g>

      {/* winding river */}
      <path
        d="M0 450 C 300 418 620 472 900 444 C 1180 416 1400 464 1600 438 L 1600 510 C 1340 532 1040 486 740 510 C 440 530 200 496 0 512 Z"
        fill="#2a4d86"
      />
      <g stroke="#5c8ed0" strokeWidth="5" strokeLinecap="round" opacity="0.6">
        <path d="M220 472 h 70" />
        <path d="M640 486 h 54" />
        <path d="M1080 460 h 64" />
        <path d="M1380 476 h 44" />
      </g>

      {/* mid hill */}
      <path
        d="M0 510 C 250 468 480 526 740 500 C 1000 474 1260 532 1600 490 L 1600 900 L 0 900 Z"
        fill="#122a50"
      />

      {/* mid-hill trees */}
      <g fill="#16305a">
        <ellipse cx="70" cy="450" rx="30" ry="76" />
        <ellipse cx="1540" cy="440" rx="32" ry="82" />
        <ellipse cx="330" cy="472" rx="18" ry="48" />
        <ellipse cx="1250" cy="468" rx="18" ry="46" />
      </g>

      {/* bubbles drifting off the wash */}
      <g fill="none" stroke="#f5f3ec" strokeWidth="3">
        <circle cx="565" cy="370" r="18" strokeOpacity="0.22" />
        <circle cx="640" cy="322" r="10" strokeOpacity="0.18" />
        <circle cx="990" cy="320" r="14" strokeOpacity="0.2" />
        <circle cx="1055" cy="370" r="8" strokeOpacity="0.16" />
        <circle cx="500" cy="425" r="7" strokeOpacity="0.16" />
      </g>

      {/* spray bottle */}
      <g transform="translate(360 384)">
        <rect x="0" y="40" width="52" height="86" rx="12" fill="#6fa4e0" />
        <rect x="8" y="66" width="36" height="34" rx="6" fill="#f5f3ec" opacity="0.9" />
        <rect x="12" y="10" width="18" height="34" rx="6" fill="#4a7ec2" />
        <path d="M12 14 h 34 q 10 0 10 10 l -14 2 q 0 -6 -8 -6 h -22 z" fill="#d6e326" />
      </g>

      {/* wash bucket with foam */}
      <g transform="translate(430 380)">
        <path d="M8 30 L 116 30 L 102 130 Q 62 140 22 130 Z" fill="#dce7f5" />
        <path d="M8 30 L 116 30 L 112 58 L 12 58 Z" fill="#c3d4ec" />
        <path d="M14 28 Q 62 -14 110 28" fill="none" stroke="#c3d4ec" strokeWidth="8" strokeLinecap="round" />
        <g fill="#ffffff">
          <circle cx="34" cy="22" r="14" />
          <circle cx="60" cy="14" r="17" />
          <circle cx="88" cy="22" r="13" />
          <circle cx="74" cy="28" r="10" />
          <circle cx="46" cy="30" r="9" />
        </g>
      </g>

      {/* the car */}
      <g transform="translate(590 410)">
        <path
          d="M-30 196 q 240 40 480 0"
          fill="none"
          stroke="#d6e326"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path d="M86 66 q 20 -54 74 -54 h 76 q 56 0 80 54 z" fill="#f5f3ec" />
        <rect x="110" y="28" width="58" height="34" rx="8" fill="#13294b" />
        <rect x="184" y="28" width="58" height="34" rx="8" fill="#13294b" />
        <rect x="0" y="62" width="420" height="88" rx="44" fill="#f5f3ec" />
        <rect x="18" y="86" width="34" height="12" rx="6" fill="#d6e326" opacity="0.9" />
        <circle cx="92" cy="150" r="34" fill="#06122a" />
        <circle cx="92" cy="150" r="12" fill="#f5f3ec" />
        <circle cx="328" cy="150" r="34" fill="#06122a" />
        <circle cx="328" cy="150" r="12" fill="#f5f3ec" />
        <circle cx="404" cy="98" r="9" fill="#d6e326" />
        <path d="M-52 30 l4.5 13 13 4.5 -13 4.5 -4.5 13 -4.5 -13 -13 -4.5 13 -4.5 z" fill="#d6e326" />
        <path d="M446 -6 l3.5 10 10 3.5 -10 3.5 -3.5 10 -3.5 -10 -10 -3.5 10 -3.5 z" fill="#d6e326" opacity="0.85" />
      </g>

      {/* looping hose — the Clay tube */}
      <g transform="translate(1150 330)">
        <path
          d="M0 190 C -10 90 150 40 170 130 C 186 200 60 230 70 140 C 76 84 150 80 190 120"
          fill="none"
          stroke="#4a83d8"
          strokeWidth="32"
          strokeLinecap="round"
        />
        <path d="M182 108 l 44 30 q 12 8 2 20 l -8 10 q -10 10 -20 0 l -36 -38 z" fill="#f5f3ec" />
        <g stroke="#8fb7ea" strokeWidth="4" strokeLinecap="round" opacity="0.8">
          <path d="M244 128 l 20 -10" />
          <path d="M250 146 l 22 0" />
          <path d="M244 162 l 20 10" />
        </g>
      </g>

      {/* traffic cone */}
      <g transform="translate(1090 490)">
        <path d="M44 0 L 72 96 L 16 96 Z" fill="#e08a3c" />
        <path d="M32 42 L 56 42 L 62 62 L 26 62 Z" fill="#f5f3ec" />
        <rect x="0" y="92" width="88" height="16" rx="8" fill="#c9762c" />
      </g>

      {/* front field — tucks everything in */}
      <path
        d="M0 614 C 300 572 620 632 900 598 C 1180 566 1400 622 1600 592 L 1600 900 L 0 900 Z"
        fill="#0a1b33"
      />

      {/* grain */}
      <rect width="1600" height="900" filter="url(#grain)" opacity="0.55" />
    </svg>
  );
}
