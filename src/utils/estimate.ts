/**
 * Roughly estimate where a wallet sits among memecoin traders
 * based on how many different coins they've traded this year.
 *
 * Returns a percentile where:
 *   - 1  => top 1% (elite degen)
 *   - 50 => top 50% (average trader)
 *   - 99 => top 99% (barely traded compared to others)
 *
 * IMPORTANT: This is a heuristic model, not on-chain truth.
 * It assumes a very skewed distribution:
 *   - Most traders only touch 1–3 coins.
 *   - Degens/bots hit dozens or hundreds.
 */
export function estimateMemecoinTraderPercentile(
  coinsTraded: number
): number {
  if (!Number.isFinite(coinsTraded) || coinsTraded <= 0) {
    // Treat "0 coins" as effectively bottom of the trader distribution.
    // You might want to hide the "top %" line in this case instead.
    return 100;
  }

  // We work with integer "distinct coins traded"
  const coins = Math.floor(coinsTraded);

  /**
   * Heuristic cumulative distribution function (CDF):
   * cdf = P(trader has traded <= coins) among all *traders*.
   *
   * These numbers are chosen to be:
   * - Consistent with "a big chunk only trade once"
   * - Strongly heavy-tailed (few extreme degens)
   *
   * Tweak these to change how "impressive" higher counts look.
   */
  const BUCKETS: { coins: number; cdf: number }[] = [
    { coins: 10, cdf: 0.01 },   // ~55% of traders have traded 1 or fewer coins
    { coins: 50, cdf: 0.05 },   // ~70% have traded 2 or fewer
    { coins: 100, cdf: 0.08 },
    { coins: 300, cdf: 0.20 },
    { coins: 600, cdf: 0.30 },
    { coins: 1000, cdf: 0.80 },
    { coins: 3000, cdf: 0.90 },
    { coins: 5000, cdf: 0.98 },
    { coins: 8000, cdf: 0.99 },
    { coins: 10_000, cdf: 0.995 },
  ];

  // Below the first bucket: interpolate from "0 coins" (cdf = 0) to 1 coin
  if (coins <= BUCKETS[0].coins) {
    const ratio = coins / BUCKETS[0].coins; // 0 → 1
    const cdf = ratio * BUCKETS[0].cdf;
    return percentileFromCdf(cdf);
  }

  // Between buckets: linear interpolation in log-ish space
  for (let i = 1; i < BUCKETS.length; i++) {
    const prev = BUCKETS[i - 1];
    const curr = BUCKETS[i];

    if (coins <= curr.coins) {
      const span = curr.coins - prev.coins;
      const ratio = span > 0 ? (coins - prev.coins) / span : 1;
      const cdf = prev.cdf + ratio * (curr.cdf - prev.cdf);
      return percentileFromCdf(cdf);
    }
  }

  // Above the last bucket: we’re in the extreme tail (top ~0.3% or better)
  const last = BUCKETS[BUCKETS.length - 1];
  const cdfBeyond = Math.min(0.9995, last.cdf + 0.0005); // cap at 0.9995
  return percentileFromCdf(cdfBeyond);
}

/**
 * Convert a CDF value (0–1) into a "top X%" reading.
 */
function percentileFromCdf(cdf: number): number {
  const tail = 1 - cdf; // P(trader has traded MORE coins)
  let percentile = tail * 100; // top X%

  // Clamp to a nice range to avoid weird 0.0001% outputs
  percentile = Math.min(Math.max(percentile, 0.1), 99.9);

  // Round to 1 decimal place (e.g. 3.2%).
  return Math.round(percentile * 10) / 10;
}