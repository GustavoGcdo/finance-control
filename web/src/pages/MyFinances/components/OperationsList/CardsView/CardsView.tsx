import { Collapse, Icon } from '@material-ui/core';
import { useState } from 'react';
import { formatCurrency } from '../../../../../infra/formatCurrency';
import { OperationType } from '../../../../../models/enums/operation-type.enum';
import { Operation } from '../../../../../models/operation';

type OperationListProps = {
  operationList: Operation[];
  onItemSelected?: (operation: Operation, action: 'edit' | 'delete' | 'execute') => void;
};

const CardsView = ({ operationList, onItemSelected }: OperationListProps) => {
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

  const handleItemSelected = (operation: Operation, action: 'edit' | 'delete' | 'execute') => {
    if (onItemSelected) {
      onItemSelected(operation, action);
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

  const getTextAction = (operation: Operation) => {
    const { type } = operation;
    return type == OperationType.RECIPE ? 'Já recebi' : 'Já paguei';
  };

  return (
    <div>
      {operationList.map((operation) => (
        <div
          className="card-item border-[1px] border-solid border-gray-300 mb-2 flex flex-col rounded bg-white"
          key={operation.id}
        >
          <div>
            {!operation.executed && (
              <div
                className="bg-orange-400 text-white  text-sm flex justify-between items-center"
                onClick={() => handleItemSelected(operation, 'execute')}
              >
                <span className="p-2 px-3">{getTextAction(operation)}</span>
              </div>
            )}
            <div className="p-3 flex items-center gap-2 justify-between">
              <div>{getIconByType(operation.type)}</div>
              <div className="self-start grow">
                <div className="flex">
                  <div className="grow">
                    {formatOperationValue(operation.value, operation.type)}
                  </div>
                  <div className="text-sm text-gray-500">{formatDateString(operation.date)}</div>
                </div>
                <div className="text-gray-400">{operation.description}</div>
              </div>
              <button
                className="uppercase bg-gray-200 text-sm cursor-pointer transition-all p-2 rounded"
                onClick={() => handleToggleDetails(operation.id)}
              >
                <Icon>{isShowingDetails(operation.id) ? 'expand_less' : 'expand_more'}</Icon>
              </button>
            </div>
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
                <span className="p-2 bg-gray-100 rounded text-lg">
                  {formatDateString(operation.date)}
                </span>
              </div>

              <div>
                <button
                  className="bg-primary w-full px-3 py-2 rounded text-white"
                  onClick={() => handleItemSelected(operation, 'edit')}
                >
                  Editar
                </button>
              </div>
              <div>
                <button
                  className="bg-red-500 w-full px-3 py-2 rounded text-white"
                  onClick={() => handleItemSelected(operation, 'delete')}
                >
                  Excluir
                </button>
              </div>
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default CardsView;
