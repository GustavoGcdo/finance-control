import React from 'react';
import { useAuth } from '../../contexts/auth.context';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <div>DASHBOARD</div>
      <div>
        <div>Bem vindo {user?.email}</div>
        <hr/>
        <button onClick={handleSignOut}>Sair</button>
      </div>
    </div>
  );
};

export default Dashboard;
