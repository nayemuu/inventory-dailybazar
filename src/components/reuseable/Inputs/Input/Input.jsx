const Input = ({
  inputType,
  label,
  value,
  setValue,
  required,
  labelBackgroundColor,
  readOnly = false,
}) => {
  return (
    <div className="h-[43px] relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={inputType}
        placeholder="label"
        required={readOnly ? false : required}
        className={`px-[17px] h-full w-full border border-solid border-[#DCE0E4] rounded-[5px] outline-none text-[16px] placeholder:text-transparent peer ${
          readOnly ? "bg-[#e9ecef]" : "bg-transparent focus:border-primary"
        }`}
        readOnly={readOnly ?? false}
      />
      <label
        className={`px-[17px] flex items-center h-full w-full text-[#637381] pointer-events-none absolute left-0 top-0 text-[14px] duration-200 ease-linear peer-[:not(:placeholder-shown)]:-translate-y-[50%] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-[11px] ${
          !readOnly
            ? "peer-focus:-translate-y-[50%] peer-focus:text-primary peer-focus:text-[11px]"
            : ""
        }`}
      >
        <div
          style={{
            backgroundColor: readOnly
              ? "#e9ecef"
              : labelBackgroundColor
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
    </div>
  );
};

export default Input;
