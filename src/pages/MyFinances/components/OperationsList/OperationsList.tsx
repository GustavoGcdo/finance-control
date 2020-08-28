import React from 'react';
import './OperationsList.scss';
import Icon from '@material-ui/core/Icon';
import { Operation } from '../../../../models/operation';
import { OperationType } from '../../../../models/enums/operation-type.enum';

type OperationListProps = {
  operationList: Operation[];
};

const OperationsList: React.FC<OperationListProps> = ({ operationList }) => {
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
              <td className="operation">
                <Icon
                  color={
                    operation.type === OperationType.RECIPE
                      ? 'primary'
                      : 'error'
                  }
                >
                  {operation.type === OperationType.RECIPE
                    ? 'arrow_upward'
                    : 'arrow_downward'}
                </Icon>
              </td>
              <td className="description">{operation.description}</td>
              <td>
                R$ {operation.type === OperationType.EXPENSE && '-'}
                {operation.value}
              </td>
              <td>{operation.category}</td>
              <td>--/--/----</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperationsList;
