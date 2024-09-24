import React, { useEffect, useState } from "react";
import SubmitButton from "../../../../../reuseable/buttons/SubmitButton/SubmitButton";
import Input from "../../../../../reuseable/Inputs/Input/Input";
import ClearButton from "../../../../../reuseable/buttons/ClearButton/ClearButton";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../../utils/toastifyUtils";
import { useUpdateGenericMutation } from "../../../../../../redux/features/generic/genericApi";

function EditGenericForm({ data, editId, setEditId }) {
  const [name, setName] = useState("");

  const [
    updateGeneric,
    { isLoading, isError, isSuccess, data: updateGenericData, error },
  ] = useUpdateGenericMutation();

  useEffect(() => {
    if (data && data?.results?.length) {
      const matchedItem = data.results.find((item) => item.id === editId);
      // console.log("matchedItem = ", matchedItem);
      setName(matchedItem.name);
    }
  }, [editId, data]);

  let matchedItem;

  if (data && data?.results?.length) {
    matchedItem = data.results.find((item) => item.id === editId);
  }

  const clearHandler = () => {
    setEditId(null);
    setName("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("name = ", name);
    updateGeneric({ id: editId, name });
  };

  useEffect(() => {
    if (isSuccess && data) {
      clearHandler();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      if (error?.data?.message) {
        errorToastMessage(error.data.message);
      } else {
        errorToastMessage("Something went wrong");
      }
    }
  }, [isError, error]);

  return (
    <div>
      <div className="section-title">Edit Generic</div>

      <div className="mt-5">
        <form onSubmit={submitHandler}>
          <div className="grid gap-5">
            <Input
              inputType="text"
              label="Generic Name"
              value={name}
              setValue={setName}
              required={true}
              // labelBackgroundColor="#f3f6fa"
            />
          </div>

          <div className="mt-5">
            <div className="flex gap-5 flex-wrap">
              <div>
                <SubmitButton isLoading={isLoading}>
                  Update Location
                </SubmitButton>
              </div>

              <div>
                <ClearButton
                  isLoading={false}
                  disable={false}
                  handleClick={clearHandler}
                >
                  Clear
                </ClearButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGenericForm;
