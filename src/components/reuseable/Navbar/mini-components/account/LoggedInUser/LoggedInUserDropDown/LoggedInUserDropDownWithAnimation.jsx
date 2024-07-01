import { SlLogout } from 'react-icons/sl';

const LoggedInUserDropDownWithAnimation = ({ userDropdown }) => {
  return (
    <div
      className={`absolute top-[45px] right-0 drop-shadow-[0_2px_4px_rgb(0,0,0,0.08)] px-5 bg-white border border-[#e6e6e6] rounded-[12px] transition-all duration-300 ease-linear overflow-hidden ${
        userDropdown ? 'h-auto opacity-100 py-5' : 'h-0 opacity-0 py-0'
      }`}
    >
      <div className="flex gap-4 items-center px-3 py-2 cursor-pointer font-medium hover:bg-primary hover:text-white">
        <div className="text-lg">
          <SlLogout />
        </div>
        <div className="whitespace-nowrap">Log Out</div>
      </div>
    </div>
  );
};

export default LoggedInUserDropDownWithAnimation;
