import { useEffect, useState } from 'react';
import Input from '../../../reuseable/Inputs/Input/Input';
import ImageUpload from './ImageUpload/ImageUpload';
import SubmitButton from '../../../reuseable/buttons/SubmitButton/SubmitButton';
import { useAddLocationMutation } from '../../../../redux/features/location/locationApi';

const LocationFrom = () => {
  const [location, setLocation] = useState('');
  const [locationIcon, setLocationIcon] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const [addLocation, { isLoading, isError, isSuccess, data, error }] =
    useAddLocationMutation();

  const resetForm = () => {
    setLocation('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('location = ', location);
    console.log('locationIcon = ', locationIcon);
    const formData = new FormData();
    formData.append('name', location);
    formData.append('logo', locationIcon);
    addLocation(formData);

    //resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('data = ', data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log('error = ', error);
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

            <ImageUpload image={locationIcon} setImage={setLocationIcon} />
          </div>

          <div className="mt-5">
            <div className="flex gap-5 flex-wrap">
              <div className="max-w-[200px] w-full">
                <SubmitButton isLoading={false} disable={false}>
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

export default LocationFrom;
