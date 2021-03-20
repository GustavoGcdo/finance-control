import Icon from '@material-ui/core/Icon';
import React from 'react';
import { formatCurrency } from '../../../../infra/formatCurrency';
import { OperationType } from '../../../../models/enums/operation-type.enum';
import { Operation } from '../../../../models/operation';
import './OperationsList.scss';

type OperationListProps = {
  operationList: Operation[];
  onItemSelected?: (operation: Operation) => void
};

const OperationsList: React.FC<OperationListProps> = ({ operationList, onItemSelected }) => {
  
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
    const formatedValue = `${
      type === OperationType.EXPENSE ? '-' : ''
    } ${formatCurrency(value)}`;
    return formatedValue;
  };

  const handleItemSelected = (operation: Operation) => {
    if(onItemSelected) {
      onItemSelected(operation);
    }
  }

  return (
    <div className="operations-list-container">
      <table className="table-operations">
        <thead>
          <tr>
            <th></th>
            <th className="description">Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {operationList.map((operation) => (
            <tr key={operation._id} onClick={() => handleItemSelected(operation)}>
              <td className="operation">{getIconByType(operation.type)}</td>
              <td className="description">{operation.description}</td>
              <td>{formatOperationValue(operation.value, operation.type)}</td>
              <td>{operation.category}</td>
              <td>{formatDateString(operation.date)}</td>
            </tr>
          ))}

          {operationList.length === 0 && (
            <tr>
              <td className="not-results" colSpan={5}>
                Ops.. não há lançamentos aqui
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OperationsList;
