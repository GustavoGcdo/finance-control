import React from 'react';
import OperationsList from './components/OperationsList/OperationsList';
import PersonInfo from './components/PersonInfo/PersonInfo';

const MyFinances: React.FC = () => {
  return (
    <div className="my-finances-container">
      <PersonInfo />      
      <OperationsList />
    </div>
  );
};

export default MyFinances;
