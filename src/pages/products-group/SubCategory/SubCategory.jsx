import React from "react";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";
import { ToastContainer } from "react-toastify";
import SubCategorySection from "../../../components/pages/products-group/SubCategory/SubCategorySection";

const SubCategory = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">Sub Category</SectionTitle>
              <Breadcrumb routes={["Products", "Sub Category"]} />
            </div>

            <SubCategorySection />
          </div>

          <ToastContainer />
        </div>
      </SidebarContainer>
    </div>
  );
};

export default SubCategory;
