import { IoEllipse, IoEllipseOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const SidebarAccordianItem = ({ child }) => {
  const { title, path, icon, haveIcon, isIconSVG, permission } = child;

  if (!permission) {
    return <></>;
  }

  const location = useLocation();
  const { pathname } = location;

  let content = null;

  if (haveIcon) {
    if (isIconSVG) {
      content = (
        <>
          {icon} {title}
        </>
      );
    } else {
      let Icon = icon;
      content = (
        <>
          <Icon />
          {title}
        </>
      );
    }
  } else {
    content = (
      <>
        {pathname === path ? <IoEllipse /> : <IoEllipseOutline />}
        {title}
      </>
    );
  }

  return (
    <Link to={path}>
      <div
        className={`block text-left border-t py-3 border-gray-200 text-base px-2 cursor-pointer hover:text-primary-deep ${
          pathname === path && "text-primary font-medium"
        }`}
      >
        <div className="flex items-center gap-x-2">{content}</div>
      </div>
    </Link>
  );
};

export default SidebarAccordianItem;
