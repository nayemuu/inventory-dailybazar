import React from "react";

function JumpToPageButton({ children, isLoading, disable, handleClick }) {
  return (
    <button
      type="button"
      disabled={isLoading || disable}
      className={`w-full h-[34px] flex justify-center items-center gap-2 border border-transparent text-[18px] leading-[20px] font-medium rounded-[5px] text-white hover:bg-primary-deep transition duration-150 ease-in-out ${
        isLoading || disable
          ? "bg-primary-deep cursor-not-allowed"
          : `bg-primary cursor-pointer`
      }`}
      onClick={handleClick}
    >
      {children}

      {isLoading && (
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </button>
  );
}

export default JumpToPageButton;
