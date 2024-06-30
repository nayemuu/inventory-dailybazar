import { useEffect, useState } from 'react';
import SidebarAccordianHeader from './SidebarAccordian/SidebarAccordianHeader/SidebarAccordianHeader';
import { IoCloseOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { FaQuestion } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { status: sidebarStatus } = useSelector((state) => state.sidebar);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [transition, setTransition] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const handleActiveIndex = (index) => {
    if (!activeIndex || activeIndex !== index) {
      setTransition(true);
      setActiveIndex(index);
    } else {
      setTransition(true);
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    if (pathname === '/') {
      setActiveIndex(1);
    }

    if (pathname === '/test') {
      setActiveIndex(21);
    }
  }, []);

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

        <div>
          <SidebarAccordianHeader
            activeIndex={activeIndex}
            index={21}
            handleClick={() => handleActiveIndex(21)}
            dropdown={false}
            link="/test"
            transition={transition}
          >
            <FaQuestion />
            Test
          </SidebarAccordianHeader>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
