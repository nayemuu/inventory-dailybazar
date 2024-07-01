import React from 'react';

function InputForText({
  logo,
  inputType,
  placeholder,
  value,
  setValue,
  required,
}) {
  return (
    <div className="h-[55px] relative">
      <div className="absolute top-0 h-full flex items-center px-[13px]">
        <img src={logo} alt={placeholder} className=" h-[30px] w-[30px]" />
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={inputType}
        placeholder={placeholder}
        required={required}
        className="bg-transparent h-full w-full border border-solid border-primary focus:border-primary-deep rounded-[5px] outline-none pl-[53px] text-[16px]"
      />
    </div>
  );
}

export default InputForText;
