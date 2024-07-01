import React from 'react';
import SidebarContainer from '../../../components/reuseable/Sidebar/SidebarContainer';
import Navbar from '../../../components/reuseable/Navbar/Navbar';

const AddProduct = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <h1 className="text-3xl font-bold underline text-green-600">
              AddProduct
            </h1>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default AddProduct;
