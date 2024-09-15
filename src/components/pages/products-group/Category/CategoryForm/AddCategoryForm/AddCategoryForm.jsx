import { useEffect, useState } from "react";
import Input from "../../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../../reuseable/buttons/SubmitButton/SubmitButton";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../../utils/toastifyUtils";
import { useAddCategoryMutation } from "../../../../../../redux/features/category/categoryApi";
import Select from "../Select/Select";
import ImageUpload from "../../../Location/LocationForm/ImageUpload/ImageUpload";

const AddCategoryForm = ({ locationData, locationsIsLoading }) => {
  const [name, setName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [location, setLocation] = useState("");

  const [addCategory, { isLoading, isError, isSuccess, data, error }] =
    useAddCategoryMutation();

  const resetForm = () => {
    setName("");
    setCategoryIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("category = ", category);
    // console.log("categoryIcon = ", categoryIcon);
    if (!location && location?.id) {
      return errorToastMessage("Please Select a Location");
    }

    console.log("location.id = ", location.id);
    const formData = new FormData();
    formData.append("name", name);
    if (categoryIcon) {
      formData.append("icon", categoryIcon);
    }
    formData.append("locationId", location.id);
    addCategory(formData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      successToastMessage(data.message);
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

  // console.log("locationData = ", locationData);

  return (
    <div>
      <div className="section-title">Add Category</div>

      <div className="mt-5">
        <form onSubmit={submitHandler}>
          <div className="grid gap-5">
            <Input
              inputType="text"
              label="Category Name"
              value={name}
              setValue={setName}
              required={true}
              // labelBackgroundColor="#f3f6fa"
            />

            <Select
              label="Location"
              value={location}
              setValue={setLocation}
              required={true}
              options={locationData}
              // labelBackgroundColor="#f3f6fa"
              isLoading={locationsIsLoading}
            />

            <ImageUpload
              image={categoryIcon}
              setImage={setCategoryIcon}
              title="Category"
            />
          </div>

          <div className="mt-5">
            <div className="flex gap-5 flex-wrap">
              <div>
                <SubmitButton isLoading={isLoading}>
                  Create Category
                </SubmitButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
