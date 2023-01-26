import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { DEFAULT_LIMIT } from '../../constants/paginate.constants';
import { Operation } from '../../models/operation';
import { UserExtract } from '../../models/user-extract';
import { getOperations, getUserExtract } from '../../services/finances.service';
import { PaginateResult } from '../../types/PaginateResult';
import DialogAddOperation from './components/DialogAddOperation/DialogAddOperation';
import OperationsList from './components/OperationsList/OperationsList';
import PersonInfo from './components/PersonInfo/PersonInfo';
// import './MyFinances.scss';

const userExtractInit = {} as UserExtract;

const MyFinances: React.FC = () => {
  const [paginateResult, setPaginateResult] = useState<PaginateResult<Operation> | undefined>();
  const [userExtract, setUserExtract] = useState<UserExtract>(userExtractInit);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemSelected, setItemSelected] = useState<Operation | undefined>();

  useEffect(() => {
    getOperationsList();
    getUserExtractData();
  }, []);

  const getOperationsList = async (page?: number) => {
    try {
      const result = await getOperations(page);
      setPaginateResult(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserExtractData = async () => {
    try {
      const result = await getUserExtract();
      setUserExtract(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOnCloseDialog = (confirm: Boolean) => {
    setOpenDialog(false);
    if (confirm) {
      getOperationsList();
      getUserExtractData();
    }

    setItemSelected(undefined);
  };

  const handleItemSelected = (operation: Operation) => {
    setOpenDialog(true);
    setItemSelected(operation);
  };

  const showModal = () => {
    return (
      <DialogAddOperation
        open={openDialog}
        onClose={handleOnCloseDialog}
        objectToEdit={itemSelected}
      />
    );
  };

  const handleChangePage = (page: number) => {
    getOperationsList(page);
  };

  return (
    <div>
      <div className="mt-6">
        <PersonInfo userExtract={userExtract} />
      </div>

      <div>
        <div className="bg-white flex items-center my-7 p-4 flex-wrap justify-center gap-5 sm:justify-between">
          <h2>Meus lançamentos</h2>
          <Button variant="contained" color="primary" disableElevation onClick={handleOpenDialog}>
            Adicionar lançamento
          </Button>
        </div>
        <OperationsList
          operationList={paginateResult?.results}
          onItemSelected={handleItemSelected}
        />

        <Pagination
          totalItems={paginateResult?.total}
          onChangePage={handleChangePage}
          pageSize={DEFAULT_LIMIT}
        />
      </div>

      {openDialog && showModal()}
    </div>
  );
};

export default MyFinances;
