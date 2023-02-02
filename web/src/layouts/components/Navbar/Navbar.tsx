import Button from '@material-ui/core/Button';
import React from 'react';
import { useAuth } from '../../../contexts/auth.context';

const Navbar: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-primary text-white w-full">
      <div className="p-4 max-w-7xl flex items-center justify-between mx-auto">
        <div className="flex">
          <span className="text-base block">Finance Control</span>
        </div>

        <Button onClick={handleSignOut} color="inherit">
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
