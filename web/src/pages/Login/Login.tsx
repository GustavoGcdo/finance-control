import Button from '@material-ui/core/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertErrorMessage from '../../components/AlertErrorMessage/AlertErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import { useAuth } from '../../contexts/auth.context';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/models/result';
import { LoginDto } from '../../models/dtos/login.dto';
import { signupRoute } from '../../constants/routes.constants';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const formRef = useRef<FormHandles>(null);

  const handleSignin = async (loginDto: LoginDto) => {
    setErrorMessages([]);
    signIn(loginDto)  
      .catch((resultError) => {
        handleErrors(resultError.response?.data);
      });
  };

  const handleErrors = (resultError: Result) => {
    console.log(resultError);

    if (resultError && resultError.errors) {
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
    <div className="h-screen w-screen flex flex-col bg-dark-primary items-center justify-center">
      <div className="p-7 bg-white flex flex-col rounded min-w-[350px]">
        <div className="mb-9">
          <span className="font-medium">Login</span>
        </div>

        <Form className="flex flex-col items-end gap-4" ref={formRef} onSubmit={handleSignin}>
          <InputForm name="email" type="email" label="E-mail" />
          <InputForm name="password" type="password" label="Senha" />
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Form>

        <hr className="h-[1px] my-5 block bg-gray-300" />

        <span className="text-sm self-center">
          Não tem uma conta?
          <Link to={signupRoute} className="cursor-pointer no-underline font-bold ml-1 text-primary">
            <span>Registre-se</span>
          </Link>
        </span>

        <div className="mt-3">
          {errorMessages.map((error: string, index: number) => (
            <AlertErrorMessage key={index} message={error} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
