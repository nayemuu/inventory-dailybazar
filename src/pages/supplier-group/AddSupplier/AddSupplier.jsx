import React from "react";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";
import AddSupplierForm from "../../../components/pages/supplier-group/AddSupplier/AddSupplierForm/AddSupplierForm";

const AddSupplier = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">Add Supplier</SectionTitle>
              <Breadcrumb routes={["Supplier", "Add Supplier"]} />
            </div>

            <div className="section-card">
              <AddSupplierForm />
            </div>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default AddSupplier;
