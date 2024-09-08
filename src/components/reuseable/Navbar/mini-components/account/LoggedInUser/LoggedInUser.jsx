import { useEffect, useRef, useState } from "react";
import LoggedInUserDropDown from "./LoggedInUserDropDown/LoggedInUserDropDown";

const LoggedInUser = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const UserDropdownContainerRef = useRef(null);

  const userDropdownHandler = () => {
    setUserDropdown(!userDropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        UserDropdownContainerRef.current &&
        !UserDropdownContainerRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
      }
    };

    // Attach the event listener with `capture: true`
    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  const name = "nayem";

  return (
    <div className="relative" ref={UserDropdownContainerRef}>
      <div
        className="w-[44px] h-[44px] rounded-full bg-primary flex justify-center items-center text-[28px] font-bold text-white hover:bg-primary-deep cursor-pointer border border-[#e4dcdc]"
        onClick={userDropdownHandler}
      >
        {name[0].toUpperCase()}
      </div>

      {userDropdown && <LoggedInUserDropDown />}
    </div>
  );
};

export default LoggedInUser;
