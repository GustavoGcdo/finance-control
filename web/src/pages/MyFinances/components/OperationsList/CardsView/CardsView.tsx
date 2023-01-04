import { Collapse, Icon } from '@material-ui/core';
import React, { useState } from 'react';
import { formatCurrency } from '../../../../../infra/formatCurrency';
import { OperationType } from '../../../../../models/enums/operation-type.enum';
import { Operation } from '../../../../../models/operation';
import './CardsView.scss';

type OperationListProps = {
  operationList: Operation[];
  onItemSelected?: (operation: Operation) => void;
};

const CardsView: React.FC<OperationListProps> = ({ operationList, onItemSelected }) => {
  const [idShowingDetails, setIdShowingDetails] = useState<string | null>(null);

  const getIconByType = (operationType: OperationType) => {
    switch (operationType) {
      case OperationType.EXPENSE:
        return <Icon color="error">arrow_downward</Icon>;

      case OperationType.RECIPE:
        return <Icon color="primary">arrow_upward</Icon>;
    }
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString).toLocaleDateString();
    if (date === 'Invalid Date') {
      return '--/--/----';
    }
    return date;
  };

  const formatOperationValue = (value: number, type: OperationType) => {
    const formatedValue = `${type === OperationType.EXPENSE ? '-' : ''} ${formatCurrency(value)}`;
    return formatedValue;
  };

  const handleItemSelected = (operation: Operation) => {
    if (onItemSelected) {
      onItemSelected(operation);
    }
  };

  const handleToggleDetails = (operationId: string) => {
    if (operationId === idShowingDetails) {
      setIdShowingDetails(null);
    } else {
      setIdShowingDetails(operationId);
    }
  };

  const isShowingDetails = (operationId: string) => {
    return idShowingDetails === operationId;
  };

  return (
    <div>
      {operationList.map((operation) => (
        <div
          className="card-item"
          key={operation._id}          
        >
          <div className="condensed">
            <div>{getIconByType(operation.type)}</div>
            <div className="main-text">
              <div>{formatOperationValue(operation.value, operation.type)}</div>
              <div>Em: {operation.category}</div>
              </div>
            <div className="actions" onClick={() => handleToggleDetails(operation._id)}>Detalhes</div>
            <div className="actions" onClick={() => handleItemSelected(operation)}>Editar</div>           
          </div>
          <Collapse in={isShowingDetails(operation._id)} timeout="auto" unmountOnExit>
            <div className="details">
              <div className="section">
                <span className="label">Descrição:</span>
                <span className="value">{operation.description}</span>
              </div>
              <div className="section">
                <span className="label">Valor:</span>
                <span className="value">
                  {formatCurrency(operation.value)}
                </span>
              </div>
              <div className="section">
                <span className="label">Categoria:</span>
                <span className="value">{operation.category}</span>
              </div>
              <div className="section">
                <span className="label">Data:</span>
                <span className="value">{formatDateString(operation.date)}</span>
              </div>
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default CardsView;
