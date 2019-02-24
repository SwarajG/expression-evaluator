import React, { useState, useEffect, useCallback } from 'react';
import FormulaSelector from './FormulaSelector';
import FormulaForm from './FormulaForm';
import { getInput, postDataToServer } from './mockData';

const options = [
  { value: 'input1', label: 'Input 1' },
  { value: 'input2', label: 'Input 2' },
  { value: 'input3', label: 'Input 3' }
];

async function fetchInputFormData(id, setFormulas) {
  const response = await getInput(id);
  setFormulas(response);
}

async function postAnswers(data) {
  const hasAllAnswer = data.every(answer => !!answer.result);
  if (hasAllAnswer) {
    await postDataToServer(data);
    alert('Submitted the responses...');
  } else {
    alert('Evluate all the responses first...');
  }
}

export default function App() {
  const emptyResponses = options.map((option) => ({
    id: option.value
  }));

  const [formData, setFormData] = useState(emptyResponses);
  const [inputOption, setInputOption] = useState(options[0]);
  const [formulas, setFormulas] = useState([]);

  useEffect(() => {
    fetchInputFormData(inputOption.value, setFormulas);
  }, [inputOption])

  const submitForm = useCallback(() => {
    const selectedAnswers = formData.find(data => data.id === inputOption.value);
    if (selectedAnswers.answers) {
      let answers = [];
      const objectSize = Object.keys(selectedAnswers.answers).length;
      if (objectSize === formulas.length) {
        for (let i = 0; i < objectSize; i++) {
          answers[i] = null;
        }
        const answersList = Object.values(selectedAnswers.answers)
        .map((value, index) => selectedAnswers.answers[index]);
        postAnswers(answersList);
      } else {
        alert('Evluate all the responses first...');
      }
    } else {
      alert('Evluate all the responses first...');
    }
  });

  return (
    <React.Fragment>
      <FormulaSelector
        inputOption={inputOption}
        setInputOption={setInputOption}
        options={options}
      />
      <button onClick={submitForm}>
        Submit
      </button>
      <FormulaForm
        formulas={formulas}
        selectedFormId={inputOption.value}
        formData={formData}
        setFormData={setFormData}
      />
    </React.Fragment>
  );
}
