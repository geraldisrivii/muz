export function isNumericString(str: string) {
  if (typeof str !== 'string') return false; 
  const num = Number(str);
  return !Number.isNaN(num);
}
