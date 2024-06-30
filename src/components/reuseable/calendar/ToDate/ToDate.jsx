const ToDate = (props) => {
  const { label, fromDate, toDate, setToDate, required, labelBackgroundColor } =
    props;
  const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format

  return (
    <div className="h-[43px] relative">
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        min={fromDate}
        max={currentDate}
        required={required}
        className="px-[17px] bg-transparent h-full w-full border border-solid border-primary focus:border-primary-deep rounded-[5px] outline-none text-[16px] placeholder:text-transparent peer"
      />
      <label className="px-[17px] flex items-center h-full w-full text-[#637381] pointer-events-none absolute left-0 top-0 text-[14px] duration-200 ease-linear peer-focus:-translate-y-[50%] peer-focus:text-primary peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:-translate-y-[50%] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-[11px]">
        <div
          style={{
            backgroundColor: labelBackgroundColor
              ? labelBackgroundColor
              : '#fafafa',
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

export default ToDate;
