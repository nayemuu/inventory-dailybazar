import React, { useState } from 'react';
import SidebarAccordianHeader from './SidebarAccordian/SidebarAccordianHeader/SidebarAccordianHeader';
import { IoCloseOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { status: sidebarStatus } = useSelector((state) => state.sidebar);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [transition, setTransition] = useState(false);

  const handleActiveIndex = (index) => {
    if (!activeIndex || activeIndex !== index) {
      setTransition(true);
      setActiveIndex(index);
    } else {
      setTransition(true);
      setActiveIndex(null);
    }
  };

  return (
    <div
      className={`${
        sidebarStatus ? 'translate-x-0' : '-translate-x-full'
      } fixed m-0 p-[8px] w-[250px] h-full border-r border-[#dce0e4] border-solid z-[2] transition-all duration-200 ease-linear bg-primary-light`}
    >
      <div className="flex justify-end text-3xl hover:text-red-500 cursor-pointer md:hidden">
        <div onClick={() => {}}>
          <IoCloseOutline />
        </div>
      </div>
      <div className="text-center text-[22px] leading-[24px] text-primary-deep font-bold py-[20px]">
        DailyBazar
      </div>

      <div className="flex flex-col gap-[1px]">
        <div>
          <SidebarAccordianHeader
            activeIndex={activeIndex}
            index={1}
            handleClick={() => handleActiveIndex(1)}
            dropdown={false}
            link="/"
            transition={transition}
          >
            <RxDashboard />
            Dashboard
          </SidebarAccordianHeader>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
