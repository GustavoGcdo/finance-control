import Button from '@material-ui/core/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertErrorMessage from '../../components/AlertErrorMessage/AlertErrorMessage';
import InputForm from '../../components/formComponents/InputForm';
import Goback from '../../components/GoBack/Goback';
import { ErrorHandler } from '../../infra/errorHandler';
import { Result } from '../../infra/models/result';
import * as authService from '../../services/auth.service';

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const formRef = useRef<FormHandles>(null);

  const handleSignin = async (signupDto: any) => {
    try {
      await authService.signup(signupDto);
      navigate(-1);
    } catch (error) {
      const resultError = (error as any).response?.data;
      handleErrors(resultError);
    }
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
      <div className="px-7 py-9 bg-white flex flex-col rounded min-w-[350px]">
        <div className="mb-9 flex">
          <Goback />
          <span className="font-medium">Cadastrar-se</span>
        </div>

        <Form className="flex flex-col gap-3 items-center" ref={formRef} onSubmit={handleSignin}>
          <InputForm name="name" label="Nome" />
          <InputForm name="email" type="email" label="E-mail" />
          <InputForm name="password" type="password" label="Senha" />
          <InputForm name="confirmPassword" type="password" label="Confirmação de senha" />
          <div className='mt-5'>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </div>
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
