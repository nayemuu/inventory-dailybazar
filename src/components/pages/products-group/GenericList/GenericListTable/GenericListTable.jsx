import { useEffect, useState } from "react";
import GenericListTableRow from "./GenericListTableRow";
import Portal from "../../../../reuseable/Portal/Portal";
import Modal from "../../../../reuseable/Modal/Modal";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../utils/toastifyUtils";
import DeleteConfirmationModal from "../../../../reuseable/Modal/DeleteConfirmationModal/DeleteConfirmationModal";
import { useDeleteGenericMutation } from "../../../../../redux/features/generic/genericApi";

const GenericListTable = ({
  data,
  editId,
  setEditId,
  isLoading,
  isFetching,
  isSuccess,
  selectedIds,
  setSelectedIds,
}) => {
  // console.log('selectedIds = ', selectedIds);
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [deleteId, setDeleteId] = useState(null); // State to hold the id of the item to be deleted

  const [
    deleteGeneric,
    {
      isLoading: deleteGenericIsLoading,
      isSuccess: deleteGenericIsSuccess,
      data: deleteGenericData,
      isError: deleteGenericIsError,
      error: deleteGenericError,
    },
  ] = useDeleteGenericMutation();

  useEffect(() => {
    if (deleteGenericIsSuccess) {
      // console.log("deleteGenericData = ", deleteGenericData);
      if (deleteGenericData.message) {
        successToastMessage(deleteGenericData.message);
      }
    }
  }, [deleteGenericIsSuccess]);

  useEffect(() => {
    if (deleteGenericIsError) {
      // console.log("deleteGenericData = ", deleteGenericData);
      if (deleteGenericError.message) {
        errorToastMessage(deleteGenericError.message);
      } else {
        errorToastMessage("Something went wrong");
      }
    }
  }, [deleteGenericIsError]);

  const handleModal = (modalName) => {
    // console.log('modalName = ', modalName);
    setSelectedModal(modalName);
    setShowModal(true);
  };

  let headers = ["Generic Id", "Generic Name"];

  let actionButtons = {
    view: false,
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
    if (isSuccess && data?.results?.length) {
      if (data.results.length !== selectedIds.length) {
        let allIds = [];

        data.results.map((item) => {
          allIds.push(item.id);
        });

        setSelectedIds(allIds);
      } else {
        setSelectedIds([]);
      }
    }
  };

  const handleView = (id) => {
    console.log("id = ", id);
  };

  const handleEdit = (id) => {
    // console.log("id = ", id);
    setEditId(id);
  };

  const handleDelete = (id) => {
    // console.log("id = ", id);
    // deleteGeneric(id);
    handleModal("delete-confirmation-alert");
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteGeneric(deleteId); // Call deleteGeneric with the stored ID
      setDeleteId(null); // Clear the ID after deletion
    }

    setShowModal(false);
  };

  let selectedDataForDelete = null;
  if (deleteId && data?.results) {
    selectedDataForDelete = data.results.find((item) => item.id == deleteId);
    // console.log("selectedDataForDelete  = ", selectedDataForDelete);
  }

  let content = <></>;

  if (!isLoading && !isFetching && isSuccess && data?.results?.length) {
    content = (
      <tbody className="divide-y divide-[#DCE0E4] dark:divide-gray-700">
        {data.results.map((item, index) => (
          <GenericListTableRow
            key={index}
            item={item}
            index={index}
            handleSingleCheckBox={handleSingleCheckBox}
            selectedIds={selectedIds}
            actionButtons={actionButtons}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            editId={editId}
          />
        ))}
      </tbody>
    );
  }

  if (
    !isLoading &&
    !isFetching &&
    isSuccess &&
    data?.results &&
    data.results.length === 0
  ) {
    content = (
      <tbody>
        <tr>
          <td colSpan={5}>
            <div className="flex justify-center w-full py-3">
              No Result Found
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (isLoading || isFetching) {
    content = (
      <tbody>
        <tr>
          <td colSpan={5}>
            <div className="flex justify-center w-full py-3">
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <>
      <div>
        <div className="section-title">Generic Table</div>

        <div className="flex flex-col mt-5">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-[#DCE0E4]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3 ps-4">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                            onClick={handleAllCheckBox}
                          />
                        </div>
                      </th>

                      {headers.map((header, index) => (
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium text-gray-500"
                          key={index}
                        >
                          {header}
                        </th>
                      ))}

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm font-medium text-gray-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  {content}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Portal>
        <Modal showModal={showModal}>
          {selectedModal === "delete-confirmation-alert" && (
            <DeleteConfirmationModal
              title="Are you sure?"
              message={
                <span>
                  you want to delete "
                  <span className="font-bold text-[#000]">
                    {selectedDataForDelete ? selectedDataForDelete?.name : ""}
                  </span>
                  " Generic?
                </span>
              }
              setShow={setShowModal}
              handler={confirmDelete}
            />
          )}
        </Modal>
      </Portal>
    </>
  );
};

export default GenericListTable;
