import React from 'react';
import './OperationsList.scss';
import Icon from '@material-ui/core/Icon';
import { Operation } from '../../../../models/operation';
import { OperationType } from '../../../../models/enums/operation-type.enum';
import { formatCurrency } from '../../../../infra/formatCurrency';

type OperationListProps = {
  operationList: Operation[];
};

const OperationsList: React.FC<OperationListProps> = ({ operationList }) => {
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
            <tr key={operation._id}>
              <td className="operation">{getIconByType(operation.type)}</td>
              <td className="description">{operation.description}</td>
              <td>{formatOperationValue(operation.value, operation.type)}</td>
              <td>{operation.category}</td>
              <td>{formatDateString(operation.date)}</td>
            </tr>
          ))}

          {operationList.length === 0 && (
            <td className="not-results" colSpan={5}>
              Ops.. não há lançamentos aqui
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OperationsList;
