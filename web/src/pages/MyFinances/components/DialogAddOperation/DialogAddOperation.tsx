import { Icon } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
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

type DialogProps = {
  open: boolean;
  onClose: (confirm: boolean) => void;
  objectToEdit?: Operation;
};

const DialogAddOperation: React.FC<DialogProps> = ({ open, onClose, objectToEdit }) => {
  const formRef = useRef<FormHandles>(null);  
  const { isMobile } = useResponsive();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [operationSelected, setOperationSelected] = useState(OperationType.EXPENSE);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    if (objectToEdit?.type) {
      setOperationSelected(objectToEdit?.type as OperationType);
    }
  }, [objectToEdit]);

  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    const dataForm = formRef.current?.getData();
    handleSubmit(dataForm);
  };

  const handleSubmit = async (formData: any) => {
    setErrorMessages([]);
    const newOperation = formData as Operation;
    newOperation.type = operationSelected;

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
      const errorMessagesServer = ErrorHandler.getErrorMessagesByName(errors, 'type');
      setErrorMessages(errorMessagesServer);
      const fieldErrors = ErrorHandler.getFieldErrors(errors);
      formRef.current?.setErrors(fieldErrors);
    } else {
      setErrorMessages(['Falha no servidor']);
    }
  };

  const handleClickOperationType = (type: OperationType) => {
    setOperationSelected(type);
  };

  return (
    <Dialog
      fullScreen={isMobile}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        {objectToEdit ? 'Alterar' : 'Adicionar'} lançamento
      </DialogTitle>
      <DialogContent className="flex flex-col justify-center">
        <Form ref={formRef} onSubmit={handleSubmit} initialData={objectToEdit}>
          <div className="flex flex-col gap-4">
            <div className="mb-1">
              <InputValueForm name="value" autoFocus />
            </div>

            <div className=' border-gray-300 border-2 border-solid rounded'>
              <CheckBoxForm name="executed" label="Já está pago?" />
            </div>

            <div
              className="flex gap-2 justify-center cursor-pointer bg-gray-200 py-2 rounded items-center"
              onClick={() => setOpenDetails((open) => !open)}
            >
              <span>Adicionar detalhes</span>
              <Icon>{openDetails ? 'expand_less' : 'expand_more'}</Icon>
            </div>
            <Collapse in={openDetails} timeout="auto">
              <div className="flex flex-col gap-4">
                <InputForm name="description" label="Descrição" />
                <InputForm name="category" label="Categoria" />
                {/* <InputMaskForm name="value" label="Valor" typeMask="currency" /> */}
                <DatePickerForm name="date" label="Data" />
              </div>
            </Collapse>

            <div className="flex w-full gap-2 justify-between text-center ">
              <div
                onClick={() => handleClickOperationType(OperationType.RECIPE)}
                className={`bg-primary p-3 rounded w-full font-medium cursor-pointer border-solid border-2 ${
                  operationSelected == OperationType.RECIPE
                    ? 'bg-primary text-white border-transparent'
                    : 'bg-white text-primary border-primary'
                }`}
              >
                Entrada
              </div>
              <div
                onClick={() => handleClickOperationType(OperationType.EXPENSE)}
                className={`p-3 rounded w-full font-medium cursor-pointer border-solid border-2 ${
                  operationSelected == OperationType.EXPENSE
                    ? 'bg-red-500 text-white border-transparent'
                    : 'bg-white text-red-500 border-red-500'
                }`}
              >
                Saída
              </div>
            </div>
          </div>
        </Form>

        {errorMessages.map((error: string, index: number) => (
          <AlertErrorMessage key={index} message={error} />
        ))}

        {/* <div className='mt-4 flex bg-primary items-center justify-center'>
          <Button onClick={handleConfirm} variant="contained" disableElevation color="primary">
            {objectToEdit ? 'Salvar' : 'Cadastrar'}
          </Button>
        </div> */}
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose} color="default">
          Cancelar
        </Button> */}
        <div className="flex flex-col gap-2 w-full py-1">
          <div
            className="w-full uppercase text-center font-bold py-3 cursor-pointer text-primary hover:bg-gray-100 transition-all"
            onClick={handleConfirm}
          >
            <span className="block">{objectToEdit ? 'Salvar' : 'Cadastrar'}</span>
          </div>
          <div
            className="w-full uppercase text-center text-red-500 font-bold py-3 cursor-pointer hover:bg-gray-100 transition-all"
            onClick={handleClose}
          >
            <span className="block">Cancelar</span>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddOperation;
