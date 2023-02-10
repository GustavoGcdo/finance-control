import { TextField } from '@material-ui/core';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import MaskCurrency from './masks/MaskCurrency';

interface InputMaskProps {
  name: string;
  label?: string;
  typeMask: TypeMasks;
}

type TypeMasks = 'currency';

const InputMaskForm = ({ name, label, typeMask }: InputMaskProps) => {
  const { isMobile } = useResponsive();
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,      
      getValue: () => {
        return value;
      },
      setValue: (ref: any, value: any) => {
        setValue(value);
      },
    });
  }, [fieldName, registerField, value]);

  const handleChange = (event: any) => {
    const newValue = event.target.value;    
    setValue(newValue);
  };

  const getMask = (type?: TypeMasks) => {
    switch (type) {    
      case 'currency':
        return MaskCurrency;
      default:
        return <input />;
    }
  };

  return (
    <TextField
      label={label}
      id={name}
      className="input-form"
      size={isMobile ? 'medium' : 'small'}
      variant="outlined"
      value={value}
      onChange={handleChange}
      error={error != null}
      helperText={error}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputComponent: getMask(typeMask) as any,
      }}
    />
  );
};

export default InputMaskForm;
