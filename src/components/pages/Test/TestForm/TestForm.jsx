import { useState } from 'react';
import Input from '../../../reuseable/Inputs/Input/Input';
import Select from './Select/Select';
import ImageUpload from './ImageUpload/ImageUpload';
import SubmitButton from '../../../reuseable/buttons/SubmitButton/SubmitButton';

let locations = [
  'Medicines',
  'Food Box',
  'Body Care',
  'Private Box',
  'Medicines2',
  'Food Box2',
  'Body Care2',
  'Private Box2',
];

function TestForm() {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [locationIcon, setLocationIcon] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const resetForm = () => {
    setCategory('');
    setLocation('');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('category = ', category);
    console.log('location = ', location);

    //resetForm();
  };

  return (
    <div>
      <div className="section-title">Add Products Category</div>

      <div className="mt-5">
        <form onSubmit={submitHandler}>
          <div className="grid gap-5">
            <Input
              inputType="text"
              label="Category"
              value={category}
              setValue={setCategory}
              required={true}
              // labelBackgroundColor="#f3f6fa"
            />

            <Select
              label="Location"
              value={location}
              setValue={setLocation}
              required={true}
              options={locations}
              // labelBackgroundColor="#f3f6fa"
            />

            <ImageUpload image={locationIcon} setImage={setLocationIcon} />
          </div>

          <div className="mt-5">
            <div className="flex gap-5 flex-wrap">
              <div className="max-w-[200px] w-full">
                <SubmitButton isLoading={false} disable={false}>
                  Create Category
                </SubmitButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestForm;
