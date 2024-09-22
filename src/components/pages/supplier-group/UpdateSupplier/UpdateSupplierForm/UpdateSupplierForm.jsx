import { useEffect, useState } from "react";
import Input from "../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../reuseable/buttons/SubmitButton/SubmitButton";
import ClearButton from "../../../../reuseable/buttons/ClearButton/ClearButton";
import { errorToastMessage } from "../../../../../utils/toastifyUtils";
import { useAddSupplierMutation } from "../../../../../redux/features/supplier/supplierApi";
import SelectSupplierCategory from "../../AddSupplier/AddSupplierForm/SelectSupplierCategory/SelectSupplierCategory";
import { useParams } from "react-router-dom";

let supplierCategories = ["Local", "Foreign"];
let statusOptions = ["Active", "In Active"];
let supplierProductCategories = ["Pharmacy", "Other"];

const UpdateSupplierForm = () => {
  const [supplierCategory, setSupplierCategory] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [supplierProductCategory, setSupplierProductCategory] = useState("");
  const [status, setStatus] = useState("");

  const { id } = useParams();
  console.log("id = ", id);

  const [addSupplier, { isLoading, isError, isSuccess, data, error }] =
    useAddSupplierMutation();

  const clearHandler = () => {
    setSupplierCategory("");
    setSupplierName("");
    setSupplierAddress("");
    setContactNumber("");
    setEmailAddress("");
    setContactPerson("");
    setSupplierProductCategory("");
    setStatus("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("supplierName = ", supplierName);
    // console.log("supplierAddress = ", supplierAddress);
    // console.log("supplierCategory = ", supplierCategory);
    // console.log("contactNumber = ", contactNumber);
    // console.log("emailAddress = ", emailAddress);
    // console.log("contactPerson = ", contactPerson);
    // console.log("supplierProductCategory = ", supplierProductCategory);
    // console.log("status = ", status);

    if (!supplierName || !supplierName.trim()) {
      return errorToastMessage("Supplier name is required");
    }

    if (!supplierCategory || !supplierCategory.trim()) {
      return errorToastMessage("Category of supplier is required");
    }

    if (!supplierName || !supplierName.trim()) {
      return errorToastMessage("Supplier name is required");
    }

    if (!status || !status.trim()) {
      return errorToastMessage("Status is required");
    }

    addSupplier({
      supplier_name: supplierName,
      supplier_address: supplierAddress,
      category_of_supplier: supplierCategory,
      contact_number: contactNumber,
      email_address: emailAddress,
      contact_person: contactPerson,
      supplier_product_category: supplierProductCategory,
      status: status,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      clearHandler();
    }
  }, [isSuccess]);
  return (
    <form onSubmit={submitHandler}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        <SelectSupplierCategory
          label="Category of Supplier"
          value={supplierCategory}
          setValue={setSupplierCategory}
          required={true}
          options={supplierCategories}
        />

        {/* <Input
          inputType="text"
          label="Supplier Id"
          value={supplierName}
          setValue={setSupplierName}
          // required={true}
          // labelBackgroundColor="#f3f6fa"
          readOnly={true}
        /> */}

        <Input
          inputType="text"
          label="Supplier Name"
          value={supplierName}
          setValue={setSupplierName}
          required={true}
          // labelBackgroundColor="#f3f6fa"
        />
        <Input
          inputType="text"
          label="Supplier Address"
          value={supplierAddress}
          setValue={setSupplierAddress}
          // required={true}
          // labelBackgroundColor="#f3f6fa"
        />
        <Input
          inputType="text"
          label="Contact Number"
          value={contactNumber}
          setValue={setContactNumber}
          // required={true}
          // labelBackgroundColor="#f3f6fa"
        />
        <Input
          inputType="text"
          label="Email Address"
          value={emailAddress}
          setValue={setEmailAddress}
          // required={true}
          // labelBackgroundColor="#f3f6fa"
        />
        <Input
          inputType="text"
          label="Contact Person"
          value={contactPerson}
          setValue={setContactPerson}
          // required={true}
          // labelBackgroundColor="#f3f6fa"
        />
        <SelectSupplierCategory
          label="Supplier Product Category"
          value={supplierProductCategory}
          setValue={setSupplierProductCategory}
          required={true}
          options={supplierProductCategories}
        />
        <SelectSupplierCategory
          label="Status"
          value={status}
          setValue={setStatus}
          required={true}
          options={statusOptions}
        />
      </div>
      <div className="mt-5 col-span-3">
        <div className="flex gap-5 flex-wrap">
          <div>
            <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
          </div>

          <div>
            <ClearButton isLoading={isLoading} handleClick={clearHandler}>
              Cancel
            </ClearButton>
          </div>
        </div>
      </div>
    </form>
  );
};
export default UpdateSupplierForm;
