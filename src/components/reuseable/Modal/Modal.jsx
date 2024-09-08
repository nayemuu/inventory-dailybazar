import React, { useEffect, useState } from "react";

const Modal = ({
  children,
  showModal,
  handleClick = () => {
    console.log("yoo");
  },
}) => {
  const [shouldRender, setShouldRender] = useState(showModal);

  useEffect(() => {
    if (showModal) {
      setShouldRender(true);
    }
  }, [showModal]);

  const handleAnimationEnd = () => {
    if (!showModal) {
      setShouldRender(false);
    }
  };

  return (
    shouldRender && (
      <div
        className={`fixed top-0 z-[999] h-[100vh] w-[100vw] overflow-y-auto overflow-x-hidden outline-none bg-black/40 ${
          showModal ? "backdrop-fade-in" : "backdrop-fade-out"
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default Modal;

// Explanation:
// 1. State Management (shouldRender):
//   a. shouldRender is used to control whether the modal is rendered in the DOM.
//   b. Initially, it's set to the value of showModal.
//   c .When showModal becomes true, shouldRender is set to true, making sure the modal is rendered.

// 2. Effect Hook (useEffect):
//   a. If showModal becomes true, setShouldRender(true) ensures the modal is rendered, allowing the backdrop-fade-in animation to play.

// 3. State Management (shouldRender):
//   a. The onAnimationEnd event handler checks if showModal is false.
//   b. When the backdrop-fade-out animation completes, shouldRender is set to false, removing the modal from the DOM.

// This way, the backdrop-fade-out animation is applied when showModal changes from true to false, and the modal is removed from the DOM only after the animation completes.
