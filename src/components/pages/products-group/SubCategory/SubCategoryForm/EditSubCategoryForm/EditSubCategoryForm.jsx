import { useEffect, useState } from "react";
import Input from "../../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../../reuseable/buttons/SubmitButton/SubmitButton";
import { errorToastMessage } from "../../../../../../utils/toastifyUtils";
import ClearButton from "../../../../../reuseable/buttons/ClearButton/ClearButton";
import Select from "../../../reuseable/Select/Select";
import ImageUpload from "../../../reuseable/ImageUpload/ImageUpload";
import { useEditSubCategoryMutation } from "../../../../../../redux/features/sub-category/subCategoryApi";

function EditSubCategoryForm({
  data,
  editId,
  setEditId,
  categoriesData,
  categoriesIsLoading,
}) {
  const [name, setName] = useState("");
  const [subCategoryIcon, setSubCategoryIcon] = useState(null);
  const [category, setCategory] = useState("");

  const [editSubCategory, { isLoading, isError, isSuccess, error }] =
    useEditSubCategoryMutation();

  useEffect(() => {
    if (data && data?.results?.length) {
      const matchedItem = data.results.find((item) => item.id === editId);
      // console.log("matchedItem = ", matchedItem);
      setName(matchedItem.name);

      // console.log("matchedItem = ", matchedItem);
      if (!matchedItem?.icon) {
        setSubCategoryIcon(null);
      }
      setCategory(matchedItem.category);
    }
  }, [editId, data]);

  let matchedItem;

  if (data && data?.results?.length) {
    matchedItem = data.results.find((item) => item.id === editId);
    console.log("matchedItem = ", matchedItem);
  }

  const clearHandler = () => {
    setEditId(null);
    setCategory("");
    setSubCategoryIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("category = ", category);
    // console.log("subCategoryIcon = ", subCategoryIcon);
    if (!category && !category?.id) {
      return errorToastMessage("Please Select a category");
    }

    console.log("category.id = ", category.id);
    const formData = new FormData();
    formData.append("id", editId);
    formData.append("name", name);
    if (subCategoryIcon) {
      formData.append("icon", subCategoryIcon);
    }
    formData.append("categoryId", category.id);
    editSubCategory(formData);
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
      <div className="section-title">Edit Sub Category</div>

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
              label="category"
              value={category}
              setValue={setCategory}
              required={true}
              options={categoriesData}
              // labelBackgroundColor="#f3f6fa"
              isLoading={categoriesIsLoading}
            />

            <ImageUpload
              image={subCategoryIcon}
              setImage={setSubCategoryIcon}
              title="Sub Category icon image"
              matchedItem={matchedItem}
            />
          </div>

          <div className="mt-5">
            <div className="flex gap-5 flex-wrap">
              <div>
                <SubmitButton isLoading={isLoading}>
                  Update Sub Category
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

export default EditSubCategoryForm;
