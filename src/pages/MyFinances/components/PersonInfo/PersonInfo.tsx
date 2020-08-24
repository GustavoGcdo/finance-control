import React from 'react';
import { UserExtract } from '../../../../models/user-extract';
import './PersonInfo.scss';

type PersonInfoProps = {
  userExtract: UserExtract;
};

const PersonInfo: React.FC<PersonInfoProps> = ({ userExtract }) => {
  return (
    <div className="person-info-container">
      <div className="box person-info">
        <div className="name">{userExtract.name}</div>
        <div className="action-edit">Editar informações</div>
      </div>
      <div className="box recipes">
        <span className="title">Entradas</span>
        <span className="value">R$ {userExtract.totalRecipes}</span>
      </div>
      <div className="box expenses">
        <span className="title">Saidas</span>
        <span className="value">R$ {userExtract.totalExpenses}</span>
      </div>
      <div className="box balance">
        <span className="title">Saldo atual</span>
        <span className="value">R$ {userExtract.balance}</span>
      </div>
    </div>
  );
};

export default PersonInfo;
