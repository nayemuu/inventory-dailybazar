import Navbar from '../../components/reuseable/Navbar/Navbar';
import SectionTitle from '../../components/reuseable/Section/SectionTitle/SectionTitle';
import SidebarContainer from '../../components/reuseable/Sidebar/SidebarContainer';

const Home = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <SectionTitle additionalClass="mb-1">Dashboard</SectionTitle>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default Home;
