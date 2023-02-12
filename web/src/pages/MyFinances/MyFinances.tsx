import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { DEFAULT_LIMIT } from '../../constants/paginate.constants';
import { Operation } from '../../models/operation';
import { useAppDispatch } from '../../store';
import { getOperationsAction } from '../../store/operations/Operation.actions';
import { getUserExtractAction } from '../../store/person/Person.actions';
import DialogAddOperation from './components/DialogAddOperation/DialogAddOperation';
import OperationsList from './components/OperationsList/OperationsList';
import PersonInfo from './components/PersonInfo/PersonInfo';
import { useAppSelector } from '../../store/index';
import { deleteOperation } from '../../services/finances.service';
import ConfirmDialog from '../../components/DialogConfirmation/DialogConfirmation';
import PagintateMonth from './components/PaginateMonth/PagintateMonth';
import { setActiveDate } from '../../store/operations/Operations.store';

const MyFinances = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemSelected, setItemSelected] = useState<Operation | undefined>();
  const { paginateOperations, activeDateSelected } = useAppSelector((state) => state.operations);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    updateOperations();
    updateUserExtract();
  }, []);

  useEffect(() => {
    updateOperations();
  }, [activeDateSelected]);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleOnCloseDialog = (confirm: Boolean) => {
    setOpenEditDialog(false);
    if (confirm) {
      updateOperations();
      updateUserExtract();
    }
    setItemSelected(undefined);
  };

  const handleItemSelected = (operation: Operation, action: 'edit' | 'delete') => {
    setItemSelected(operation);
    if (action == 'edit') {
      setOpenEditDialog(true);
    } else {
      setOpenConfirmDialog(true);
    }
  };

  const handleConfirmDialog = async (confirm: boolean) => {
    if (confirm && itemSelected) {
      await deleteOperation(itemSelected.id);
      setItemSelected(undefined);
      updateOperations();
      updateUserExtract();
    }
    setOpenConfirmDialog(false);
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
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleOpenEditDialog}
          >
            Adicionar lançamento
          </Button>
        </div>

        <PagintateMonth onChange={handleMonthChanged} />

        <OperationsList
          operationList={paginateOperations.results}
          onItemSelected={handleItemSelected}
        />
      </div>

      {openEditDialog && (
        <DialogAddOperation
          open={openEditDialog}
          onClose={handleOnCloseDialog}
          objectToEdit={itemSelected}
        />
      )}

      <ConfirmDialog open={openConfirmDialog} onClose={handleConfirmDialog} />
    </div>
  );
};

export default MyFinances;
