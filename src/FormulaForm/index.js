import React from 'react';
import { css } from 'emotion';
import FormulaEvaluator from '../FormulaEvaluator';

const allFormWrapper = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const formWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const formulaText = css`
  margin-top: 0;
  margin-bottom: 20px;
`;

export default function FormulaForm(props) {
  const { formulas } = props;
  if (formulas.length === 0) {
    return null;
  }
  return (
    <div className={allFormWrapper}>
      {formulas.map(formula => (
        <div key={formula.formula} className={formWrapper}>
          <p className={formulaText}>Formula: {formula.formula}</p>
          <FormulaEvaluator formula={formula.formula} />
        </div>
      ))}
    </div>
  )
}