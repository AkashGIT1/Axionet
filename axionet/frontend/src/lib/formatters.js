/**
 * Number formatters for the Aethon UI.
 *
 * Centralizing these here keeps the Treasury/Dashboard/Admin cards consistent
 * and prevents long values like "$12,345,678.45" from overflowing fixed-width
 * KPI tiles (which is what was clipping the dollar sign on Treasury Collected).
 */

const UNITS = [
  { v: 1e12, s: 'T' },
  { v: 1e9,  s: 'B' },
  { v: 1e6,  s: 'M' },
  { v: 1e3,  s: 'K' },
]

/**
 * Convert a number into compact short-hand notation: 1234 -> "1.23K", 1.5e6 -> "1.5M".
 *
 * @param {number|string} value
 * @param {object} [opts]
 * @param {number} [opts.decimals=2]    Digits for sub-1K and the "K"/"M"/... bucket
 * @param {number} [opts.smallDecimals] Digits for sub-1 values (defaults to decimals)
 * @param {boolean} [opts.alwaysSign]   Force a leading + on positive values
 */
export function formatCompact(value, opts = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '0'

  const { decimals = 2, smallDecimals, alwaysSign = false } = opts
  const subOneDec = smallDecimals != null ? smallDecimals : decimals
  const sign = n < 0 ? '-' : alwaysSign && n > 0 ? '+' : ''
  const abs = Math.abs(n)

  // Sub-1: keep some precision so price ticks don't all read 0.00.
  if (abs < 1 && abs > 0) {
    return sign + abs.toFixed(Math.max(2, subOneDec))
  }
  // Sub-1K: render plain so $0–$999 stays readable.
  if (abs < 1000) {
    return sign + abs.toFixed(decimals)
  }
  for (const u of UNITS) {
    if (abs >= u.v) {
      const scaled = abs / u.v
      // Drop trailing decimal when integer-ish (e.g. "5M" not "5.00M").
      const fixed = scaled >= 100 ? scaled.toFixed(0) : scaled.toFixed(decimals)
      const trimmed = fixed.replace(/\.?0+$/, '')
      return sign + trimmed + u.s
    }
  }
  return sign + abs.toFixed(decimals)
}

/**
 * Currency variant: prefixes "$" (or another currency) and uses compact notation
 * for values >= 1,000.
 */
export function formatMoney(value, opts = {}) {
  const { currency = '$', ...rest } = opts
  const n = Number(value)
  if (!Number.isFinite(n)) return `${currency}0`
  const sign = n < 0 ? '-' : rest.alwaysSign && n > 0 ? '+' : ''
  const body = formatCompact(Math.abs(n), { ...rest, alwaysSign: false })
  return `${sign}${currency}${body}`
}

/**
 * Integer-friendly compact notation (no decimals for whole counts):
 *   942 -> "942", 1234 -> "1.2K", 1500000 -> "1.5M"
 */
export function formatNumber(value, opts = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '0'
  if (Math.abs(n) < 1000) return String(Math.round(n))
  return formatCompact(n, { decimals: 1, ...opts })
}
