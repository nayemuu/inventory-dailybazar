import { useEffect, useState } from "react";
import Input from "../../../../reuseable/Inputs/Input/Input";
import SubmitButton from "../../../../reuseable/buttons/SubmitButton/SubmitButton";
import ClearButton from "../../../../reuseable/buttons/ClearButton/ClearButton";
import { errorToastMessage } from "../../../../../utils/toastifyUtils";
import SelectSupplierCategory from "../../../supplier-group/AddSupplier/AddSupplierForm/SelectSupplierCategory/SelectSupplierCategory";
import Select from "../../../../reuseable/Inputs/Select/Select";
let supplierCategories = ["Local", "Foreign"];
// let statusOptions = [
//   { title: "Active", value: true },
//   { title: "In Active", value: false },
// ];
let statusOptions = ["Active", "In Active"];
let supplierProductCategories = ["Pharmacy", "Other"];

let isLoading = false;

let categories = [
  {
    id: "66f91321768f202a860e5f81",
    name: "Phone",
    icon: "https://res.cloudinary.com/dltcw3hwa/image/upload/v1727599409/gwqrr5ja2vakpwrxprey.png",
    location: {
      id: "66f54387c8b3bb2b671acfb4",
      name: "Electronics",
    },
  },
  {
    id: "66f912ea768f202a860e5f79",
    name: "Laptop",
    icon: "https://res.cloudinary.com/dltcw3hwa/image/upload/v1727599338/a6gcuens7uq12ahrzqtt.jpg",
    location: {
      id: "66f54387c8b3bb2b671acfb4",
      name: "Electronics",
    },
  },
];

const AddProductForm = () => {
  const [productName, setProductName] = useState("");

  const [genericName, setGenericName] = useState("");
  const [subcategoryName1, setSubcategoryName1] = useState("");
  const [subcategoryName2, setSubcategoryName2] = useState("");
  const [subcategoryName3, setSubcategoryName3] = useState("");
  const [sizeUnits, setSizeUnits] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierCategory, setSupplierCategory] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [supplierProductCategory, setSupplierProductCategory] = useState("");
  const [status, setStatus] = useState("");

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
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       clearHandler();
  //     }
  //   }, [isSuccess]);
  return (
    <form onSubmit={submitHandler}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        <Input
          inputType="text"
          label="Product Name"
          value={productName}
          setValue={setProductName}
          defaultValue="Select Sub Category 1"
          required={true}
          // labelBackgroundColor="#f3f6fa"
        />

        <Select
          label="Sub Category 1"
          data={categories}
          valueField="id"
          titleField="name"
          required={true}
          setValue={setSubcategoryName1}
          defaultValue="Select Sub Category 1"
        />

        <Select
          label="Sub Category 2"
          data={categories}
          valueField="id"
          titleField="name"
          setValue={setSubcategoryName2}
          defaultValue="Select Sub Category 2"
        />

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

        {/* <SelectOptionsForBoolean
          label="Status"
          value={status}
          setValue={setStatus}
          required={true}
          options={statusOptions}
        /> */}
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
export default AddProductForm;
