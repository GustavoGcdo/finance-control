import { Collapse, Icon } from '@material-ui/core';
import React, { useState } from 'react';
import { formatCurrency } from '../../../../../infra/formatCurrency';
import { OperationType } from '../../../../../models/enums/operation-type.enum';
import { Operation } from '../../../../../models/operation';

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
      console.log(operation);
      
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
          className="card-item border-[1px] border-solid border-gray-300 mb-2 flex flex-col gap-1 rounded bg-white"
          key={operation.id}          
        >
          <div className="p-4 flex items-center gap-3 justify-between">
            <div>{getIconByType(operation.type)}</div>
            <div className="self-start grow">
              <div>{formatOperationValue(operation.value, operation.type)}</div>
              <div>Em: {operation.category}</div>
              </div>
            <div className="uppercase text-sm cursor-pointer transition-all px-2 py-1 rounded" onClick={() => handleToggleDetails(operation.id)}>Detalhes</div>
            <div className="uppercase text-sm cursor-pointer transition-all px-2 py-1 rounded" onClick={() => handleItemSelected(operation)}>Editar</div>           
          </div>
          <Collapse in={isShowingDetails(operation.id)} timeout="auto" unmountOnExit>
            <div className="p-3 flex flex-col gap-4 bg-white text-gray-600 border-t-[1px] border-gray-300 border-solid">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase">Descrição:</span>
                <span className="p-2 bg-gray-100 rounded text-lg">{operation.description}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase">Valor:</span>
                <span className="p-2 bg-gray-100 rounded text-lg">
                  {formatCurrency(operation.value)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase">Categoria:</span>
                <span className="p-2 bg-gray-100 rounded text-lg">{operation.category}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase">Data:</span>
                <span className="p-2 bg-gray-100 rounded text-lg">{formatDateString(operation.date)}</span>
              </div>
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default CardsView;
