import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { BsBoxSeamFill, BsPersonFillAdd } from "react-icons/bs";
import { changeSidebarStatus } from "../../../redux/features/sidebar/sidebarSlice";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import { FaQuestion } from "react-icons/fa";
import vendorIcon from "../../../assets/reusable/Sidebar/vendorIcon.svg";

const Sidebar = () => {
  const { status: isSidebarOpen } = useSelector((state) => state.sidebar);
  const [activeIndex, setActiveIndex] = useState(null);
  const [transition, setTransition] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;

  const handleActiveIndex = (index) => {
    if (activeIndex !== index) {
      setTransition(true);
      setActiveIndex(index);
    } else {
      setTransition(true);
      setActiveIndex(null);
    }
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      index: 1,
      path: "/",
      icon: RxDashboard,
      isIconSVG: false,
      permission: true,
      childs: [],
    },
    {
      title: "Orders",
      index: 2,
      path: "/orders",
      icon: RiShoppingCart2Fill,
      isIconSVG: false,
      permission: true,
      childs: [],
    },
    {
      title: "Products",
      index: 3,
      icon: BsBoxSeamFill,
      isIconSVG: false,
      permission: true,
      childs: [
        {
          title: "Product List",
          path: "/product-list",
          haveIcon: false,
          permission: true,
        },
        {
          title: "Add Product",
          path: "/add-product",
          haveIcon: false,
          permission: true,
        },
        {
          title: "Category",
          path: "/category",
          haveIcon: false,
          permission: true,
        },
        {
          title: "Sub Category",
          path: "/sub-category",
          haveIcon: false,
          permission: true,
        },
        {
          title: "Location",
          path: "/location",
          haveIcon: false,
          permission: true,
        },
      ],
    },
    {
      title: "Supplier",
      index: 4,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.11134 16.1915H3.27034C3.20287 16.1916 3.13603 16.1784 3.07367 16.1527C3.01131 16.1269 2.95465 16.0891 2.90694 16.0414C2.85923 15.9937 2.82142 15.937 2.79566 15.8747C2.7699 15.8123 2.75671 15.7455 2.75684 15.678V3.8675C2.75684 3.5825 2.98584 3.354 3.27034 3.354H20.7293C21.0143 3.354 21.2428 3.583 21.2428 3.8675V15.678C21.2428 15.963 21.0138 16.1915 20.7293 16.1915H13.1278"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.19721 13.4965C10.8988 13.4965 12.2782 12.1171 12.2782 10.4155C12.2782 8.71391 10.8988 7.3345 9.19721 7.3345C7.49562 7.3345 6.11621 8.71391 6.11621 10.4155C6.11621 12.1171 7.49562 13.4965 9.19721 13.4965Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.81134 3.354V7.3575M14.8528 3.354V16.1915M21.2428 9.7725H12.2138M2.75684 9.7725H6.14984M14.8873 12.927H21.2428M4.03184 20.646H14.2393C14.7373 12.0725 3.61634 11.7065 4.03184 20.646Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      isIconSVG: true,
      childs: [
        {
          title: "Supplier List",
          path: "/supplier-list",
          haveIcon: false,
          permission: true,
        },
        {
          title: "Add Supplier",
          path: "/add-supplier",
          haveIcon: false,
          permission: true,
        },
      ],
    },
    {
      title: "Test",
      index: 10,
      path: "/test",
      icon: FaQuestion,
      isIconSVG: false,
      childs: [],
      permission: false,
    },
  ];

  useEffect(() => {
    const matchedItem = sidebarItems.find(
      (item) =>
        item.childs.some((child) => child.path === pathname) ||
        item.path === pathname
    );
    if (matchedItem) {
      setActiveIndex(matchedItem.index);
    } else {
      if (pathname.includes("/update-supplier/")) {
        setActiveIndex(3);
      } else {
        setActiveIndex(null);
      }
    }
  }, []);

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed m-0 p-[8px] w-[250px] h-full border-r border-[#dce0e4] border-solid z-[20] transition-all duration-200 ease-linear bg-primary-light overflow-y-auto sidebar-scrollbar`}
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
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.index}
            item={item}
            transition={transition}
            handleActiveIndex={handleActiveIndex}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
