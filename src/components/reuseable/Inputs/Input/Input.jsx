const Input = ({
  inputType,
  label,
  value,
  setValue,
  required,
  labelBackgroundColor,
}) => {
  return (
    <div className="h-[43px] relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={inputType}
        placeholder="label"
        required={required}
        className="px-[17px] bg-transparent h-full w-full border border-solid border-[#DCE0E4] focus:border-primary rounded-[5px] outline-none text-[16px] placeholder:text-transparent peer"
      />
      <label className="px-[17px] flex items-center h-full w-full text-[#637381] pointer-events-none absolute left-0 top-0 text-[14px] duration-200 ease-linear peer-focus:-translate-y-[50%] peer-focus:text-primary peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:-translate-y-[50%] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-[11px]">
        <div
          style={{
            backgroundColor: labelBackgroundColor
              ? labelBackgroundColor
              : '#ffffff',
          }}
        >
          {label}

          {required && (
            <span
              style={{
                color: '#D13F97',
                marginLeft: '2px',
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
