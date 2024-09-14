import { ToastContainer } from "react-toastify";
import Navbar from "../../../components/reuseable/Navbar/Navbar";
import SectionTitle from "../../../components/reuseable/Section/SectionTitle/SectionTitle";
import SidebarContainer from "../../../components/reuseable/Sidebar/SidebarContainer";
import Breadcrumb from "../../../components/reuseable/Breadcrumb/Breadcrumb";
import LocationSection from "../../../components/pages/products-group/Location/LocationSection";

const Location = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />

        <div className="main-content">
          <div className="container">
            <div className="mb-5">
              <SectionTitle additionalClass="mb-1">Location</SectionTitle>
              <Breadcrumb routes={["Products", "Location"]} />
            </div>

            <LocationSection />
          </div>
          <ToastContainer />
        </div>
      </SidebarContainer>
    </div>
  );
};

export default Location;
