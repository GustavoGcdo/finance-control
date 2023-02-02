import React from 'react';
import { formatCurrency } from '../../../../infra/formatCurrency';
import { UserExtract } from '../../../../models/user-extract';

type PersonInfoProps = {
  userExtract: UserExtract;
};

const PersonInfo: React.FC<PersonInfoProps> = ({ userExtract }) => {
  return (
    <div className="person-info-container flex lg:flex-row flex-col gap-2">
      <div className="rounded bg-white grow flex flex-col p-6">
        <div className="text-xl font-light whitespace-nowrap overflow-hidden text-ellipsis">{userExtract.name}</div>
        <div className="mt-1 text-sm font-medium">Editar informações</div>
      </div>

      <div className="rounded p-4 bg-white border-2 border-solid border-primary flex flex-col items-end">
        <span className="grow text-sm font-medium">Entradas</span>
        <span className="text-lg">
          {formatCurrency(userExtract.totalRecipes)}
        </span>
      </div>
      <div className="rounded p-4 bg-white border-2 border-solid border-red-500 flex flex-col items-end">
        <span className="grow text-sm font-medium">Saidas</span>
        <span className="text-lg">
          {formatCurrency(userExtract.totalExpenses)}
        </span>
      </div>
      <div className="rounded p-4 bg-white border-2 border-solid border-orange-400 flex flex-col items-end">
        <span className="grow text-sm font-medium">Saldo atual</span>
        <span className="text-lg">{formatCurrency(userExtract.balance)}</span>
      </div>
    </div>
  );
};

export default PersonInfo;
