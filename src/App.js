import React, { useState, useEffect } from 'react';
import FormulaSelector from './FormulaSelector';
import FormulaForm from './FormulaForm';
import { getInput } from './mockData';

const options = [
  { value: 'input1', label: 'Input 1' },
  { value: 'input2', label: 'Input 2' },
  { value: 'input3', label: 'Input 3' }
];

async function fetchInputFormData(id, setFormulas) {
  const response = await getInput(id);
  setFormulas(response);
}

export default function App() {
  const [inputOption, setInputOption] = useState(options[0]);
  const [formulas, setFormulas] = useState([]);

  useEffect(() => {
    fetchInputFormData(inputOption.value, setFormulas);
  }, [inputOption])

  return (
    <React.Fragment>
      <FormulaSelector
        inputOption={inputOption}
        setInputOption={setInputOption}
        options={options}
      />
      <FormulaForm
        formulas={formulas}
      />
    </React.Fragment>
  );
}
