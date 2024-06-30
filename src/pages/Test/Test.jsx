import TestSection from '../../components/pages/Test/TestSection';
import Navbar from '../../components/reuseable/Navbar/Navbar';
import SectionTitle from '../../components/reuseable/Section/SectionTitle/SectionTitle';
import SidebarContainer from '../../components/reuseable/Sidebar/SidebarContainer';

const Test = () => {
  return (
    <div>
      <SidebarContainer>
        <Navbar />

        <div className="main-content">
          <div className="container">
            <SectionTitle>Demo</SectionTitle>
            <TestSection />
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default Test;
