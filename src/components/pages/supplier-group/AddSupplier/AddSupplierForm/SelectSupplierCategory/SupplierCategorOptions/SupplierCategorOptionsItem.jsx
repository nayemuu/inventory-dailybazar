import React from "react";

const SupplierCategorOptionsItem = ({ item, handleClick, value }) => {
  let isSelected = !!(value === item);
  //   console.log('isSelected = ', isSelected);
  return (
    <div
      className={`block text-left py-3 px-2 text-base font-normal leading-[19.09px] hover:bg-primary-deep hover:text-white cursor-pointer ${
        isSelected ? "bg-primary text-white" : ""
      }`}
      onClick={() => handleClick(item)}
    >
      {item}
    </div>
  );
};

export default SupplierCategorOptionsItem;
