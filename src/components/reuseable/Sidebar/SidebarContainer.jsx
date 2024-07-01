import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const SidebarContainer = ({ children }) => {
  const { status: sidebarStatus } = useSelector((state) => state.sidebar);
  // console.log('sidebarStatus = ', sidebarStatus);
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          sidebarStatus ? 'md:ml-[250px]' : 'ml-0'
        } transition-all duration-200 ease-linear`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarContainer;
