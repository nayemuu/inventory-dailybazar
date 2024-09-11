import { useState } from "react";
import SectionHeaderActions from "../../reuseable/Section/SectionHeaderActions/SectionHeaderActions";
import {
  locationApi,
  useGetLocationsQuery,
} from "../../../redux/features/location/locationApi";
import ReactPaginate from "react-paginate";
import { errorToastMessage } from "../../../utils/toastifyUtils";
import JumpToPageSection from "../../reuseable/JumpToPageSection/JumpToPageSection";
import exportPdf from "../../../utils/PdfGenerator/PdfGenerator";
import { useDispatch } from "react-redux";
import exportExcel from "../../../utils/ExcelGenerator/ExcelGenerator";
import Portal from "../../reuseable/Portal/Portal";
import Modal from "../../reuseable/Modal/Modal";
import EditLocationFrom from "../Location/LocationFrom/EditLocationFrom/EditLocationFrom";
import AddCategoryForm from "./CategoryForm/AddCategoryForm/AddCategoryForm";
import { useGetCategoryQuery } from "../../../redux/features/category/categoryApi";
import CategoryTable from "./CategoryTable/CategoryTable";

const CategorySection = () => {
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
  const [apiCallWhileExporting, setApiCallWhileExporting] = useState(false);
  const limit = 3;

  const dispatch = useDispatch();

  // console.log("jumpToPage = ", jumpToPage);

  // console.log("editId = ", editId);
  // console.log("searchText = ", searchText);
  // console.log("offset = ", offset);

  const { isLoading, isError, isSuccess, isFetching, data, error, refetch } =
    useGetCategoryQuery(
      { limit, offset, keyword: searchText },
      { refetchOnMountOrArgChange: true }
    );

  const { isLoading: locationsIsLoading, data: locationsData } =
    useGetLocationsQuery(
      { limit: 10, offset: 0, keyword: "" },
      { refetchOnMountOrArgChange: true }
    );

  console.log("data = ", data);

  const exportDocument = async (type) => {
    if (
      !isLoading &&
      !isFetching &&
      data &&
      data?.count &&
      !apiCallWhileExporting
    ) {
      if (selectedIds.length) {
        // console.log("selectedIds = ", selectedIds);
        // console.log("data = ", data.results);
        const dataForExportDocument = data.results.filter((item) =>
          selectedIds.includes(item.id)
        );

        if (type === "pdf") {
          let head = [["Id", "Location Name"]];
          let fieldToShow = ["id", "name"]; // data column kyes

          // exportPdf(pdfTitle, head, data, fieldToShow, isSelected) perametrs
          exportPdf(
            "Location List",
            head,
            dataForExportDocument,
            fieldToShow,
            true
          );
        } else {
          const dataForExcell = [];
          dataForExportDocument.map((item) => {
            let obj = {};
            obj["id"] = item.id;
            obj["Location Name"] = item.name;

            dataForExcell.push(obj);
          });

          // exportExcel(data, pdfTitle, isSelected) perametrs
          exportExcel(dataForExcell, "Location List (Selected).xlsx", true);
        }
      } else {
        let dataForExportDocument = [];
        if (data.results.length === data.count) {
          dataForExportDocument = [...data.results];
        } else {
          // number of iteration for your loop
          const limitForApiCall = 2;
          const totalCall = Math.ceil(data.count / limitForApiCall);
          // console.log("totalCall = ", totalCall);
          // end number of iteration for your loop

          setApiCallWhileExporting(true);

          for (let i = 0; i < totalCall; i++) {
            const {
              status,
              data: loadMoreData,
              error: loadMoreError,
              refetch,
            } = await dispatch(
              locationApi.endpoints.getLocations.initiate(
                {
                  limit: 2,
                  offset: dataForExportDocument.length,
                  keyword: searchText,
                },
                { forceRefetch: true }
              )
            );
            // console.log("loadMoreData = ", loadMoreData);
            if (loadMoreData) {
              dataForExportDocument = [
                ...dataForExportDocument,
                ...loadMoreData.results,
              ];
            }
          }

          setApiCallWhileExporting(false);
        }

        if (dataForExportDocument.length) {
          const dataForExcell = [];
          if (type === "pdf") {
            let head = [["Id", "Location Name"]];

            let fieldToShow = ["id", "name"]; // data column kyes

            // exportPdf(pdfTitle, head, data, fieldToShow, isSelected) perametrs
            exportPdf(
              "Location List",
              head,
              dataForExportDocument,
              fieldToShow
            );
          } else {
            dataForExportDocument.map((item) => {
              let obj = {};
              obj["id"] = item.id;
              obj["Location Name"] = item.name;

              dataForExcell.push(obj);
            });

            // exportExcel(data, pdfTitle, isSelected) perametrs
            exportExcel(dataForExcell, "Location List.xlsx", true);
          }
        }
      }
    }
  };

  const handlePdf = () => {
    console.log("inside handlePdf");
    exportDocument("pdf");
  };

  const handleExcel = () => {
    console.log("inside handleExcel");
    exportDocument("excel");
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
    <>
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
            <CategoryTable
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
              <AddCategoryForm
                locationData={locationsData?.results ?? []}
                locationsIsLoading={locationsIsLoading}
              />
            )}
          </div>
        </div>
      </div>

      <Portal>
        <Modal showModal={apiCallWhileExporting}>
          <div className="">
            <div className="w-[70vw] max-w-[840px] bg-white rounded-[12px] relative mt-[5vh] mx-auto p-5">
              <div>
                <div className="flex justify-center w-full py-3">
                  <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>

                <div className="text-center font-semibold">
                  Data is Downloading. Please wait for a moment...
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Portal>
    </>
  );
};

export default CategorySection;
