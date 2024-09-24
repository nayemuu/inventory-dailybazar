import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const SidebarAccordianHeader = (props) => {
  const { index, activeIndex, children, handleClick, item } = props;

  let numberOfPermission = 0; //for item which has child
  if (item?.childs?.length) {
    // console.log("item.childs.length = ", item.childs.length);
    item.childs.map((child) => {
      if (child?.permission) {
        numberOfPermission++;
      }
    });
  }

  let content;

  if (item?.childs?.length) {
    content = numberOfPermission ? (
      <div
        className={`flex items-center justify-between gap-4 rounded-sm py-[11px] px-[15px] font-medium text-lg text-[#1B2850] duration-300 ease-in-out cursor-pointer hover:bg-primary-deep hover:text-white ${
          activeIndex === index && "bg-primary text-white"
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-4">{children}</div>

        <div
          className={`duration-200 ease-linear ${
            activeIndex === index ? "rotate-180" : "rotate-0"
          }`}
        >
          <IoIosArrowDown />
        </div>
      </div>
    ) : (
      <></>
    );
  } else {
    content = item?.permission ? (
      <Link to={item.path}>
        <div
          className={`flex items-center gap-4 rounded-sm py-[11px] px-[15px] font-medium text-lg text-[#1B2850] duration-300 ease-in-out cursor-pointer hover:bg-primary-deep hover:text-white ${
            activeIndex === index && "bg-primary text-white"
          }`}
          onClick={handleClick}
        >
          {children}
        </div>
      </Link>
    ) : (
      <></>
    );
  }

  return content;
};

export default SidebarAccordianHeader;
