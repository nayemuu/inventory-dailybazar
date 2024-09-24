import { useEffect, useState } from "react";
import Input from "../../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../../reuseable/buttons/SubmitButton/SubmitButton";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../../utils/toastifyUtils";
import { useAddGenericMutation } from "../../../../../../redux/features/generic/genericApi";

const AddGenericForm = () => {
  const [name, setName] = useState("");

  const [addGeneric, { isLoading, isError, isSuccess, data, error }] =
    useAddGenericMutation();

  const resetForm = () => {
    setName("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("name = ", name);
    if (!name.trim()) {
      errorToastMessage("Name is required.");
    }
    addGeneric({ name });
  };

  useEffect(() => {
    if (isSuccess && data) {
      resetForm();
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
      <div className="section-title">Add Generic</div>

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
                  Create Generic
                </SubmitButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGenericForm;
