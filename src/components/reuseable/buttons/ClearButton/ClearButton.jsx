import React from 'react';

const ClearButton = ({
  children,
  isLoading,
  disable,
  height = '40px',
  handleClick,
}) => {
  return (
    <button
      type="button"
      disabled={isLoading || disable}
      onClick={handleClick}
      className={`w-full flex justify-center items-center gap-2 border border-transparent text-[20px] leading-[22px] font-medium rounded-[5px] text-white hover:bg-[#4e5a65] transition duration-150 ease-in-out ${
        isLoading || disable
          ? 'bg-[#4e5a65] cursor-not-allowed'
          : `bg-[#637381] cursor-pointer`
      }`}
      style={{ height: height }}
    >
      {children}
    </button>
  );
};

export default ClearButton;
