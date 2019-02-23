import React, { useCallback } from 'react';
import { css } from 'emotion';
import Select from 'react-select';

const inputWrapper = css`
  width: 30%;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

export default function FormulaSelector(props) {
  const { setInputOption, inputOption, options } = props;

  const handleChange = useCallback((selectedOption) => {
    setInputOption(selectedOption);
  }, [inputOption]);

  return (
    <div className={inputWrapper}>
      <Select
        value={inputOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}