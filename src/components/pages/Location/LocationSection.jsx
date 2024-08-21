import { useEffect, useState } from "react";
import SectionHeaderActions from "../../reuseable/Section/SectionHeaderActions/SectionHeaderActions";
import LocationTable from "./LocationTable/LocationTable";
import LocationFrom from "./LocationFrom/LocationFrom";
import {
  locationApi,
  useGetLocationsQuery,
} from "../../../redux/features/location/locationApi";
import EditLocationFrom from "./LocationFrom/EditLocationFrom/EditLocationFrom";
import JumpToPageButton from "../../reuseable/buttons/JumpToPageButton/JumpToPageButton";
import ReactPaginate from "react-paginate";
import { errorToastMessage } from "../../../utils/toastifyUtils";
import JumpToPageSection from "../../reuseable/JumpToPageSection/JumpToPageSection";
import exportPdf from "../../../utils/PdfGenerator/PdfGenerator";
import { useDispatch } from "react-redux";

const LocationSection = () => {
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [offset, setOffset] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [jumpToPage, setJumpToPage] = useState(undefined);
  const [selectedIds, setSelectedIds] = useState([]);
  const limit = 5;

  const dispatch = useDispatch();

  // console.log("jumpToPage = ", jumpToPage);

  // console.log("editId = ", editId);
  // console.log("searchText = ", searchText);
  // console.log("offset = ", offset);

  const { isLoading, isError, isSuccess, isFetching, data, error, refetch } =
    useGetLocationsQuery(
      { limit, offset, keyword: searchText },
      { refetchOnMountOrArgChange: true }
    );

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log("data = ", data);
  //   }
  // }, [isSuccess, data]);

  const fatchData = async () => {
    const {
      status,
      data: loadMoreData,
      error: loadMoreError,
      refetch,
    } = await dispatch(
      locationApi.endpoints.getLocations.initiate(
        {
          limit: 3,
          offset: 0,
          keyword: "",
        },
        { forceRefetch: true }
      )
    );

    console.log("loadMoreData = ", loadMoreData);
  };

  const handlePdf = async () => {
    if (selectedIds.length) {
      // console.log("selectedIds = ", selectedIds);
      // console.log("data = ", data.results);
      const dataForPdf = data.results.filter((item) =>
        selectedIds.includes(item.id)
      );

      let head = [["Id", "Location Name"]];

      let fieldToShow = ["id", "name"]; // data column kyes

      // exportPdf(pdfTitle, head, data, fieldToShow, isSelected) perametrs
      exportPdf("Location List", head, dataForPdf, fieldToShow, true);
    } else {
      let dataForPdf = [];
      let doFatchOperationForPdf = true;

      do {
        const {
          status,
          data: loadMoreData,
          error: loadMoreError,
          refetch,
        } = await dispatch(
          locationApi.endpoints.getLocations.initiate({
            limit: 2,
            offset: dataForPdf.length,
            keyword: searchText,
          })
        );
        // console.log("loadMoreData = ", loadMoreData);
        // console.log("loadMoreData.count = ", loadMoreData.count);
        // console.log("dataForPdf.length = ", dataForPdf.length);

        if (loadMoreData) {
          doFatchOperationForPdf = loadMoreData.count !== dataForPdf.length;

          dataForPdf = [...dataForPdf, ...loadMoreData.results];

          // console.log("dataForPdf = ", dataForPdf);
          // console.log("doFatchOperationForPdf = ", doFatchOperationForPdf);
        } else {
          doFatchOperationForPdf = false;
        }

        // await fatchData();
      } while (doFatchOperationForPdf);

      console.log("dataForPdf = ", dataForPdf);
      if (dataForPdf.length) {
        let head = [["Id", "Location Name"]];

        let fieldToShow = ["id", "name"]; // data column kyes

        // exportPdf(pdfTitle, head, data, fieldToShow, isSelected) perametrs
        exportPdf("Location List", head, dataForPdf, fieldToShow);
      }
    }
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
    if (parseInt(jumpToPage) && parseInt(jumpToPage) <= pageCount) {
      let targetPage = parseInt(jumpToPage);

      const newOffset = ((targetPage - 1) * limit) % data.count;
      setOffset(newOffset);
      setInitialPage(targetPage - 1);
      setJumpToPage("");
    } else {
      errorToastMessage("Provide a valid page number");
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
            isFetching={isFetching}
            data={data}
            editId={editId}
            setEditId={setEditId}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />

          {pageCount > 1 && (
            <div className="pt-[50px] flex justify-between items-center gap-6 flex-wrap">
              <div className="shrink-0">
                <ReactPaginate
                  key={initialPage} // Force re-render on initialPage change
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

              <JumpToPageSection
                pageCount={pageCount}
                jumpToPage={jumpToPage}
                setJumpToPage={setJumpToPage}
                handlePageJump={handlePageJump}
                isLoading={isLoading}
                isFetching={isFetching}
              />
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
