import CountUp from "react-countup";

const TotalCard = ({ icon, backgroundColor = "#FF990033", title, value }) => {
  return (
    <div
      className="flex items-center justify-between gap-4 p-4 rounded-[5px]"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="flex flex-col justify-center gap-2">
        <div className="text-white text-[16px] leading-[18px] font-normal">
          {title}
        </div>
        <div className="text-white text-[20px] leading-[22px] font-bold">
          <CountUp start={0} end={value} duration={1} separator="," />
        </div>
      </div>

      <div className="flex items-center">
        <div className="h-[80px] aspect-square flex justify-center items-center shrink-0 rounded-full">
          <img src={icon} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default TotalCard;
