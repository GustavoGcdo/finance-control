import React from 'react';
import './MainLayout.scss';
import Navbar from '../components/Navbar/Navbar';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="main-layout-container">      
      <div className="main-content-container">
        <Navbar />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
