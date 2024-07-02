import { SlLogout } from 'react-icons/sl';

const LoggedInUserDropDown = ({ userDropdown }) => {
  return (
    <div
      className={`absolute top-[48px] right-0 drop-shadow-[0_2px_4px_rgb(0,0,0,0.08)] bg-white py-4 border border-[#e6e6e6] rounded-[12px]`}
    >
      <div className="flex gap-4 items-center pl-[30px] pr-[40px] py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 ease-linear">
        <div className="text-lg">
          <SlLogout />
        </div>
        <div className="whitespace-nowrap text-[16px] font-medium">Log Out</div>
      </div>
    </div>
  );
};

export default LoggedInUserDropDown;
