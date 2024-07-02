import Navbar from '../../components/reuseable/Navbar/Navbar';
import SectionTitle from '../../components/reuseable/Section/SectionTitle/SectionTitle';
import SidebarContainer from '../../components/reuseable/Sidebar/SidebarContainer';

const Orders = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <SectionTitle additionalClass="mb-5">Orders</SectionTitle>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default Orders;
