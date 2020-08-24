import React, { useEffect, useState } from 'react';
import { Operation } from '../../models/operation';
import { UserExtract } from '../../models/user-extract';
import { getOperations, getUserExtract } from '../../services/finances.service';
import OperationsList from './components/OperationsList/OperationsList';
import PersonInfo from './components/PersonInfo/PersonInfo';
import './MyFinances.scss';

const MyFinances: React.FC = () => {
  const [operationsList, setOperationsList] = useState<Operation[]>([]);
  const [userExtract, setUserExtract] = useState<UserExtract>({} as UserExtract);

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

  return (
    <div className="my-finances-container">
      <div className="person-info-area">
        <PersonInfo userExtract={userExtract} />
      </div>

      <div className="operations-area">
        <h2>Meus lançamentos</h2>
        <OperationsList operationList={operationsList} />
      </div>
    </div>
  );
};

export default MyFinances;
