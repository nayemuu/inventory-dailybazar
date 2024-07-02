const SectionTitle = ({ children, additionalClass }) => {
  return (
    <div
      className={`text-[24px] leading-[26px] font-bold text-[#13264D] ${additionalClass}`}
    >
      {children}
    </div>
  );
};

export default SectionTitle;
