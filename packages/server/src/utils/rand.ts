/**
 * Generates a random number based on a seed
 * Useful for benchmarking results, to compare exact results
 */
export function getPseudoRandomNumber(seed: number, max: number) {
  const x = Math.sin(seed) * 10000
  const y = x - Math.floor(x)
  return Math.floor(y * max)
}
