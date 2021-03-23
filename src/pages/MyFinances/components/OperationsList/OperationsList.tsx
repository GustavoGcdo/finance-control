import React from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';
import { Operation } from '../../../../models/operation';
import CardsView from './CardsView/CardsView';
import './OperationsList.scss';
import TableView from './TableView/TableView';

type OperationListProps = {
  operationList: Operation[];
  onItemSelected?: (operation: Operation) => void;
};

const OperationsList: React.FC<OperationListProps> = ({ operationList, onItemSelected }) => {
  const { isMobile } = useResponsive();

  const renderViewList = () => {
    if (isMobile) {
      return <CardsView operationList={operationList} onItemSelected={onItemSelected} />;
    }

    return <TableView operationList={operationList} onItemSelected={onItemSelected} />;
  };

  return (
    <div className="operations-list-container">
      {renderViewList()}

      {operationList.length === 0 && (
        <div className="not-results">Ops.. não há lançamentos aqui</div>
      )}
    </div>
  );
};

export default OperationsList;
