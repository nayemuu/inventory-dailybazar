import { useEffect, useState } from "react";
import Input from "../../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../../reuseable/buttons/SubmitButton/SubmitButton";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../../utils/toastifyUtils";
import { useAddSubCategoryMutation } from "../../../../../../redux/features/sub-category/subCategoryApi";
import Select from "../../../reuseable/Select/Select";
import ImageUpload from "../../../reuseable/ImageUpload/ImageUpload";
const AddSubCategoryForm = ({ categoriesData, categoriesIsLoading }) => {
  const [name, setName] = useState("");
  const [subCategoryIcon, setSubCategoryIcon] = useState(null);
  const [category, setCategory] = useState("");

  const [addSubCategory, { isLoading, isError, isSuccess, data, error }] =
    useAddSubCategoryMutation();

  const resetForm = () => {
    setName("");
    setSubCategoryIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("category = ", category);
    // console.log("subCategoryIcon = ", subCategoryIcon);
    if (!category && category?.id) {
      return errorToastMessage("Please Select a category");
    }

    console.log("category.id = ", category.id);
    const formData = new FormData();
    formData.append("name", name);
    if (subCategoryIcon) {
      formData.append("icon", subCategoryIcon);
    }
    formData.append("categoryId", category.id);
    addSubCategory(formData);
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

  // console.log("categoriesData = ", categoriesData);

  return (
    <div>
      <div className="section-title">Add Sub Category</div>

      <div className="mt-5">
        <form onSubmit={submitHandler}>
          <div className="grid gap-5">
            <Input
              inputType="text"
              label="Sub Category Name"
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

export default AddSubCategoryForm;
