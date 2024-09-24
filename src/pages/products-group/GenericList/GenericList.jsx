import GenericListSection from "../../../components/pages/products-group/GenericList/GenericListSection";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";

function GenericList() {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">Generic List</SectionTitle>
              <Breadcrumb routes={["Product", "Generic List"]} />
            </div>

            <GenericListSection />
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
}

export default GenericList;
