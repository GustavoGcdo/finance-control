import Button from '@material-ui/core/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import AlertErrorMessage from '../../components/AlertErrorMessage/AlertErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import { useAuth } from '../../contexts/auth.context';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/models/result';
import { LoginDto } from '../../models/dtos/login.dto';
import './Login.scss';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const formRef = useRef<FormHandles>(null);

  const handleSignin = async (loginDto: LoginDto) => {
    setErrorMessages([]);
    signIn(loginDto).catch(resultError => {
      handleErrors(resultError.response?.data)
    });
  };

  const handleErrors = (resultError: Result) => {
    console.log(resultError);
    
    if (resultError.errors) {
      const errors = resultError.errors;
      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(errors, 'login');
      setErrorMessages(errorMessagesServer);

      const fieldErrors = ErrorHandler.getFieldErrors(errors);
      formRef.current?.setErrors(fieldErrors);
    } else {
      setErrorMessages(['Falha no servidor']);
    }
  };

  return (
    <div className="login-container">
      <Form ref={formRef} onSubmit={handleSignin}>
        <div className="login-card">
          <div className="header">
            <span className="title">Login</span>
          </div>
          <InputForm name="email" type="email" label="E-mail" />
          <InputForm name="password" type="password" label="Senha" />
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>

          <div className='errors'>
            {errorMessages.map((error: string, index: number) => (
              <AlertErrorMessage key={index} message={error} />
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
