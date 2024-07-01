import { useRef } from 'react';

const SidebarAccordianBody = ({ activeIndex, index, children, transition }) => {
  const ref = useRef(null);

  return (
    <div
      className={`overflow-y-hidden ease-linear bg-[#f3f6fa] ${
        transition ? 'transition-all duration-200' : ''
      }`}
      style={{
        height: activeIndex === index ? ref.current?.offsetHeight || 0 : 0,
      }}
    >
      <div className="px-4" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default SidebarAccordianBody;
