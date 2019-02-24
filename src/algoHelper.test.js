import {
  infixToPostfix,
  evluatePostfixExpression
} from '../src/utils/algoHelper';

test('Convert infix to postifix expression', () => {
  expect(infixToPostfix('a+b*c+d')).toBe('abc*+d+');
  expect(infixToPostfix('a*b+c*d')).toBe('ab*cd*+');
  expect(infixToPostfix('a+3+c+d')).toBe('a3+c+d+');
});

test('Evluate the expression', () => {
  expect(evluatePostfixExpression('abc*+d+', { a: 1, b: 2, c: 3, d: 4 })).toBe(11);
  expect(evluatePostfixExpression('ab*cd*+', { a: 1, b: 2, c: 3, d: 4 })).toBe(14);
  expect(evluatePostfixExpression('a3+c+d+', { a: 1, c: 2, d: 3 })).toBe(9);
});