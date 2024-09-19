import React from "react";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import SupplierListSection from "../../../components/pages/supplier-group/SupplierList/SupplierListSection";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";

const SupplierList = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">Add Supplier</SectionTitle>
              <Breadcrumb routes={["Supplier", "Supplier List"]} />
            </div>
            <SupplierListSection />
          </div>
        </div>
        <ToastContainer />
      </SidebarContainer>
    </div>
  );
};

export default SupplierList;
