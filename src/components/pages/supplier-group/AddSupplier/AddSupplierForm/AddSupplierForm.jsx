import { useState } from "react";
import Input from "../../../../reuseable/Inputs/Input/Input";
import SelectSupplierCategory from "./SelectSupplierCategory/SelectSupplierCategory";
import SubmitButton from "../../../../reuseable/buttons/SubmitButton/SubmitButton";
import ClearButton from "../../../../reuseable/buttons/ClearButton/ClearButton";

let supplierCategories = ["Local", "Foreign"];
let statusOptions = ["Active", "In Active"];
let supplierProductCategories = ["Pharmacy", "Other"];

const AddSupplierForm = () => {
  const [supplierCategory, setSupplierCategory] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [supplierProductCategory, setSupplierProductCategory] = useState("");
  const [status, setStatus] = useState("");

  let isLoading = false;

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
    console.log("supplierCategory = ", supplierCategory);
    console.log("supplierName = ", supplierName);
    console.log("supplierAddress = ", supplierAddress);
    console.log("contactNumber = ", contactNumber);
    console.log("emailAddress = ", emailAddress);
    console.log("contactPerson = ", contactPerson);
    console.log("supplierProductCategory = ", supplierProductCategory);
    console.log("status = ", status);
  };

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
          label="Status"
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
            <SubmitButton isLoading={isLoading}>Update Location</SubmitButton>
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
  );
};
export default AddSupplierForm;
