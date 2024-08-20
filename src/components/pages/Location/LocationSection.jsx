import { useEffect, useState } from "react";
import SectionHeaderActions from "../../reuseable/Section/SectionHeaderActions/SectionHeaderActions";
import LocationTable from "./LocationTable/LocationTable";
import LocationFrom from "./LocationFrom/LocationFrom";
import { useGetLocationQuery } from "../../../redux/features/location/locationApi";
import EditLocationFrom from "./LocationFrom/EditLocationFrom/EditLocationFrom";
import JumpToPageButton from "../../reuseable/buttons/JumpToPageButton/JumpToPageButton";
import ReactPaginate from "react-paginate";

const LocationSection = () => {
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [jumpToPage, setJumpToPage] = useState(0);
  const limit = 2;

  // console.log("editId = ", editId);
  // console.log("searchText = ", searchText);
  // console.log("offset = ", offset);

  const { isLoading, isError, isSuccess, isFetching, data, error, refetch } =
    useGetLocationQuery(
      { limit, offset, keyword: searchText },
      { refetchOnMountOrArgChange: true }
    );

  useEffect(() => {
    if (isSuccess) {
      console.log("data = ", data);
    }
  }, [isSuccess, data]);

  const handlePdf = () => {
    console.log("inside handlePdf");
  };

  const handleExcel = () => {
    console.log("inside handleExcel");
  };

  const handlePrint = () => {
    console.log("inside handlePrint");
  };

  const fileExportsOptions = {
    pdf: {
      available: true,
      handlePdf: handlePdf,
    },
    excel: {
      available: true,
      handleExcel: handleExcel,
    },
    print: {
      available: true,
      handlePrint: handlePrint,
    },
  };

  // pagination logic

  if (isSuccess && !isFetching && !isLoading && data && data.results) {
    const pageCountTemp = Math.ceil(data.count / limit);

    if (pageCount !== pageCountTemp) {
      setPageCount(pageCountTemp);
      setInitialPage(0);
      setOffset(0);
    }
  }

  const handlePageClick = (event) => {
    if (
      event.nextSelectedPage !== undefined &&
      event.nextSelectedPage !== null
    ) {
      const newOffset = (event.nextSelectedPage * limit) % data.count;
      console.log("event.nextSelectedPage = ", event.nextSelectedPage);
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setOffset(newOffset);
      setInitialPage(event.nextSelectedPage); // Update the initialPage state
    }
  };

  const handlePageJump = () => {
    if (jumpToPage - 1 <= pageCount) {
      const newOffset = ((jumpToPage - 1) * limit) % data.count;
      setOffset(newOffset);
      setInitialPage(jumpToPage - 1);
    }
  };

  return (
    <div className="section-card">
      <SectionHeaderActions
        fileExportsOptions={fileExportsOptions}
        searchText={searchText}
        setSearchText={setSearchText}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <div className="grid grid-cols-12 mt-6  gap-y-[40px] xl:gap-x-[40px]">
        <div className="col-span-12 xl:col-span-8 order-2 xl:order-1">
          <LocationTable
            isLoading={isLoading}
            isSuccess={isSuccess}
            data={data}
            editId={editId}
            setEditId={setEditId}
          />

          {pageCount > 1 && (
            <div className="pt-[50px] flex justify-between items-center gap-5">
              <div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=""
                  onClick={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageCount={pageCount} // total number of page
                  initialPage={initialPage} // Pass the initialPage state
                  previousLabel=""
                  renderOnZeroPageCount={null}
                  containerClassName="flex flex-wrap gap-x-[10px] justify-center"
                  pageLinkClassName="unselected-page"
                  activeLinkClassName="active-page"
                  previousClassName="hide"
                  nextClassName="hide"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[16px] leading-[18px] font-semibold text-primary">
                  Jump to page
                </div>
                <div>
                  <input
                    type="text"
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    placeholder="page no."
                    className={`w-[80px] h-[34px] rounded-[3px] flex justify-center items-center border border-primary text-center px-1 ${
                      jumpToPage > pageCount ? "text-red-400" : ""
                    }`}
                  />
                </div>
                <div className="w-[150px]">
                  <JumpToPageButton
                    isLoading={false}
                    handleClick={handlePageJump}
                  >
                    Jump
                  </JumpToPageButton>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 xl:col-span-4 order-1 xl:order-2">
          {editId &&
          !isLoading &&
          isSuccess &&
          data &&
          data?.results?.length ? (
            <EditLocationFrom
              data={data}
              editId={editId}
              setEditId={setEditId}
            />
          ) : (
            <LocationFrom />
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
