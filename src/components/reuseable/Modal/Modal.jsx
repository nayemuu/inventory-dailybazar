import React from "react";

const Modal = ({ children, showModal }) => {
  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        className={`fixed top-0 z-[999] h-[100vh] w-[100vw] overflow-y-auto overflow-x-hidden outline-none bg-black/40 ${
          showModal
            ? "opacity-100 backdrop-fade-in"
            : "opacity-0 backdrop-fade-out"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
