import { useEffect, useState } from "react";
import Input from "../../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../../reuseable/buttons/SubmitButton/SubmitButton";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../../utils/toastifyUtils";
import Select from "../Select/Select";
import ImageUpload from "../../../Location/LocationForm/ImageUpload/ImageUpload";
import { useUpdateCategoryMutation } from "../../../../../../redux/features/category/categoryApi";
import ClearButton from "../../../../../reuseable/buttons/ClearButton/ClearButton";

function updateCategoryForm({
  data,
  editId,
  setEditId,
  locationData,
  locationsIsLoading,
}) {
  const [name, setName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [location, setLocation] = useState("");

  const [updateCategory, { isLoading, isError, isSuccess, error }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (data && data?.results?.length) {
      const matchedItem = data.results.find((item) => item.id === editId);
      // console.log("matchedItem = ", matchedItem);
      setName(matchedItem.name);

      // console.log("matchedItem = ", matchedItem);
      if (!matchedItem?.icon) {
        setCategoryIcon(null);
      }
      setLocation(matchedItem.location);
    }
  }, [editId, data]);

  let matchedItem;

  if (data && data?.results?.length) {
    matchedItem = data.results.find((item) => item.id === editId);
    console.log("matchedItem = ", matchedItem);
  }

  const clearHandler = () => {
    setEditId(null);
    setLocation("");
    setCategoryIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("category = ", category);
    // console.log("categoryIcon = ", categoryIcon);
    if (!location && !location?.id) {
      return errorToastMessage("Please Select a Location");
    }

    console.log("location.id = ", location.id);
    const formData = new FormData();
    formData.append("id", editId);
    formData.append("name", name);
    if (categoryIcon) {
      formData.append("icon", categoryIcon);
    }
    formData.append("locationId", location.id);
    updateCategory(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      clearHandler();
    }
  }, [isSuccess]);

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
      <div className="section-title">Edit Category</div>

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
              matchedItem={matchedItem}
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

export default updateCategoryForm;
