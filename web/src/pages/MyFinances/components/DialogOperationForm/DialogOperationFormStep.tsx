import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import AlertErrorMessage from '../../../../components/AlertErrorMessage/AlertErrorMessage';
import CheckBoxForm from '../../../../components/formComponents/CheckboxForm';
import DatePickerForm from '../../../../components/formComponents/DatePickerForm';
import InputForm from '../../../../components/formComponents/InputForm';
import InputValueForm from '../../../../components/formComponents/InputValueForm';
import { useResponsive } from '../../../../hooks/useResponsive';
import { ErrorHandler } from '../../../../infra/errorHandler';
import { Result } from '../../../../infra/models/result';
import { OperationType } from '../../../../models/enums/operation-type.enum';
import { Operation } from '../../../../models/operation';
import { addOperation, updateOperation } from '../../../../services/finances.service';
import { useAppSelector } from '../../../../store';

type DialogProps = {
  operationType: OperationType;
  open: boolean;
  onClose: (confirm: boolean) => void;
  objectToEdit?: Operation;
};

const formTexts = {
  [OperationType.EXPENSE]: {
    checkBoxLabel: 'Ainda não paguei',
    categoryPlaceholder: 'Conta fixa, Comida, Lazer',
    descriptionPlaceholder: 'Fatura cartão'
  },
  [OperationType.RECIPE]: {
    checkBoxLabel: 'Ainda não recebi',
    categoryPlaceholder: 'Ex: Salário Mensal, Renda extra, Venda',
    descriptionPlaceholder: 'Venda efetuada'
  }
};

const DialogOperationForm = ({ open, onClose, operationType, objectToEdit }: DialogProps) => {
  const formRef = useRef<FormHandles>(null);
  const { isMobile } = useResponsive();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { activeDateSelected } = useAppSelector((state) => state.operations);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      formRef.current?.setFieldValue('date', activeDateSelected);
    }, 100);
  }, []);

  const handleClose = () => {
    onClose(false);
  };

  const modalTexts = () => {
    if (objectToEdit) {
      return {
        title: `Editar ${getFriendlyName().toLocaleLowerCase()}`,
        messageValor: `Qual é o novo valor da ${getFriendlyName().toLocaleLowerCase()}?`,
        saveButtonText: 'Salvar'
      };
    }

    return {
      title: `Nova ${getFriendlyName().toLocaleLowerCase()}`,
      messageValor: `Qual é o valor da ${getFriendlyName().toLocaleLowerCase()} que deseja adicionar?`,
      saveButtonText: 'Salvar'
    };
  };

  const handleConfirm = () => {
    const dataForm = formRef.current?.getData();
    handleSubmit(dataForm);
  };

  const handleSubmit = async (formData: any) => {
    setErrorMessages([]);
    const newOperation = formData as Operation;
    newOperation.type = operationType;
    newOperation.executed = !newOperation.executed;

    try {
      if (objectToEdit) {
        await updateOperation(objectToEdit.id, newOperation);
      } else {
        await addOperation(newOperation);
      }
      onClose(true);
    } catch (resultError: any) {
      handleErrors(resultError.response?.data);
    }
  };

  const handleErrors = (resultError: Result) => {
    if (resultError && resultError.errors) {
      const errors = resultError.errors;
      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(errors, 'type', 'value');
      setErrorMessages(errorMessagesServer);
      const fieldErrors = ErrorHandler.getFieldErrors(errors);
      formRef.current?.setErrors(fieldErrors);
    } else {
      setErrorMessages(['Falha no servidor']);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getFriendlyName = () => (operationType == OperationType.RECIPE ? 'Entrada' : 'Saída');
  const displayStepClass = (index: number) => (activeStep == index ? 'block' : 'hidden');

  return (
    <Dialog
      fullScreen={isMobile}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        <div className="flex justify-between items-center">
          <span className={`${operationType == 'recipe' ? 'text-primary' : 'text-red-500'}`}>
            {modalTexts().title}
          </span>
          <div
            className="p-2 rounded-full hover:bg-gray-100 transition-all cursor-pointer flex justify-center items-center"
            onClick={handleClose}
          >
            <Icon className="text-black">close</Icon>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className="flex flex-col justify-center">
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            ...objectToEdit,
            executed: objectToEdit ? !objectToEdit?.executed : false
          }}
        >
          <div className={`${displayStepClass(1)}`}>
            <div className="flex flex-col gap-6">
              <div className="mb-4">
                <span className="block text-lg font-medium ">{modalTexts().messageValor}</span>
              </div>
              <InputValueForm name="value" autoFocus />

              <div className=" border-gray-300 border-2 px-3 border-solid rounded">
                <CheckBoxForm name="executed" label={formTexts[operationType].checkBoxLabel} />
              </div>
            </div>
          </div>

          <div className={`${displayStepClass(2)}`}>
            <div className="flex flex-col gap-6">
              <div className="mb-4">
                <span className="text-sm">(Opcional)</span>
                <span className="flex flex-col text-lg font-medium ">
                  Agora adicione mais alguns detalhes para poder gerenciar melhor sua renda:
                </span>
              </div>

              <InputForm name="description" label="Descrição" />
              <InputForm
                name="category"
                label="Categoria"
                placeholder="Ex: Salário, Renda extra, Venda"
              />
              <DatePickerForm name="date" label="Data" />
            </div>
          </div>
        </Form>

        <div className="mt-4">
          {errorMessages.map((error: string, index: number) => (
            <AlertErrorMessage key={index} message={error} />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <div className="p-2 flex gap-5">
          {activeStep > 1 && (
            <Button onClick={handlePrevious} color="default">
              Voltar
            </Button>
          )}
          {activeStep < 2 && (
            <Button onClick={handleNext} color="primary">
              Proximo
            </Button>
          )}

          {activeStep == 2 && (
            <Button onClick={handleConfirm} color="primary">
              Salvar
            </Button>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DialogOperationForm;
