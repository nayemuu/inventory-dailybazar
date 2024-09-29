import { useState } from "react";
import "./Select.css";

const Select = ({
  label,
  defaultValue,
  data,
  titleKey,
  valueKey,
  required = false,
  setValue,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = (e) => {
    // Check if the selected option is not the disabled one
    setIsSelected(e.target.value !== "");
    setValue(e.target.value);
  };

  return (
    <div className="relative h-[43px]">
      <label
        htmlFor="countries"
        className={`absolute h-full top-[-50%] left-3 flex items-center text-[11px] ${
          isSelected ? "text-primary" : "text-[#637381]"
        }`}
      >
        <span className="bg-[#fff] px-[1px]">{label}</span>
        {required && (
          <span
            style={{
              color: "#D13F97",
              marginLeft: "2px",
            }}
          >
            *
          </span>
        )}
      </label>

      <select
        id="countries"
        className="px-[17px] h-full w-full border border-solid border-[#DCE0E4] rounded-[5px] outline-none text-[16px] placeholder:text-transparent peer bg-transparent appearance-none focus:border-primary select-component"
        onChange={handleChange}
        defaultValue=""
        required={required}
      >
        <option value="" disabled>
          {defaultValue}
        </option>
        {data.map((item, index) => (
          <option value={item[valueKey]} key={index}>
            {item[titleKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
