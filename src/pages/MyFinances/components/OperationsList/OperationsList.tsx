import React from 'react';
import './OperationsList.scss';

const OperationsList: React.FC = () => {
  return (
    <div className="operations-list-container">
      <table className="table-operations">
        <thead>
          <tr>
            <th></th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Salario</td>
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
