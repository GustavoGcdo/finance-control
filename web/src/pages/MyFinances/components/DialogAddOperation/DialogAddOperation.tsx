import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import AlertErrorMessage from '../../../../components/AlertErrorMessage/AlertErrorMessage';
import CheckBoxForm from '../../../../components/formComponents/CheckboxForm';
import DatePickerForm from '../../../../components/formComponents/DatePickerForm';
import InputForm from '../../../../components/formComponents/InputForm';
import InputMaskForm from '../../../../components/formComponents/InputMaskForm';
import RadioGroupForm from '../../../../components/formComponents/RadioGroupForm';
import { ErrorHandler } from '../../../../infra/errorHandler';
import { Result } from '../../../../infra/models/result';
import { OperationType } from '../../../../models/enums/operation-type.enum';
import { Operation } from '../../../../models/operation';
import { addOperation, updateOperation } from '../../../../services/finances.service';
import './DialogAddOperation.scss';

type DialogProps = {
  open: boolean;
  onClose: (confirm: boolean) => void;
  objectToEdit?: Operation;
};

const DialogAddOperation: React.FC<DialogProps> = ({ open, onClose, objectToEdit }) => {
  const formRef = useRef<FormHandles>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    const dataForm = formRef.current?.getData();
    handleSubmit(dataForm);
  };

  const handleSubmit = (formData: any) => {
    setErrorMessages([]);
    const newOperation = formData;

    if (objectToEdit) {
      updateOperation(objectToEdit._id, newOperation)
        .then((result) => {
          onClose(true);
          console.log('result deu bom', result);
        })
        .catch((resultError) => {
          handleErrors(resultError.response?.data);
        });
    } else {
      addOperation(newOperation)
        .then((result) => {
          onClose(true);
          console.log('result deu bom', result);
        })
        .catch((resultError) => {
          handleErrors(resultError.response?.data);
        });
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

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        {objectToEdit ? 'Alterar' : 'Adicionar'} lançamento
      </DialogTitle>
      <DialogContent>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={objectToEdit}>
          <div className="form-add-operation">
            <RadioGroupForm
              name="type"
              options={[
                { value: OperationType.EXPENSE, label: 'Saída' },
                { value: OperationType.RECIPE, label: 'Entrada' }
              ]}
            />
            <InputForm name="description" label="Descrição" />
            <InputForm name="category" label="Categoria" />
            <InputMaskForm name="value" label="Valor" typeMask="currency" />
            <DatePickerForm name="date" label="Data" />
            <CheckBoxForm name="executed" label="Já está pago?" />
          </div>
        </Form>

        {errorMessages.map((error: string, index: number) => (
          <AlertErrorMessage key={index} message={error} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {objectToEdit ? 'Salvar' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddOperation;
