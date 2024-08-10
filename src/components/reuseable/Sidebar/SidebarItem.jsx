import React from 'react';
import SidebarAccordianHeader from './SidebarAccordian/SidebarAccordianHeader/SidebarAccordianHeader';
import SidebarAccordianBody from './SidebarAccordian/SidebarAccordianBody/SidebarAccordianBody';
import SidebarAccordianItem from './SidebarAccordian/SidebarAccordianItem/SidebarAccordianItem';

const SidebarItem = ({ item, transition, handleActiveIndex }) => {
  const { title, index, activeIndex, path, icon, isIconSVG, childs } = item;

  let content = <></>;

  if (isIconSVG) {
    content = (
      <>
        {icon}
        {title}
      </>
    );
  } else {
    content = (
      <>
        {icon()}
        {title}
      </>
    );
  }

  return (
    <div>
      <SidebarAccordianHeader
        activeIndex={activeIndex}
        index={index}
        handleClick={() => handleActiveIndex(index)}
        childs={childs}
        path={path}
        transition={transition}
        item={item}
      >
        {content}
      </SidebarAccordianHeader>
      {childs?.length ? (
        <SidebarAccordianBody
          activeIndex={activeIndex}
          index={index}
          transition={transition}
        >
          {childs.map((child, index) => (
            <SidebarAccordianItem key={index} child={child} />
          ))}
        </SidebarAccordianBody>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SidebarItem;
