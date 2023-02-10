import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { useField } from '@unform/core';
import { useEffect, useRef, useState } from 'react';

const CustomCheckBox = withStyles({
  root: {
    padding: 3,
  },
})(Checkbox);

const LabelCheckBox = withStyles({
  root: {
    margin: 0,
    height: '100%',
  },
  label: {
    fontSize: 13,
    marginLeft: 5,
  },
})(FormControlLabel);

interface Props {
  name: string;
  label?: string;
}

type InputProps = Props & CheckboxProps;

const CheckBoxForm = ({ name, label }: InputProps) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = false, registerField } = useField(name);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: any) => {
    setValue(event.target.checked);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
      setValue: (ref: any, value: any) => {
        setValue(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <LabelCheckBox
      control={
        <CustomCheckBox id={name} inputRef={inputRef} checked={value} onChange={handleChange} />
      }
      className="p-2 w-full"
      defaultValue={defaultValue}
      label={label}
    />
  );
};

export default CheckBoxForm;
