import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AlertErrorMessage from '../../components/AlertErrorMessage/AlertErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import { useAuth } from '../../contexts/auth.context';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/models/result';
import { LoginDto } from '../../models/dtos/login.dto';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { signup } from '../../services/auth.service';
import { SignupDto } from '../../models/dtos/signup.dto';

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = (formData: SignupDto) => {
    handleLogin(formData);
  };

  const handleLogin = async (signupDtp: SignupDto) => {
    setErrorMessages([]);
    signup(signupDtp)
      .then(() => {
        navigation.goBack();
      })
      .catch((resultError) => {
        handleErrors(resultError.response?.data);
      });
  };

  const handleErrors = (resultError: Result) => {
    if (resultError && resultError.errors) {
      const errors = resultError.errors;
      const fieldErrors = ErrorHandler.getFieldErrors(errors);
      formRef.current?.setErrors(fieldErrors);

      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(
        errors,
        'login'
      );
      setErrorMessages(errorMessagesServer);
    } else {
      setErrorMessages(['Falha ao se conectar ao servidor']);
    }
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RectButton
          style={{ padding: 5, borderRadius: 5 }}
          onPress={handleNavigateBack}
        >
          <Icon name="arrow-back" size={20} color="#73D762" />
        </RectButton>
        <Text style={styles.title}>Cadastrar-se</Text>
      </View>
      <View>
        {errorMessages.map((error: string, index: number) => (
          <AlertErrorMessage key={index} message={error} />
        ))}
      </View>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputForm name="name" label="Nome" importantForAutofill="no" />

        <InputForm
          name="email"
          label="E-mail"
          keyboardType="email-address"
          importantForAutofill="no"
        />

        <InputForm
          name="password"
          label="Senha"
          autoCompleteType="password"
          secureTextEntry
        />

        <InputForm
          name="confirmPassword"
          label="Confirmaçao de senha"
          autoCompleteType="password"
          secureTextEntry
        />

        <RectButton
          style={styles.button}
          onPress={() => formRef.current?.submitForm()}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </RectButton>
      </Form>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 28,
  },
  header: {    
    flexDirection: 'row',
    alignItems: 'center',    
    marginBottom: 26,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Montserrat_500Medium',
  },
  button: {
    backgroundColor: '#73D762',
    marginTop: 5,
    padding: 15,
    borderRadius: 3,
    alignSelf: 'flex-end',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Montserrat_500Medium',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
