import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import AlertErrorMessage from '../../components/AlertErrorMessage/AlertErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import { useAuth } from '../../contexts/auth.context';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/models/result';
import { LoginDto } from '../../models/dtos/login.dto';

const Login = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = (formData: LoginDto) => {
    handleLogin(formData);
  };

  const handleLogin = async (loginDto: LoginDto) => {
    setErrorMessages([]);
    signIn(loginDto).catch((resultError) => {
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

  const handleNavigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
          {errorMessages.map((error: string, index: number) => (
            <AlertErrorMessage key={index} message={error} />
          ))}
        </View>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputForm
            name="email"
            label="E-mail"
            placeholder="E-mail"
            keyboardType="email-address"
            importantForAutofill="no"
          />

          <InputForm
            name="password"
            label="Senha"
            placeholder="Senha"
            autoCompleteType="password"
            secureTextEntry
          />

          <RectButton
            style={styles.button}
            onPress={() => formRef.current?.submitForm()}
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </RectButton>
        </Form>

        <View style={styles.divider} />

        <View style={styles.register}>
          <Text style={styles.registerText}>Não tem conta?</Text>
          <RectButton
            style={styles.registerButton}
            onPress={handleNavigateToSignup}
          >
            <Text style={styles.registerButtonText}>Registrar-se</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 26,
    alignSelf: 'flex-start',
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
  divider: {
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 0.9,
    borderColor: '#e6e6e6',
    width: '80%',
    alignSelf: 'center',
  },
  register: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  registerText: {
    fontFamily: 'Montserrat_400Regular',
    paddingVertical: 5,
    fontSize: 16,
  },
  registerButton: {
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 3,
  },
  registerButtonText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#73D762',
  },
});
