import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useField } from '@unform/core';
import React, { FunctionComponent, useEffect, useState } from 'react';

interface Option {
  value: any;
  label: string;
}

interface Props {
  name: string;
  options: Option[];
  onChange?: (value: any) => {};
}

type InputProps = Props;

const RadioGroupForm: FunctionComponent<InputProps> = (props) => {
  const { fieldName, registerField, defaultValue } = useField(props.name);
  const [value, setValue] = useState(defaultValue || undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueChanged = (event.target as HTMLInputElement).value;
    setValue(valueChanged);
    
    if (props.onChange) {
      props.onChange(valueChanged);
    }
  };

  useEffect(() => {
    registerField({
      name: fieldName,      
      setValue: (ref: any, value: any) => {
        setValue(value);
      },
      getValue: () => {
        return value;
      },
    });
  }, [fieldName, registerField, value]);

  return (
    <RadioGroup
      id={props.name}      
      name={props.name}
      value={value}
      onChange={handleChange}
    >
      {props.options.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioGroupForm;
