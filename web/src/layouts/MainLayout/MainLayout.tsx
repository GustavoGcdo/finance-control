import React from 'react';
import Navbar from '../components/Navbar/Navbar';

type Props = {
  children?: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  return (
    <div className="bg-gray-100 flex flex-row h-screen w-screen">
      <div className="flex-1 overflow-x-auto pb-20">
        <Navbar />
        <div className="mx-auto p-3 max-w-7xl">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
