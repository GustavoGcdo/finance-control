import React, { FunctionComponent } from 'react';
import NumberFormat from 'react-number-format';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

const MaskCurrency: FunctionComponent<NumberFormatCustomProps> = (
  props: NumberFormatCustomProps,
) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      fixedDecimalScale
      decimalScale={2}
      isNumericString
      prefix="R$ "
    />
  );
};

export default MaskCurrency;
