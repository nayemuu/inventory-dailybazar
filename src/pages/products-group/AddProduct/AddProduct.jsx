import React from "react";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";

const AddProduct = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">Add Product</SectionTitle>
              <Breadcrumb routes={["Product", "Add Product"]} />
            </div>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default AddProduct;
