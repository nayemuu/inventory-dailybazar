import React from "react";
import "./AlertModal.css";

function AlertModal({ setShow, handler, title, message }) {
  const handleClick = () => {
    handler();
  };

  return (
    <div className="flex justify-center items-center mt-[10vh]">
      <div className="bg-[#FFFFFF] DeleteModalContainer rounded-[7px] m-5">
        <div className="bg-[#E40000] h-[10px] rounded-t-[7px]"></div>

        <div className="flex gap-3 sm:gap-5 p-[30px] items-center">
          <div className="alertModalLogoContainer">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.7882 5.95156C27.7069 2.18594 22.2944 2.18594 20.2132 5.95156L3.81789 35.6375C1.80539 39.2812 4.44289 43.75 8.60539 43.75H41.3976C45.5601 43.75 48.1976 39.2812 46.1835 35.6375L29.7882 5.95156ZM26.9538 34.375C26.9538 34.893 26.748 35.3898 26.3818 35.7561C26.0155 36.1224 25.5187 36.3281 25.0007 36.3281C24.4827 36.3281 23.9859 36.1224 23.6196 35.7561C23.2533 35.3898 23.0476 34.893 23.0476 34.375C23.0476 33.857 23.2533 33.3602 23.6196 32.9939C23.9859 32.6276 24.4827 32.4219 25.0007 32.4219C25.5187 32.4219 26.0155 32.6276 26.3818 32.9939C26.748 33.3602 26.9538 33.857 26.9538 34.375ZM25.0007 14.0625C25.4151 14.0625 25.8125 14.2271 26.1056 14.5201C26.3986 14.8132 26.5632 15.2106 26.5632 15.625V28.125C26.5632 28.5394 26.3986 28.9368 26.1056 29.2299C25.8125 29.5229 25.4151 29.6875 25.0007 29.6875C24.5863 29.6875 24.1889 29.5229 23.8958 29.2299C23.6028 28.9368 23.4382 28.5394 23.4382 28.125V15.625C23.4382 15.2106 23.6028 14.8132 23.8958 14.5201C24.1889 14.2271 24.5863 14.0625 25.0007 14.0625Z"
                fill="#E40000"
              />
            </svg>
          </div>

          <div className="flex flex-col max-w-[450px]">
            <div className="text-xl md:text-2xl font-semibold">{title}</div>
            <div className="text-base md:text-xl font-normal text-[#757575]">
              {message}
            </div>
          </div>
        </div>
        <div className="bg-[#833586]/20 h-[1px] w-full"></div>

        <div className="flex flex-wrap gap-3 p-[16px] sm:p-[20px] justify-end">
          <button
            className="text-[#3E3E3E] bg-[#F3F6FA] border-[1px] border-[#43bfc7] hover:bg-black/10 py-[10px] px-[22px] sm:px-[26px] font-semibold rounded-[50px] text-xs sm:text-base"
            onClick={() => setShow(false)}
          >
            No
          </button>
          <button
            className="bg-primary hover:bg-primary-deep text-white py-[10px] px-[22px] sm:px-[26px] font-semibold rounded-[50px] text-xs sm:text-base"
            onClick={handleClick}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
