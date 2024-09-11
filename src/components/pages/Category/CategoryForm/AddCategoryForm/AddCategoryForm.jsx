import { useEffect, useState } from "react";
import Input from "../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../reuseable/buttons/SubmitButton/SubmitButton";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../utils/toastifyUtils";
import { useAddCategoryMutation } from "../../../../../redux/features/category/categoryApi";
import ImageUpload from "../../../Location/LocationFrom/ImageUpload/ImageUpload";
import Select from "../Select/Select";

const AddCategoryForm = ({ locationData, locationsIsLoading }) => {
  const [category, setCategory] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [location, setLocation] = useState(null);

  const [addCategory, { isLoading, isError, isSuccess, data, error }] =
    useAddCategoryMutation();

  const resetForm = () => {
    setCategory("");
    setCategoryIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("category = ", category);
    // console.log("categoryIcon = ", categoryIcon);
    if (location && location?.id) {
      successToastMessage("Please Select a Location");
    }

    console.log("location.id = ", location.id);
    const formData = new FormData();
    formData.append("name", category);
    if (categoryIcon) {
      formData.append("icon", categoryIcon);
    }
    successToastMessage("category Created Successfully");
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
              value={category}
              setValue={setCategory}
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
              <div className="max-w-[200px] w-full">
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
