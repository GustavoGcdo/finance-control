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

const MyFinances = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [itemSelected, setItemSelected] = useState<Operation | undefined>();
  const dispatch = useAppDispatch();
  const operations = useAppSelector((state) => state.operations);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    updateOperations();
    updateUserExtract();
  }, []);

  useEffect(() => {
    updateOperations();
  }, [activePage]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOnCloseDialog = (confirm: Boolean) => {
    setOpenDialog(false);
    if (confirm) {
      updateOperations();
      updateUserExtract();
    }
    setItemSelected(undefined);
  };

  const handleItemSelected = (operation: Operation) => {
    setOpenDialog(true);
    setItemSelected(operation);
  };

  const updateUserExtract = () => {
    dispatch(getUserExtractAction());
  };

  const updateOperations = () => {
    dispatch(getOperationsAction(activePage));
  };

  const handlePageChanged = (page: number) => {
    setActivePage(page);
  };

  return (
    <div>
      <div className="mt-6">
        <PersonInfo />
      </div>

      <div>
        <div className="bg-white flex items-center my-7 p-4 flex-wrap justify-center gap-5 sm:justify-between">
          <h2>Meus lançamentos</h2>
          <Button variant="contained" color="primary" disableElevation onClick={handleOpenDialog}>
            Adicionar lançamento
          </Button>
        </div>
        <OperationsList
          operationList={operations.paginateOperations.results}
          onItemSelected={handleItemSelected}
        />

        <Pagination
          currentPage={activePage}
          totalItems={operations.paginateOperations.total}
          onChangePage={handlePageChanged}
          pageSize={DEFAULT_LIMIT}
        />
      </div>

      {openDialog && (
        <DialogAddOperation
          open={openDialog}
          onClose={handleOnCloseDialog}
          objectToEdit={itemSelected}
        />
      )}
    </div>
  );
};

export default MyFinances;
