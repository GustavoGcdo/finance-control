import React from 'react';
import './OperationsList.scss';
import Icon from '@material-ui/core/Icon';

const OperationsList: React.FC = () => {
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
          <tr>
            <td className="operation">
              <Icon color="primary">arrow_upward</Icon>
            </td>
            <td className="description">Salario</td>
            <td>2.500</td>
            <td>Salario</td>
            <td>19/08/2020</td>
          </tr>
          <tr>
            <td className="operation">
              <Icon color="error">arrow_downward</Icon>
            </td>
            <td className="description">Salario</td>
            <td>2.500</td>
            <td>Salario</td>
            <td>19/08/2020</td>
          </tr>
          <tr>
            <td className="operation">
              <Icon color="error">arrow_downward</Icon>
            </td>
            <td className="description">Salario</td>
            <td>2.500</td>
            <td>Salario</td>
            <td>19/08/2020</td>
          </tr>
          <tr>
            <td className="operation">
              <Icon color="error">arrow_downward</Icon>
            </td>
            <td className="description">Salario</td>
            <td>2.500</td>
            <td>Salario</td>
            <td>19/08/2020</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationsList;
