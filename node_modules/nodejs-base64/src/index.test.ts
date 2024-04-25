import { base64decode, base64encode } from './index';

describe('nodejs-base64', () => {
  it('must encode to base64 correctly', () => {
    expect(base64encode('test 123')).toBe('dGVzdCAxMjM=');
    expect(base64encode('測試123')).toBe('5ris6KmmMTIz');
  });

  it('must decode from base64 correctly', () => {
    expect(base64decode('dGVzdCAxMjM=')).toBe('test 123');
    expect(base64decode('5ris6KmmMTIz')).toBe('測試123');
  });

  it('must encode/decode numbers', () => {
    expect(base64encode('112233')).toBe('MTEyMjMz');
    expect(base64decode('MTEyMjMz')).toBe('112233');
  });

  it('must handle edge cases', () => {
    expect(base64encode('')).toBe('');
    expect(base64decode('')).toBe('');
    
    expect(() => base64encode({} as string)).toThrow();
    expect(() => base64decode({} as string)).toThrow();

    expect(() => base64encode(null as string)).toThrow();
    expect(() => base64decode(null as string)).toThrow();

    expect(() => base64encode(undefined as string)).toThrow();
    expect(() => base64decode(undefined as string)).toThrow();
  });
});
