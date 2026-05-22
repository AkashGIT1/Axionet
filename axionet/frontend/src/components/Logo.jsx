import { useId } from 'react'

/**
 * Aethon brand mark — inline SVG so it always renders crisply
 * regardless of caching or file-serving quirks.
 *
 * Design: faceted "A" monogram with violet → cyan crystalline facets,
 * a glowing apex spark (the Aethon "burning" nod), and a subtle
 * tech-grid backdrop. Rounded badge tile.
 */
export default function Logo({ size = 40, className = '', style }) {
  const uid = useId().replace(/:/g, '')
  const id = (k) => `ae-${k}-${uid}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Aethon"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id={id('bg')} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a0a23" />
          <stop offset="55%" stopColor="#2e1065" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>

        <radialGradient id={id('ambient')} cx="20" cy="14" r="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={id('left')} x1="12" y1="14" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f5f3ff" />
          <stop offset="55%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        <linearGradient id={id('right')} x1="32" y1="14" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cffafe" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>

        <linearGradient id={id('bar')} x1="22" y1="0" x2="42" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>

        <radialGradient id={id('spark')} cx="32" cy="11" r="7" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#fef3c7" />
          <stop offset="75%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={id('aura')} cx="32" cy="13" r="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={id('spine')} x1="32" y1="11" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rounded tile */}
      <rect width="64" height="64" rx="16" fill={`url(#${id('bg')})`} />

      {/* Ambient violet glow */}
      <rect width="64" height="64" rx="16" fill={`url(#${id('ambient')})`} />

      {/* Subtle tech grid */}
      <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5">
        <line x1="0" y1="16" x2="64" y2="16" />
        <line x1="0" y1="32" x2="64" y2="32" />
        <line x1="0" y1="48" x2="64" y2="48" />
        <line x1="16" y1="0" x2="16" y2="64" />
        <line x1="32" y1="0" x2="32" y2="64" />
        <line x1="48" y1="0" x2="48" y2="64" />
      </g>

      {/* Spark aura behind apex */}
      <circle className="ae-aura" cx="32" cy="13" r="20" fill={`url(#${id('aura')})`} />

      {/* A monogram — left facet */}
      <path d="M32 11 L13 54 L23 54 L32 33 Z" fill={`url(#${id('left')})`} />

      {/* A monogram — right facet */}
      <path d="M32 11 L51 54 L41 54 L32 33 Z" fill={`url(#${id('right')})`} />

      {/* Central spine highlight (where facets meet) */}
      <path d="M31 12 L33 12 L32 34 Z" fill={`url(#${id('spine')})`} opacity="0.85" />

      {/* Crossbar with chart-baseline hint */}
      <rect x="24.5" y="38" width="15" height="3.6" rx="1.8" fill={`url(#${id('bar')})`} />

      {/* Data-point accents on either side of crossbar */}
      <circle cx="22" cy="39.8" r="1.3" fill="#c4b5fd" />
      <circle cx="42" cy="39.8" r="1.3" fill="#67e8f9" />

      {/* Spark/ember at apex */}
      <circle className="ae-spark" cx="32" cy="11" r="6.5" fill={`url(#${id('spark')})`} />
      <circle cx="32" cy="11" r="2.4" fill="#ffffff" />

      {/* Inner border highlight */}
      <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="none"
        stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1" />

      {/* Bottom inner shadow */}
      <rect x="0" y="48" width="64" height="16" rx="0" fill="#000000" opacity="0.18" />
    </svg>
  )
}
