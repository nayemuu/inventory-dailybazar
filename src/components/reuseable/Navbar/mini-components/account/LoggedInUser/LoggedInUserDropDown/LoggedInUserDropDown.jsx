import { SlLogout } from 'react-icons/sl';

const LoggedInUserDropDown = ({ userDropdown }) => {
  return (
    <div
      className={`absolute top-[45px] right-0 drop-shadow-[0_2px_4px_rgb(0,0,0,0.08)] bg-white p-5 border border-[#e6e6e6] rounded-[12px]`}
    >
      <div className="flex gap-4 items-center px-3 py-2 cursor-pointer font-medium hover:bg-primary hover:text-white transition-all duration-200 ease-linear">
        <div className="text-lg">
          <SlLogout />
        </div>
        <div className="whitespace-nowrap">Log Out</div>
      </div>
    </div>
  );
};

export default LoggedInUserDropDown;
