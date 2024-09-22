import React from "react";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";
import { ToastContainer } from "react-toastify";
import UpdateSupplierForm from "../../../components/pages/supplier-group/UpdateSupplier/UpdateSupplierForm/UpdateSupplierForm";

const UpdateSupplier = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">
                Update Supplier
              </SectionTitle>
              <Breadcrumb routes={["Supplier", "Update Supplier"]} />
            </div>

            <div className="section-card">
              <UpdateSupplierForm />
            </div>
          </div>
        </div>

        <ToastContainer />
      </SidebarContainer>
    </div>
  );
};

export default UpdateSupplier;
