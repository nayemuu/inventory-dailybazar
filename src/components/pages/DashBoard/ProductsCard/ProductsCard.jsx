import "./ProductsCard.css";
import CountUp from "react-countup";

const ProductsCard = ({
  icon,
  backgroundColorForIcon = "#FF990033",
  title,
  value,
}) => {
  return (
    <div className="products-card-container">
      <div className="flex items-center gap-4 p-4">
        <div className="flex items-center">
          <div
            className="h-[80px] aspect-square flex justify-center items-center shrink-0 rounded-full"
            style={{ backgroundColor: backgroundColorForIcon }}
          >
            <img src={icon} alt={title} />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="text-[#637381] text-[16px] leading-[18px] font-normal">
            {title}
          </div>
          <div className="text-[20px] leading-[26px] font-bold">
            <CountUp start={0} end={value} duration={1} separator="," />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
