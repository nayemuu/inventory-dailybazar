import { useEffect, useState } from 'react';
import SidebarAccordianHeader from './SidebarAccordian/SidebarAccordianHeader/SidebarAccordianHeader';
import { IoCloseOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { FaQuestion } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { BsBoxSeamFill } from 'react-icons/bs';
import SidebarAccordianBody from './SidebarAccordian/SidebarAccordianBody/SidebarAccordianBody';
import SidebarAccordianItem from './SidebarAccordian/SidebarAccordianItem/SidebarAccordianItem';
import { isAnyPathMatches } from '../../../utils/sidebar-utils';
import SidebarAccordianHeaderForSvg from './SidebarAccordian/SidebarAccordianHeaderForSvg/SidebarAccordianHeaderForSvg';
import { changeSidebarStatus } from '../../../redux/features/sidebar/sidebarSlice';

const Sidebar = () => {
  const { status: sidebarStatus } = useSelector((state) => state.sidebar);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [transition, setTransition] = useState(false);

  const dispatch = useDispatch();

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

    if (
      isAnyPathMatches(pathname, [
        '/productList',
        'add-product',
        'category',
        'sub-category',
        'location',
      ])
    ) {
      setActiveIndex(3);
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
        <div onClick={() => dispatch(changeSidebarStatus())}>
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
            index={2}
            handleClick={() => handleActiveIndex(2)}
            dropdown={false}
            link="/orders"
            transition={transition}
          >
            <RiShoppingCart2Fill />
            Orders
          </SidebarAccordianHeader>
        </div>

        <div>
          <SidebarAccordianHeader
            activeIndex={activeIndex}
            index={3}
            handleClick={() => handleActiveIndex(3)}
            dropdown={true}
            transition={transition}
          >
            <BsBoxSeamFill />
            Products
          </SidebarAccordianHeader>

          <SidebarAccordianBody
            activeIndex={activeIndex}
            index={3}
            transition={transition}
          >
            <SidebarAccordianItem link="/product-list" logo={false}>
              Product List
            </SidebarAccordianItem>

            <SidebarAccordianItem link="/add-product" logo={false}>
              Add Product
            </SidebarAccordianItem>

            <SidebarAccordianItem link="/category" logo={false}>
              Category
            </SidebarAccordianItem>

            <SidebarAccordianItem link="/sub-category" logo={false}>
              Sub Category
            </SidebarAccordianItem>

            <SidebarAccordianItem link="/location" logo={false}>
              Location
            </SidebarAccordianItem>
          </SidebarAccordianBody>
        </div>

        <div>
          <SidebarAccordianHeaderForSvg
            activeIndex={activeIndex}
            index={4}
            handleClick={() => handleActiveIndex(4)}
            handleMouseEnter={() => setHoverIndex(4)}
            handleMouseLeave={() => setHoverIndex(null)}
            dropdown={true}
            transition={transition}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.11134 16.1915H3.27034C3.20287 16.1916 3.13603 16.1784 3.07367 16.1527C3.01131 16.1269 2.95465 16.0891 2.90694 16.0414C2.85923 15.9937 2.82142 15.937 2.79566 15.8747C2.7699 15.8123 2.75671 15.7455 2.75684 15.678V3.8675C2.75684 3.5825 2.98584 3.354 3.27034 3.354H20.7293C21.0143 3.354 21.2428 3.583 21.2428 3.8675V15.678C21.2428 15.963 21.0138 16.1915 20.7293 16.1915H13.1278"
                stroke={
                  activeIndex === 4 || hoverIndex === 4 ? '#ffffff' : '#637381'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.19721 13.4965C10.8988 13.4965 12.2782 12.1171 12.2782 10.4155C12.2782 8.71391 10.8988 7.3345 9.19721 7.3345C7.49562 7.3345 6.11621 8.71391 6.11621 10.4155C6.11621 12.1171 7.49562 13.4965 9.19721 13.4965Z"
                stroke={
                  activeIndex === 4 || hoverIndex === 4 ? '#ffffff' : '#637381'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.81134 3.354V7.3575M14.8528 3.354V16.1915M21.2428 9.7725H12.2138M2.75684 9.7725H6.14984M14.8873 12.927H21.2428M4.03184 20.646H14.2393C14.7373 12.0725 3.61634 11.7065 4.03184 20.646Z"
                stroke={
                  activeIndex === 4 || hoverIndex === 4 ? '#ffffff' : '#637381'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Supplier
          </SidebarAccordianHeaderForSvg>

          <SidebarAccordianBody
            activeIndex={activeIndex}
            index={4}
            transition={transition}
          >
            <SidebarAccordianItem link="/product-list" logo={false}>
              Supplier List
            </SidebarAccordianItem>

            <SidebarAccordianItem link="/category" logo={false}>
              Add Supplier
            </SidebarAccordianItem>
          </SidebarAccordianBody>
        </div>

        <div>
          <SidebarAccordianHeaderForSvg
            activeIndex={activeIndex}
            index={5}
            handleClick={() => handleActiveIndex(5)}
            handleMouseEnter={() => setHoverIndex(5)}
            handleMouseLeave={() => setHoverIndex(null)}
            dropdown={true}
            transition={transition}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6237 20.3225L20.9962 7.5525C21.1608 7.26756 21.2474 6.94432 21.2475 6.61527C21.2475 6.28622 21.161 5.96296 20.9965 5.67797C20.832 5.39298 20.5954 5.15632 20.3104 4.99176C20.0255 4.82719 19.7023 4.74054 19.3732 4.7405H4.62721C4.29816 4.74054 3.97492 4.82719 3.68997 4.99176C3.40503 5.15632 3.16842 5.39298 3.00394 5.67797C2.83945 5.96296 2.75288 6.28622 2.75293 6.61527C2.75298 6.94432 2.83964 7.26756 3.00421 7.5525L10.3767 20.3225C10.5412 20.6075 10.7779 20.8442 11.0628 21.0088C11.3478 21.1733 11.6711 21.26 12.0002 21.26C12.3293 21.26 12.6526 21.1733 12.9376 21.0088C13.2226 20.8442 13.4592 20.6075 13.6237 20.3225Z"
                stroke={
                  activeIndex === 5 || hoverIndex === 5 ? '#ffffff' : '#637381'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.62695 4.7405C12 4.7405 17.878 12.953 14.323 19.1105"
                stroke={
                  activeIndex === 5 || hoverIndex === 5 ? '#ffffff' : '#637381'
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Vendor
          </SidebarAccordianHeaderForSvg>

          <SidebarAccordianBody
            activeIndex={activeIndex}
            index={5}
            transition={transition}
          >
            <SidebarAccordianItem link="/product-list" logo={false}>
              Vendor List
            </SidebarAccordianItem>

            <SidebarAccordianItem link="/category" logo={false}>
              Add Vendor
            </SidebarAccordianItem>
          </SidebarAccordianBody>
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
