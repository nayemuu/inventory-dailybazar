import "./option.css";
import OptionsItem from "./OptionsItem";

function Options({ options, handleClick, value, isLoading }) {
  return (
    <div className="bg-white border border-gray-300 rounded-[5px] mt-[4px] absolute w-full top-[45px] max-h-[250px] overflow-y-auto options-scrollbar">
      {/* {options.map((item, index) => (
        <OptionsItem
          key={index}
          item={item}
          handleClick={handleClick}
          value={value}
        />
      ))} */}

      {isLoading ? (
        <div className="flex justify-center w-full py-5">
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        options.map((item, index) => (
          <OptionsItem
            key={index}
            item={item}
            handleClick={handleClick}
            value={value}
          />
        ))
      )}
    </div>
  );
}

export default Options;
