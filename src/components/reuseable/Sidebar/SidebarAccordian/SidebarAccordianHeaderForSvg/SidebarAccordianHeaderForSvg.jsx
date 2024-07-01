import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

const SidebarAccordianHeaderForSvg = (props) => {
  const {
    activeIndex,
    index,
    children,
    handleClick,
    dropdown = true,
    link,
    handleMouseEnter,
    handleMouseLeave,
  } = props;

  let content;
  if (dropdown) {
    content = (
      <div
        className={`flex items-center justify-between gap-4 rounded-sm py-[11px] px-[15px] font-medium text-lg text-[#1B2850] duration-300 ease-in-out cursor-pointer hover:bg-primary-deep hover:text-white ${
          activeIndex === index && 'bg-primary text-white'
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-4">{children}</div>

        <div
          className={`duration-200 ease-linear ${
            activeIndex === index ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <IoIosArrowDown />
        </div>
      </div>
    );
  } else {
    content = (
      <Link to={link}>
        <div
          className={`flex items-center gap-4 rounded-sm py-[11px] px-[15px] font-medium text-lg text-[#1B2850] duration-300 ease-in-out cursor-pointer hover:bg-primary-deep hover:text-white ${
            activeIndex === index && 'bg-primary text-white'
          }`}
          onClick={handleClick}
        >
          {children}
        </div>
      </Link>
    );
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {content}
    </div>
  );
};

export default SidebarAccordianHeaderForSvg;
