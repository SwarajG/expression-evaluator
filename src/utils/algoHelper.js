import { Stack } from '../DataStructure';
import {
  isCharInputVariable,
  isCharOperator,
  hasHigherPrecedenceOfTop,
  isCharNumber,
  hasSamePrecedence,
  isOpenCharBrackets,
  isCloseCharBrackets
} from './helper';

function infixToPostfix(infix) {
  const stack = new Stack();
  const infixLength = infix.length;
  let postfixOutput = '';
  for (let i = 0; i < infixLength; i++) {
    const currentChar = infix[i];
    if (isCharInputVariable(currentChar) || isCharNumber(currentChar)) {
      postfixOutput += currentChar;
    } else if (isOpenCharBrackets(currentChar)) {
      stack.push(currentChar);
    } else if (isCloseCharBrackets(currentChar)) {
      while(!stack.isEmpty() && stack.top() !== '(') {
        const topElement = stack.top();
        postfixOutput += topElement;
        stack.pop();
      }
      stack.pop();
    } else if (isCharOperator(currentChar)) {
      while(!stack.isEmpty() && hasHigherPrecedenceOfTop(stack.top(), currentChar)) {
        postfixOutput += stack.top();
        stack.pop();
      }
      if (!stack.isEmpty() && hasSamePrecedence(stack.top(), currentChar)) {
        postfixOutput += stack.top();
        stack.pop();
      }
      stack.push(currentChar);
    }
  }
  while(!stack.isEmpty()) {
    postfixOutput += stack.top();
    stack.pop();
  }
  return postfixOutput;
}

function doMath(key, firstArg, secondArg) {
  switch (key) {
    case '+':
      return firstArg + secondArg;
    case '-':
      return firstArg - secondArg;
    case '*':
      return firstArg * secondArg;
    case '/':
      return firstArg / secondArg;
    default:
      return 0;
  }
}

function evluatePostfixExpression(postfixExpression, inputMapping) {
  const stack = new Stack();
  const length = postfixExpression.length;
  for (let i = 0; i < length; i++) {
    const currentChar = postfixExpression[i];
    if (isCharInputVariable(currentChar)) {
      stack.push(inputMapping[currentChar]);
    } else if (isCharNumber(currentChar)) {
      const number = parseInt(currentChar, 10);
      stack.push(number);
    } else if (isCharOperator(currentChar)) {
      const secondArg = stack.top();
      stack.pop();
      const firstArg = stack.top();
      stack.pop();
      const output = doMath(currentChar, firstArg, secondArg);
      stack.push(output);
    }
  }
  const answer = stack.top();
  stack.pop();
  return answer;
}

export { infixToPostfix, evluatePostfixExpression };