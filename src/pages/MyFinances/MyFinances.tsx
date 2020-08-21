import React from 'react';
import OperationsList from './components/OperationsList/OperationsList';
import PersonInfo from './components/PersonInfo/PersonInfo';
import './MyFinances.scss';

const MyFinances: React.FC = () => {
  return (
    <div className="my-finances-container">
      <div className="person-info-area">
        <PersonInfo />
      </div>

      <div className="operations-area">
        <h2>Meus lançamentos</h2>
        <OperationsList />
      </div>
    </div>
  );
};

export default MyFinances;
