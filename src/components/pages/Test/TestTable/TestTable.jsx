import { useState } from "react";
import CommonSectionTable from "../../../reuseable/Section/CommonSectionTable/CommonSectionTable";
import ReactPaginate from "react-paginate";
import JumpToPageButton from "../../../reuseable/buttons/JumpToPageButton/JumpToPageButton";

function TestTable({ data }) {
  const [selectedIds, setSelectedIds] = useState([]);

  // console.log('selectedIds = ', selectedIds);

  let headers = ["Category Id", "Category Name", "Location"];
  let fieldToShow = ["id", "category", "location"];
  let actionButtons = {
    view: true,
    edit: true,
    delete: true,
  };

  const handleSingleCheckBox = (id) => {
    if (selectedIds.includes(id)) {
      let newSelectedIds = selectedIds.filter((singleId) => singleId !== id);
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds((previousState) => [id, ...previousState]);
    }
  };

  const handleAllCheckBox = () => {
    if (data.length !== selectedIds.length) {
      let allIds = [];

      data.map((item) => {
        allIds.push(item.id);
      });

      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleView = (id) => {
    console.log("id = ", id);
  };

  const handleEdit = (id) => {
    console.log("id = ", id);
  };

  const handleDelete = (id) => {
    console.log("id = ", id);
  };

  return (
    <div>
      <CommonSectionTable
        totalColumnForData={3}
        title="Table for imageless field"
        headers={headers}
        data={data}
        fieldToShow={fieldToShow}
        selectedIds={selectedIds}
        handleSingleCheckBox={handleSingleCheckBox}
        handleAllCheckBox={handleAllCheckBox}
        actionButtons={actionButtons}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <div className="pt-[50px] flex flex-wrap justify-between items-center gap-6">
        <div className="shrink-0">
          <ReactPaginate
            breakLabel="..."
            nextLabel=""
            onPageChange={() => {}} // define a onPageChange handler
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={5} // total number of page
            initialPage={1} // Pass the initialPage state
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
              placeholder="page no."
              className="w-[80px] h-[34px] rounded-[3px] flex justify-center items-center border border-primary text-center px-1"
            />
          </div>
          <div className="w-[150px]">
            <JumpToPageButton isLoading={false}>Jump</JumpToPageButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestTable;
