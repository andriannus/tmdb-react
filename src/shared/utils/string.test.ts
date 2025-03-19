import { describe, it, expect } from 'vitest';

import { printString } from './string';

describe('printString', () => {
  it('should return default value for null', () => {
    expect(printString(null)).toBe('-');
  });

  it('should return default value for undefined', () => {
    expect(printString(undefined)).toBe('-');
  });

  it('should return default value for empty string', () => {
    expect(printString('')).toBe('-');
  });

  it('should return string representation for a number', () => {
    expect(printString(123)).toBe('123');
  });

  it('should return the string itself for a non-empty string', () => {
    expect(printString('hello')).toBe('hello');
  });

  it('should return custom default value when provided', () => {
    expect(printString('', 'N/A')).toBe('N/A');
  });

  it('should return string representation for a boolean', () => {
    expect(printString(true)).toBe('true');
  });
});
