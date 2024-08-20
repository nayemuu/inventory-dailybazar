import React from "react";
import JumpToPageButton from "../buttons/JumpToPageButton/JumpToPageButton";

function JumpToPageSection({
  pageCount,
  jumpToPage,
  setJumpToPage,
  handlePageJump,
  isLoading,
  isFetching,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-[16px] leading-[18px] font-semibold text-primary">
        Jump to page
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePageJump();
        }}
      >
        <input
          type="text"
          value={jumpToPage}
          onChange={(e) => setJumpToPage(e.target.value)}
          placeholder="page no."
          className={`w-[80px] h-[34px] rounded-[3px] flex justify-center items-center border border-primary text-center px-1 ${
            jumpToPage > pageCount ? "text-red-400" : ""
          }`}
        />
      </form>

      <JumpToPageButton
        handleClick={handlePageJump}
        disable={isLoading || isFetching}
      >
        Jump
      </JumpToPageButton>
    </div>
  );
}

export default JumpToPageSection;
