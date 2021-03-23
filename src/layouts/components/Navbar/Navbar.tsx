import Button from '@material-ui/core/Button';
import React from 'react';
import { useAuth } from '../../../contexts/auth.context';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="logo-container">
          <span className="logo">Finance Control</span>
        </div>

        <Button onClick={handleSignOut} color="inherit">
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
