import { useEffect, useState } from 'react';
import ConfirmDialog from '../../components/DialogConfirmation/DialogConfirmation';
import { OperationType } from '../../models/enums/operation-type.enum';
import { Operation } from '../../models/operation';
import { deleteOperation, updateOperation } from '../../services/finances.service';
import { useAppDispatch } from '../../store';
import { useAppSelector } from '../../store/index';
import { getOperationsAction } from '../../store/operations/Operation.actions';
import { setActiveDate } from '../../store/operations/Operations.store';
import { getUserExtractAction } from '../../store/person/Person.actions';
import DialogOperationForm from './components/DialogOperationForm/DialogOperationFormStep';
import OperationsList from './components/OperationsList/OperationsList';
import PagintateMonth from './components/PaginateMonth/PagintateMonth';
import PersonInfo from './components/PersonInfo/PersonInfo';

const MyFinances = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'delete' | 'execute' | undefined;
  }>({ open: false, action: undefined });

  const [itemSelected, setItemSelected] = useState<Operation | undefined>();
  const [operationTypeSelected, setOperationTypeSelected] = useState<OperationType>(
    OperationType.EXPENSE
  );
  const { paginateOperations, activeDateSelected } = useAppSelector((state) => state.operations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    updateOperations();
    updateUserExtract();
  }, []);

  useEffect(() => {
    updateOperations();
  }, [activeDateSelected]);

  const handleOpenEditDialog = (type: OperationType) => {
    setOpenEditDialog(true);
    setOperationTypeSelected(type);
  };

  const handleOnCloseDialog = (confirm: Boolean) => {
    setOpenEditDialog(false);
    if (confirm) {
      updateOperations();
      updateUserExtract();
    }
    setItemSelected(undefined);
  };

  const handleItemSelected = (operation: Operation, action: 'edit' | 'delete' | 'execute') => {
    setItemSelected(operation);
    setOperationTypeSelected(operation.type);
    if (action == 'edit') {
      setOpenEditDialog(true);
    } else {
      setConfirmDialog({ open: true, action });
    }
  };

  const handleConfirmDialog = async (confirm: boolean) => {
    if (confirm && itemSelected) {
      if (confirmDialog.action == 'delete') {
        await deleteOperation(itemSelected.id);
      } else {
        await updateOperation(itemSelected.id, { executed: true } as Operation);
      }

      setItemSelected(undefined);
      updateOperations();
      updateUserExtract();
    }
    setConfirmDialog({ open: false, action: undefined });
  };

  const updateUserExtract = () => {
    dispatch(getUserExtractAction());
  };

  const updateOperations = () => {
    dispatch(getOperationsAction(new Date(activeDateSelected)));
  };

  const handleMonthChanged = (dateSelected: Date) => {
    dispatch(setActiveDate(dateSelected.toJSON()));
  };

  return (
    <div>
      <div className="mt-6">
        <PersonInfo />
      </div>

      <div>
        <div className="bg-white flex items-center my-7 p-4 flex-wrap justify-center gap-5 sm:justify-between">
          <h2>Meus lançamentos</h2>
          <div className="flex gap-4">
            <button
              className="px-3 py-2 text-white font-medium bg-primary rounded"
              onClick={() => handleOpenEditDialog(OperationType.RECIPE)}
            >
              Nova entrada
            </button>
            <button
              className="px-3 py-2 text-white font-medium bg-red-500 rounded"
              onClick={() => handleOpenEditDialog(OperationType.EXPENSE)}
            >
              Nova saída
            </button>
          </div>
        </div>

        <PagintateMonth onChange={handleMonthChanged} />

        <OperationsList
          operationList={paginateOperations.results}
          onItemSelected={handleItemSelected}
        />
      </div>

      {openEditDialog && (
        <DialogOperationForm
          open={openEditDialog}
          operationType={operationTypeSelected}
          onClose={handleOnCloseDialog}
          objectToEdit={itemSelected}
        />
      )}

      <ConfirmDialog open={confirmDialog.open} onClose={handleConfirmDialog} />
    </div>
  );
};

export default MyFinances;
