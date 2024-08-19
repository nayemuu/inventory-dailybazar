import React, { useEffect, useState } from "react";
import SubmitButton from "../../../../reuseable/buttons/SubmitButton/SubmitButton";
import Input from "../../../../reuseable/Inputs/Input/Input";
import ImageUpload from "../ImageUpload/ImageUpload";
import ClearButton from "../../../../reuseable/buttons/ClearButton/ClearButton";

function EditLocationFrom({ data, editId, setEditId, isSuccess }) {
  const [location, setLocation] = useState("");
  const [locationIcon, setLocationIcon] = useState(null);

  useEffect(() => {
    if (isSuccess && data && data?.results?.length) {
      const matchedItem = data.results.find((item) => item.id === editId);
      console.log("matchedItem = ", matchedItem);
      setLocation(matchedItem.name);
      if (!matchedItem?.icon) {
        setLocationIcon(null);
      }
    }
  }, [editId, isSuccess, data]);

  let matchedItem;

  if (isSuccess && data && data?.results?.length) {
    matchedItem = data.results.find((item) => item.id === editId);
  }

  const clearHandler = () => {
    setEditId(null);
    setLocation("");
    setLocationIcon(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("location = ", location);
    console.log("locationIcon = ", locationIcon);
  };

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
            />
          </div>

          <div className="mt-5">
            <div className="flex gap-5 flex-wrap">
              <div className="max-w-[200px] w-full">
                <SubmitButton isLoading={false} disable={false}>
                  Edit Location
                </SubmitButton>
              </div>

              <div className="max-w-[140px] w-full">
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

export default EditLocationFrom;
