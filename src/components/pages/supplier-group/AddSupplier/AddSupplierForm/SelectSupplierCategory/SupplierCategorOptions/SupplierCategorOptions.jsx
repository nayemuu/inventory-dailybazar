import "./SupplierCategorOptions.css";
import SupplierCategorOptionsItem from "./SupplierCategorOptionsItem";

function SupplierCategorOptions({ options, handleClick, value }) {
  return (
    <div className="bg-white border border-gray-300 rounded-[5px] mt-[4px] absolute w-full top-[45px] max-h-[250px] overflow-y-auto options-scrollbar">
      {options.map((item, index) => (
        <SupplierCategorOptionsItem
          key={index}
          item={item}
          handleClick={handleClick}
          value={value}
        />
      ))}
    </div>
  );
}

export default SupplierCategorOptions;
