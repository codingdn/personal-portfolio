export function flagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

export function displayName(name: string): string {
  if (name === 'United States of America') return 'United States'
  return name
}
