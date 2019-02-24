import React, { useState, useCallback } from 'react';
import { css } from 'emotion';
import { extractInputFromString, isInputValid } from '../utils/helper';
import cloneDeep from 'clone-deep';
import { infixToPostfix, evluatePostfixExpression } from '../utils/algoHelper';

const inputWrapper = css`
  margin-bottom: 10px;
`;

const withLabel = css`
  margin: 0;
  align-items: center;
  display: flex;
`;

const input = css`
  min-height: 20px;
  line-height: 20px;
  font-size: 16px;
  margin-left: 8px;
`;

const buttonClass = css`
  padding: 5px 10px;
  margin-left: 22px;
`;

const answerText = css`
  margin-top: 20px;
  margin-left: 22px;
`;

export default function FormulaEvaluator(props) {
  const { formula, setFormData, formData, selectedFormId, selectedFormulaIndex } = props;
  const [formInputs, setFormInputs] = useState({});
  const [asnwer, setAnswer] = useState('');
  const allInputs = extractInputFromString(formula);
  
  const onInputChange = useCallback((variableName) => (event) => {
    const clonedFormInputs = cloneDeep(formInputs);
    clonedFormInputs[variableName] = parseInt(event.target.value, 10);
    setFormInputs(clonedFormInputs);
  }, [formInputs]);

  const onEvluate = useCallback(() => {
    const isValid = isInputValid(formInputs, allInputs);
    if (isValid) {
      const postfixExpression = infixToPostfix(formula);
      const finalAnswer = evluatePostfixExpression(postfixExpression, formInputs);
      setAnswer(finalAnswer);
      const clonedFormData = cloneDeep(formData);
      const indexData = clonedFormData.findIndex((data) => data.id === selectedFormId);
      const answers = clonedFormData[indexData].answers || {};
      answers[selectedFormulaIndex] = {
        formula,
        values: formInputs,
        result: finalAnswer
      }
      clonedFormData[indexData] = {
        id: selectedFormId,
        answers
      };
      setFormData(clonedFormData);
    } else {
      alert('Please enter valid inputs...');
    }
  }, [formInputs]);

  return (
    <React.Fragment>
      {allInputs.map(variableName => (
        <div className={inputWrapper} key={variableName}>
        <p className={withLabel}>
          {variableName}:
          <input type="number" className={input} value={formInputs[variableName] || ''} onChange={onInputChange(variableName)} />
        </p>
      </div>
      ))}
      <button className={buttonClass} onClick={onEvluate}>
        Evaluate
      </button>
      <p className={answerText}>
        Answer: {asnwer}
      </p>
    </React.Fragment>
  );
}