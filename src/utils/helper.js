import uniq from 'uniq';
import { operators, brackets } from './enums';

function isCharOperator(key) {
  if (!!operators[key]) return true;
  return false;
}

function hasHigherPrecedenceOfTop(topElement, compareElement) {
  return operators[topElement] > operators[compareElement];
}

function hasSamePrecedence(topElement, compareElement) {
  return operators[topElement] === operators[compareElement];
}

function isCharNumber(char) {
  return !isNaN(char);
}

function isCharBrackets(char) {
  return !!brackets[char];
}

function isOpenCharBrackets(char) {
  return brackets[char] === '(';
}

function isCloseCharBrackets(char) {
  return brackets[char] === ')';
}

function isCharInputVariable(char) {
  return !isCharNumber(char) && !isCharBrackets(char) && !isCharOperator(char);
}

function extractInputFromString(formula) {
  const formulaLength = formula.length;
  const inputs = [];
  for (let i = 0; i < formulaLength; i++) {
    const currentChar = formula[i];
    if (isCharInputVariable(currentChar)) {
      inputs.push(currentChar);
    }
  }
  return uniq(inputs);
}

function isInputValid(inputObject, allInputVars) {
  const isMissingInputs = allInputVars.some(variable => !!inputObject[variable] === false);
  let invalidValueCount = allInputVars.length;
  Object.values(inputObject).forEach((value) => {
    if (!!value) {
      invalidValueCount -= 1;
    }
  });
  return !isMissingInputs && invalidValueCount === 0;
}

export {
  isCharNumber,
  isInputValid,
  isCharOperator,
  isCharBrackets,
  hasSamePrecedence,
  isOpenCharBrackets,
  isCloseCharBrackets,
  isCharInputVariable,
  hasHigherPrecedenceOfTop,
  extractInputFromString,
};