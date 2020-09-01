import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

type InputFormProps = {
  name: string;
};

type Props = InputFormProps & TextInputProps;

const InputForm: React.FC<Props> = ({ name, ...rest }) => {
  const inputRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      clearValue: (ref: any) => {
        ref.value = '';
        ref.clear();
      },
      setValue: (ref: any, value: any) => {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue: (ref: any) => {        
        return ref.value;
      },
    });
  }, [fieldName, registerField]);
  return (
    <TextInput
      ref={inputRef}
      defaultValue={defaultValue}
      onChangeText={(value) => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      }}
      {...rest}
    />
  );
};
export default InputForm;
