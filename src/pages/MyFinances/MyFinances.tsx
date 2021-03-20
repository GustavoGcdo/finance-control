import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { Operation } from '../../models/operation';
import { UserExtract } from '../../models/user-extract';
import { getOperations, getUserExtract } from '../../services/finances.service';
import DialogAddOperation from './components/DialogAddOperation/DialogAddOperation';
import OperationsList from './components/OperationsList/OperationsList';
import PersonInfo from './components/PersonInfo/PersonInfo';
import './MyFinances.scss';

const userExtractInit = {} as UserExtract
const MyFinances: React.FC = () => {
  const [operationsList, setOperationsList] = useState<Operation[]>([]);
  const [userExtract, setUserExtract] = useState<UserExtract>(userExtractInit);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemSelected, setItemSelected] = useState<Operation | undefined>();

  useEffect(() => {
    getOperationsList();
    getUserExtractData();
  }, []);

  const getOperationsList = async () => {
    try {
      const result = await getOperations();
      setOperationsList(result.data.results);
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
    setItemSelected(operation);
    setOpenDialog(true);
  }

  return (
    <div className="my-finances-container">
      <div className="person-info-area">
        <PersonInfo userExtract={userExtract} />
      </div>

      <div className="operations-area">
        <div className="operation-header">
          <h2>Meus lançamentos</h2>
          <Button variant="contained" color="primary" disableElevation onClick={handleOpenDialog}>Adicionar lançamento</Button>
        </div>
        <OperationsList operationList={operationsList} onItemSelected={handleItemSelected}/>
      </div>

      <DialogAddOperation open={openDialog} onClose={handleOnCloseDialog} objectToEdit={itemSelected}/>
    </div>
  );
};

export default MyFinances;
