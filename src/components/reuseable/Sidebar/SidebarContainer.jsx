import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const SidebarContainer = ({ children }) => {
  const { status: isSidebarOpen } = useSelector((state) => state.sidebar);
  // console.log('isSidebarOpen = ', isSidebarOpen);
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          isSidebarOpen ? "md:ml-[250px]" : "ml-0"
        } transition-all duration-200 ease-linear`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarContainer;
