import React from 'react';
import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumb = ({ routes }) => {
  return (
    <div className="text-[16px] leading-[18px] font-normal text-[#637381] flex">
      {routes.map((route, index) => (
        <BreadcrumbItem
          key={index}
          route={route}
          routes={routes}
          index={index}
        />
      ))}
    </div>
  );
};

export default Breadcrumb;
