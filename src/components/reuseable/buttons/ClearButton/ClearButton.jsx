import React from "react";

const ClearButton = ({ children, isLoading, disable, handleClick }) => {
  return (
    <button
      type="button"
      disabled={isLoading || disable}
      onClick={handleClick}
      className={`px-7 py-2 min-h-[40px] flex justify-center items-center gap-2 border border-transparent text-[18px] leading-[20px] font-medium rounded-[5px] text-white hover:bg-[#4e5a65] transition duration-150 ease-in-out ${
        isLoading || disable
          ? "bg-[#4e5a65] cursor-not-allowed"
          : `bg-[#637381] cursor-pointer`
      }`}
    >
      {children}
    </button>
  );
};

export default ClearButton;
