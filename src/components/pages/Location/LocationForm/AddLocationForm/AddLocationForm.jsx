import { useEffect, useState } from "react";
import Input from "../../../../reuseable/Inputs/Input/Input";
import ImageUpload from "../ImageUpload/ImageUpload";
import SubmitButton from "../../../../reuseable/buttons/SubmitButton/SubmitButton";
import { useAddLocationMutation } from "../../../../../redux/features/location/locationApi";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../utils/toastifyUtils";

const AddLocationForm = () => {
  const [location, setLocation] = useState("");
  const [locationIcon, setLocationIcon] = useState(null);

  const [addLocation, { isLoading, isError, isSuccess, data, error }] =
    useAddLocationMutation();

  const resetForm = () => {
    setLocation("");
    setLocationIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("location = ", location);
    // console.log("locationIcon = ", locationIcon);
    const formData = new FormData();
    formData.append("name", location);
    if (locationIcon) {
      formData.append("icon", locationIcon);
    }
    // successToastMessage('Location Created Successfully');
    addLocation(formData);
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

  return (
    <div>
      <div className="section-title">Add Location</div>

      <div className="mt-5">
        <form onSubmit={submitHandler}>
          <div className="grid gap-5">
            <Input
              inputType="text"
              label="Location Name"
              value={location}
              setValue={setLocation}
              required={true}
              // labelBackgroundColor="#f3f6fa"
            />

            <ImageUpload
              image={locationIcon}
              setImage={setLocationIcon}
              title="Location"
            />
          </div>

          <div className="mt-5">
            <div className="flex gap-5 flex-wrap">
              <div className="max-w-[200px] w-full">
                <SubmitButton isLoading={isLoading}>
                  Create Location
                </SubmitButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationForm;
