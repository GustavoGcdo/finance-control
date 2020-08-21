import React, { useEffect, useState } from 'react';
import { getOperations } from '../../services/finances.service';
import OperationsList from './components/OperationsList/OperationsList';
import PersonInfo from './components/PersonInfo/PersonInfo';
import './MyFinances.scss';
import { Operation } from '../../models/operation';

const MyFinances: React.FC = () => {
  const [operationsList, setOperationsList] = useState<Operation[]>([]);

  useEffect(() => {
    getOperationsList();
  }, []);

  const getOperationsList = async () => {
    try {
      const result = await getOperations();
      setOperationsList(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-finances-container">
      <div className="person-info-area">
        <PersonInfo />
      </div>

      <div className="operations-area">
        <h2>Meus lançamentos</h2>
        <OperationsList operationList={operationsList} />
      </div>
    </div>
  );
};

export default MyFinances;
