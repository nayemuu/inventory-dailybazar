import React from "react";

function JumpToPageButton({ children, isLoading, disable, handleClick }) {
  return (
    <button
      type="button"
      disabled={disable}
      className={`px-5 h-[34px] flex justify-center items-center gap-2 border border-transparent text-[18px] leading-[20px] font-medium rounded-[5px] text-white bg-primary hover:bg-primary-deep transition duration-150 ease-in-out ${
        disable ? "cursor-not-allowed" : `cursor-pointer`
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default JumpToPageButton;
