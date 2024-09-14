import React from "react";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";
import { ToastContainer } from "react-toastify";
import CategorySection from "../../../components/pages/products-group/Category/CategorySection";

const Category = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">Category</SectionTitle>
              <Breadcrumb routes={["Products", "Category"]} />
            </div>

            <CategorySection />
          </div>

          <ToastContainer />
        </div>
      </SidebarContainer>
    </div>
  );
};

export default Category;
