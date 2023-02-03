import { Icon } from '@material-ui/core';
import React from 'react';
import { formatCurrency } from '../../../../../infra/formatCurrency';
import { OperationType } from '../../../../../models/enums/operation-type.enum';
import { Operation } from '../../../../../models/operation';

type OperationListProps = {
  operationList: Operation[];
  onItemSelected?: (operation: Operation, action: 'edit' | 'delete') => void;
};

const TableView: React.FC<OperationListProps> = ({ operationList, onItemSelected }) => {
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

  const handleItemSelected = (operation: Operation, action: 'edit' | 'delete') => {
    if (onItemSelected) {
      onItemSelected(operation, action);
    }
  };

  return (
    <table className="w-full text-center">
      <thead>
        <tr className="text-gray-500 font-semibold text-sm">
          <th></th>
          <th className="p-2 text-left">Descrição</th>
          <th className="p-2">Valor</th>
          <th className="p-2">Categoria</th>
          <th className="p-2">Data</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {operationList.map((operation) => (
          <tr
            className="group text-sm bg-white transition-all hover:bg-primary-hover"
            key={operation.id}
          >
            <td className="p-1 align-middle group-first:rounded-tl-lg group-last:rounded-bl-lg">
              {getIconByType(operation.type)}
            </td>
            <td className="p-2 text-left">{operation.description}</td>
            <td className="p-4">{formatOperationValue(operation.value, operation.type)}</td>
            <td className="p-4">{operation.category}</td>
            <td className="p-4">{formatDateString(operation.date)}</td>
            <td className="group-first:rounded-tr-lg group-last:rounded-br-lg transition-all ">
              <div className="flex items-center justify-center gap-3">
                <div
                  className="px-2 py-1 rounded block hover:bg-red-500  hover:text-white cursor-pointer"
                  onClick={() => handleItemSelected(operation, 'delete')}
                >
                  <Icon>delete</Icon>
                </div>
                <div
                  className="px-2 py-1 rounded block hover:bg-primary hover:text-white cursor-pointer"
                  onClick={() => handleItemSelected(operation, 'edit')}
                >
                  <Icon>edit</Icon>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
