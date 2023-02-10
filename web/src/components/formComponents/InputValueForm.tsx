import { useField } from '@unform/core';
import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

interface Props {
  name: string;
  label?: string;  
}
type InputValueProps = Props &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'type'>;

const InputValueForm = ({ name, label, ...rest }: InputValueProps) => {
  const { fieldName, defaultValue = '', clearError, registerField, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return value;
      },
      setValue: (ref: any, value: any) => {
        setValue(value);
      }
    });
  }, [fieldName, registerField, value]);

  const handleChange = (value: any) => {
    setValue(value);
    clearError();
  };

  return (
    <div className="flex flex-col">
      <NumberFormat
        {...rest}
        className="outline-none py-2 px-3 border-b-[1px] border-solid font-medium border-gray-400 text-xl"
        placeholder="R$ 0,00"
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        isNumericString
        prefix="R$ "
        value={value}        
        onValueChange={(formatValue) => handleChange(formatValue.value)}
      />
      {error && <span className="text-sm text-red-400 px-1 mt-1">{error}</span>}
    </div>
  );
};

export default InputValueForm;
