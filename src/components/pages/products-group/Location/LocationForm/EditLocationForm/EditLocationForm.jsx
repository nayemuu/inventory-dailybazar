import React, { useEffect, useState } from "react";
import SubmitButton from "../../../../../reuseable/buttons/SubmitButton/SubmitButton";
import Input from "../../../../../reuseable/Inputs/Input/Input";
import ImageUpload from "../ImageUpload/ImageUpload";
import ClearButton from "../../../../../reuseable/buttons/ClearButton/ClearButton";
import { useUpdateLocationMutation } from "../../../../../../redux/features/location/locationApi";
import {
  errorToastMessage,
  successToastMessage,
} from "../../../../../../utils/toastifyUtils";

function EditLocationForm({ data, editId, setEditId }) {
  const [location, setLocation] = useState("");
  const [locationIcon, setLocationIcon] = useState(null);

  const [
    updateLocation,
    { isLoading, isError, isSuccess, data: updateLocationData, error },
  ] = useUpdateLocationMutation();

  useEffect(() => {
    if (data && data?.results?.length) {
      const matchedItem = data.results.find((item) => item.id === editId);
      // console.log("matchedItem = ", matchedItem);
      setLocation(matchedItem.name);
      if (!matchedItem?.icon) {
        setLocationIcon(null);
      }
    }
  }, [editId, data]);

  let matchedItem;

  if (data && data?.results?.length) {
    matchedItem = data.results.find((item) => item.id === editId);
  }

  const clearHandler = () => {
    setEditId(null);
    setLocation("");
    setLocationIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("location = ", location);
    // console.log("locationIcon = ", locationIcon);

    const formData = new FormData();
    formData.append("id", editId);
    formData.append("name", location);
    if (locationIcon) {
      formData.append("icon", locationIcon);
    }
    // successToastMessage('Location Created Successfully');
    updateLocation(formData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      clearHandler();
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
      <div className="section-title">Edit Location</div>

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
              matchedItem={matchedItem}
              title="Location"
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

export default EditLocationForm;
