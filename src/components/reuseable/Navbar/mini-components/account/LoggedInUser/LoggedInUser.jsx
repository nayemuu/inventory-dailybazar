import { useEffect, useRef, useState } from 'react';
import LoggedInUserDropDown from './LoggedInUserDropDown/LoggedInUserDropDown';

const LoggedInUser = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const userDropdownHandler = () => {
    setUserDropdown(!userDropdown);
  };

  const UserDropdownContainerRef = useRef(null);

  const handleOutsideClick = (event) => {
    // console.log('Inside handleOutsideClick function')
    // console.log('userDropdown = ', userDropdown);
    if (UserDropdownContainerRef.current?.contains(event.target)) {
      // console.log('UserDropdownContainerRef.current.contains(event.target) = ', UserDropdownContainerRef.current.contains(event.target));
    }
    // if (userDropdown) {
    //   if (UserDropdownContainerRef.current?.contains(event.target)) {
    //     console.log('UserDropdownContainerRef.current.contains(event.target) = ', UserDropdownContainerRef.current.contains(event.target));
    //     console.log('Clicked Inside');
    //   } else {
    //     console.log('Clicked Outside');
    //     setUserDropdown(false);
    //   }
    // }

    if (UserDropdownContainerRef.current?.contains(event.target)) {
      // console.log('UserDropdownContainerRef.current.contains(event.target) = ', UserDropdownContainerRef.current.contains(event.target));
      // console.log('Clicked Inside');
    } else {
      // console.log('Clicked Outside');
      setUserDropdown(false);
    }
  };

  useEffect(() => {
    // console.log('yoo')
    document.addEventListener('click', handleOutsideClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const name = 'nayem';

  return (
    <div className="relative" ref={UserDropdownContainerRef}>
      <div
        className="w-[44px] h-[44px] rounded-full bg-primary flex justify-center items-center text-[28px] font-bold text-white hover:bg-primary-deep cursor-pointer border border-[#e4dcdc]"
        onClick={() => {
          userDropdownHandler();
        }}
      >
        {name[0].toUpperCase()}
      </div>

      {userDropdown && <LoggedInUserDropDown />}
    </div>
  );
};

export default LoggedInUser;
