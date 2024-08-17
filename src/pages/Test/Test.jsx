import TestSection from '../../components/pages/Test/TestSection';
import Button1 from '../../components/reuseable/buttons/Button1/Button1';
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
            <div className="flex justify-between gap-5 mb-[30px]">
              <SectionTitle additionalClass="mb-0">Demo</SectionTitle>
              <div className="w-[200px]">
                <Button1
                  handleClick={() => console.log('import')}
                  height="43px"
                  // isLoading={true}
                >
                  <div className="flex gap-1 items-center">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.5 16.25H16.25V22.5C16.25 23.1875 15.6875 23.75 15 23.75C14.3125 23.75 13.75 23.1875 13.75 22.5V16.25H7.5C6.8125 16.25 6.25 15.6875 6.25 15C6.25 14.3125 6.8125 13.75 7.5 13.75H13.75V7.5C13.75 6.8125 14.3125 6.25 15 6.25C15.6875 6.25 16.25 6.8125 16.25 7.5V13.75H22.5C23.1875 13.75 23.75 14.3125 23.75 15C23.75 15.6875 23.1875 16.25 22.5 16.25Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div>Import File</div>
                  </div>
                </Button1>
              </div>
            </div>
            <TestSection />
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
};

export default Test;
