import { useState } from "react";
import SectionHeaderActions from "../../../reuseable/Section/SectionHeaderActions/SectionHeaderActions";
import ReactPaginate from "react-paginate";
import { errorToastMessage } from "../../../../utils/toastifyUtils";
import JumpToPageSection from "../../../reuseable/JumpToPageSection/JumpToPageSection";
import exportPdf from "../../../../utils/PdfGenerator/PdfGenerator";
import { useDispatch } from "react-redux";
import exportExcel from "../../../../utils/ExcelGenerator/ExcelGenerator";
import Portal from "../../../reuseable/Portal/Portal";
import Modal from "../../../reuseable/Modal/Modal";
import {
  categoryApi,
  useGetCategoryQuery,
} from "../../../../redux/features/category/categoryApi";
import AddSubCategoryForm from "./SubCategoryForm/AddSubCategoryForm/AddSubCategoryForm";
import { useGetSubCategoryQuery } from "../../../../redux/features/sub-category/subCategoryApi";
import SubCategoryTable from "./SubCategoryTable/SubCategoryTable";
import EditSubCategoryForm from "./SubCategoryForm/EditSubCategoryForm/EditSubCategoryForm";

const SubCategorySection = () => {
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
  const limit = 5;

  const dispatch = useDispatch();

  // console.log("jumpToPage = ", jumpToPage);

  // console.log("editId = ", editId);
  // console.log("searchText = ", searchText);
  // console.log("offset = ", offset);

  const { isLoading, isError, isSuccess, isFetching, data, error, refetch } =
    useGetSubCategoryQuery(
      { limit, offset, keyword: searchText },
      { refetchOnMountOrArgChange: true }
    );

  const { isLoading: categoriesIsLoading, data: categoriesData } =
    useGetCategoryQuery(
      { limit: 10, offset: 0, keyword: "" },
      { refetchOnMountOrArgChange: true }
    );

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

        let headers = [["Id", "Sub Category Name", "Category Name"]];
        let fieldToShow = ["id", "name", "category.name"]; // data column kye

        if (type === "pdf") {
          exportPdf({
            title: "Sub Category List",
            headers: headers,
            data: dataForExportDocument,
            fieldToShow,
            isSelected: true,
            orientation: "portrait",
          });
        } else {
          const dataForExcell = [];
          dataForExportDocument.map((item) => {
            let obj = {};
            obj["id"] = item.id;
            obj["Sub Category Name"] = item.name;
            obj["Category Name"] = item?.category?.name ?? "N/A";

            dataForExcell.push(obj);
          });

          // exportExcel(data, pdfTitle, isSelected) perametrs
          exportExcel(dataForExcell, "Category List (Selected).xlsx", true);
        }
      } else {
        let dataForExportDocument = [];
        if (data.results.length === data.count) {
          dataForExportDocument = [...data.results];
        } else {
          // number of iteration for your loop
          const limitForApiCall = 5;
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
              categoryApi.endpoints.getCategory.initiate(
                {
                  limit: limitForApiCall,
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
            let headers = [["Id", "Sub Category Name", "Category Name"]];
            let fieldToShow = ["id", "name", "category.name"]; // data column kye

            exportPdf({
              title: "Sub Category List",
              headers: headers,
              data: dataForExportDocument,
              fieldToShow,
              isSelected: false,
              orientation: "portrait",
            });
          } else {
            dataForExportDocument.map((item) => {
              let obj = {};
              obj["id"] = item.id;
              obj["Sub Category Name"] = item.name;
              obj["Category Name"] = item?.category?.name ?? "N/A";

              dataForExcell.push(obj);
            });

            // exportExcel(data, pdfTitle, isSelected) perametrs
            exportExcel(dataForExcell, "Category List.xlsx", true);
          }
        }
      }
    }
  };

  const handlePdf = () => {
    // console.log("inside handlePdf");
    exportDocument("pdf");
  };

  const handleExcel = () => {
    // console.log("inside handleExcel");
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
            <SubCategoryTable
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
              <EditSubCategoryForm
                data={data}
                editId={editId}
                setEditId={setEditId}
                categoriesData={categoriesData?.results ?? []}
                categoriesIsLoading={categoriesIsLoading}
              />
            ) : (
              <AddSubCategoryForm
                categoriesData={categoriesData?.results ?? []}
                categoriesIsLoading={categoriesIsLoading}
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

export default SubCategorySection;
