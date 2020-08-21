import React from 'react';
import './PersonInfo.scss';

const PersonInfo: React.FC = () => {
  return (
    <div className="person-info-container">
      <div className="box person-info">
        <div className="name">Gustavo Cândido de Oliveira</div>
        <div className="action-edit">Editar informações</div>
      </div>
      <div className="box recipes">
        <span className="title">Entradas</span>
        <span className="value">R$ 3.000,00</span>
      </div>
      <div className="box expenses">
        <span className="title">Saidas</span>
        <span className="value">R$ 3.000,00</span>
      </div>
      <div className="box balance">
        <span className="title">Saldo atual</span>
        <span className="value">R$ 3.000,00</span>
      </div>
    </div>
  );
};

export default PersonInfo;
