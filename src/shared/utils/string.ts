export function printString(value: unknown, defaultValue = '-'): string {
  const invalidValues = [null, undefined, ''];

  if (invalidValues.includes(value?.toString())) return defaultValue;
  return `${value}`;
}
