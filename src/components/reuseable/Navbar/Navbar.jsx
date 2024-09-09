import { useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";
import User from "./mini-components/account/User/User";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebarStatus } from "../../../redux/features/sidebar/sidebarSlice";
import LoggedInUser from "./mini-components/account/LoggedInUser/LoggedInUser";

const Navbar = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const { status: isSidebarOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const sidebarHandler = () => {
    dispatch(changeSidebarStatus());
  };

  const handleScreenSize = () => {
    if (fullScreen === false) {
      setFullScreen(true);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
    } else {
      setFullScreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="header">
      <div>
        <div className="flex items-center justify-between gap-5 relative">
          <div
            className="w-[44px] h-[44px] flex justify-center items-center text-2xl font-bold text-[#637381] cursor-pointer hover:text-primary bg-[#eeecec] rounded-md hover:bg-[#1B2850]/10"
            onClick={sidebarHandler}
            title={isSidebarOpen ? "Close Side Panel" : "Open Side Panel"}
          >
            <FiMenu />
          </div>

          <div className="flex items-center gap-5">
            <div
              // className="text-xl font-bold cursor-pointer hover:text-primary bg-[#eeecec] p-2 rounded-md hover:bg-[#1B2850]/10"
              className="w-[44px] h-[44px] flex justify-center items-center text-2xl font-bold text-[#637381] cursor-pointer hover:text-primary bg-[#eeecec] rounded-md hover:bg-[#1B2850]/10"
              onClick={handleScreenSize}
              title="Open Full Screen"
            >
              <BsFullscreen />
            </div>

            {/* <User /> */}
            <LoggedInUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
