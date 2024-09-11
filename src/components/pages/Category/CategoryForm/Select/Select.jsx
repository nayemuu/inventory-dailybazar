import { useEffect, useRef, useState } from "react";
import Options from "./Options/Options";

function Select({
  label,
  value,
  setValue,
  required,
  labelBackgroundColor,
  options,
  isLoading,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownSectionRef = useRef(null);

  const handleOutsideClick = (event) => {
    // console.log('Inside handleOutsideClick function')
    // console.log('showSelectTopicsOption = ', showSelectTopicsOption);
    // if (dropdownSectionRef.current?.contains(event.target)) {
    //   console.log('dropdownSectionRef.current.contains(event.target) = ', dropdownSectionRef.current.contains(event.target));
    // }

    if (dropdownSectionRef.current?.contains(event.target)) {
      // console.log('dropdownSectionRef.current.contains(event.target) = ', dropdownSectionRef.current.contains(event.target));
      // console.log('Clicked Inside');
    } else {
      // console.log('Clicked Outside');
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // console.log('yoo')
    document.addEventListener("click", handleOutsideClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSelect = (title) => {
    setValue(title);
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={dropdownSectionRef}
      className="h-[43px] relative"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <input
        value={value?.name ?? value}
        // onChange={(e) => setValue(e.target.value)}
        onChange={() => {}}
        type="text"
        placeholder="label"
        required={required}
        className="px-[17px] bg-transparent h-full w-full border border-solid border-[#DCE0E4] focus:border-primary rounded-[5px] outline-none text-[16px] placeholder:text-transparent peer"
      />

      <label className="px-[17px] flex items-center h-full w-full text-[#637381] pointer-events-none absolute left-0 top-0 text-[14px] duration-200 ease-linear  peer-[:not(:placeholder-shown)]:-translate-y-[50%] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-[11px]">
        <div
          style={{
            backgroundColor: labelBackgroundColor
              ? labelBackgroundColor
              : "#ffffff",
          }}
        >
          {label}

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
        </div>
      </label>

      <div className="absolute top-0 right-3 flex justify-center items-center h-full">
        <div
          className={`duration-200 ease-linear ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.701894 3.07706L4.47898 6.85415C5.04773 7.4229 5.96648 7.4229 6.53523 6.85415L10.3123 3.07706C11.2311 2.15831 10.5748 0.583313 9.27689 0.583313H1.72273C0.42481 0.583313 -0.216856 2.15831 0.701894 3.07706Z"
              fill="#757575"
            />
          </svg>
        </div>
      </div>

      {isDropdownOpen && (
        <Options
          options={options}
          value={value}
          setValue={value}
          handleClick={handleSelect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default Select;
