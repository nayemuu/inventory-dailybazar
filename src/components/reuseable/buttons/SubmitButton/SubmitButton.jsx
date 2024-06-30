import React from 'react';

const SubmitButton = ({ children, isLoading, disable, height }) => {
  return (
    <button
      type="submit"
      disabled={isLoading || disable}
      className={`w-full flex justify-center items-center gap-2 border border-transparent text-[20px] leading-[22px] font-medium rounded-[5px] text-white hover:bg-primary-deep transition duration-150 ease-in-out ${
        isLoading || disable
          ? 'bg-primary-deep cursor-not-allowed'
          : `bg-primary cursor-pointer`
      }`}
      style={{ height: height ? height : '43px' }}
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
};

export default SubmitButton;
