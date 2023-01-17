import React from 'react';
import './MainLayout.scss';
import Navbar from '../components/Navbar/Navbar';

type Props = {
  children?: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
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
