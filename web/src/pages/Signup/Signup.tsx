import Button from '@material-ui/core/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import AlertErrorMessage from '../../components/AlertErrorMessage/AlertErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import Goback from '../../components/GoBack/Goback';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/models/result';
import './Signup.scss';
import * as authService from '../../services/auth.service';
import { RouteComponentProps } from 'react-router-dom';

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const formRef = useRef<FormHandles>(null);

  const handleSignin = async (signupDto: any) => {
    try {
      await authService.signup(signupDto);
      history.goBack();
    } catch (error) {
      const resultError = error.response?.data;
      handleErrors(resultError);
    }
  };

  const handleErrors = (resultError: Result) => {
    console.log(resultError);

    if (resultError && resultError.errors) {
      const errors = resultError.errors;
      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(
        errors,
        'login'
      );
      setErrorMessages(errorMessagesServer);

      const fieldErrors = ErrorHandler.getFieldErrors(errors);
      formRef.current?.setErrors(fieldErrors);
    } else {
      setErrorMessages(['Falha no servidor']);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="header">
          <Goback />
          <span className="title">Cadastrar-se</span>
        </div>

        <Form className="signup-form" ref={formRef} onSubmit={handleSignin}>
          <InputForm name="name" label="Nome" />
          <InputForm name="email" type="email" label="E-mail" />
          <InputForm name="password" type="password" label="Senha" />
          <InputForm
            name="confirmPassword"
            type="password"
            label="Confirmação de senha"
          />
          <Button type="submit" variant="contained" color="primary">
            Cadastrar
          </Button>
        </Form>

        <div className="errors">
          {errorMessages.map((error: string, index: number) => (
            <AlertErrorMessage key={index} message={error} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signup;
