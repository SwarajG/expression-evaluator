import {
  isCharOperator,
  hasSamePrecedence,
  hasHigherPrecedenceOfTop,
  isCharNumber,
  isCharBrackets,
  isCharInputVariable,
  extractInputFromString,
  isInputValid
} from './utils/helper';

test('Is character operator?', () => {
  expect(isCharOperator('+')).toBe(true);
  expect(isCharOperator('-')).toBe(true);
  expect(isCharOperator('1')).toBe(false);
});

test('Has same precedance of operators?', () => {
  expect(hasSamePrecedence('+', '-')).toBe(true);
  expect(hasSamePrecedence('*', '/')).toBe(true);
  expect(hasSamePrecedence('+', '/')).toBe(false);
});

test('Does first arg has higher precedence then second', () => {
  expect(hasHigherPrecedenceOfTop('*', '-')).toBe(true);
  expect(hasHigherPrecedenceOfTop('+', '/')).toBe(false);
  expect(hasHigherPrecedenceOfTop('+', '-')).toBe(false);
});

test('Is charcter a number?', () => {
  expect(isCharNumber('1')).toBe(true);
  expect(isCharNumber('1234567')).toBe(true);
  expect(isCharNumber('hello')).toBe(false);
});

test('Is charcter any brackets?', () => {
  expect(isCharBrackets('(')).toBe(true);
  expect(isCharBrackets(')')).toBe(true);
  expect(isCharBrackets('hello')).toBe(false);
});

test('Is charcter input variable?', () => {
  expect(isCharInputVariable('2')).toBe(false);
  expect(isCharInputVariable('h')).toBe(true);
  expect(isCharInputVariable('a')).toBe(true);
});

test('Extract input variables from expression', () => {
  expect(extractInputFromString('2*x+y-z')).toEqual(['x', 'y', 'z']);
  expect(extractInputFromString('a/d*f+5')).toEqual(['a', 'd', 'f']);
  expect(extractInputFromString('a*a/a')).toEqual(['a']);
  expect(extractInputFromString('a+b+2+x')).toEqual(
    expect.not.arrayContaining(['2', '+'])
  );
});

// Arguments : (inputObject, allVars)
test('Extract input variables from expression', () => {
  expect(isInputValid({ a: '1', b: '2' }, ['a', 'b'])).toBe(true);
  expect(isInputValid({ p: null }, ['p', 'q', 'r'])).toBe(false);
  expect(isInputValid({ x: '2', y: undefined }, ['x', 'y'])).toBe(false);
});