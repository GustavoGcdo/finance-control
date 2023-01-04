import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

type InputFormProps = {
  name: string;
  label?: string;
};

type Props = InputFormProps & TextInputProps;

const InputForm: React.FC<Props> = ({ name, label, ...rest }) => {
  const inputRef = useRef<any>(null);
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

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
    <>
      <TextInput
        ref={inputRef}
        mode="outlined"
        label={label}
        style={styles.input}
        error={!!error}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          clearError();
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />

      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
};
export default InputForm;

const styles = StyleSheet.create({  
  input: {
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
    fontFamily: 'Montserrat_400Regular',
    marginVertical: 0,
  },
});
