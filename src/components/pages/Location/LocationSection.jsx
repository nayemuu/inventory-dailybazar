import { useState } from 'react';
import SectionHeaderActions from '../../reuseable/Section/SectionHeaderActions/SectionHeaderActions';
import LocationTable from './LocationTable/LocationTable';
import LocationFrom from './LocationFrom/LocationFrom';

const LocationSection = () => {
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  let data = [
    { id: 1, category: 'Baby food', location: 'Foodbox', status: 'pending' },
    { id: 2, category: 'Skin Care', location: 'bodycare' },
    { id: 3, category: 'Medicine', location: 'medicare' },
  ];

  const handlePdf = () => {
    console.log('inside handlePdf');
  };

  const handleExcel = () => {
    console.log('inside handleExcel');
  };

  const handlePrint = () => {
    console.log('inside handlePrint');
  };

  const fileExportsOptions = {
    pdf: {
      available: true,
      handlePdf: handlePdf,
    },
    excel: {
      available: true,
      handleExcel: handleExcel,
    },
    print: {
      available: true,
      handlePrint: handlePrint,
    },
  };

  return (
    <div className="section-card">
      <SectionHeaderActions
        fileExportsOptions={fileExportsOptions}
        searchText={searchText}
        setSearchText={setSearchText}
        searchBarStatus={searchBarStatus}
        setSearchBarStatus={setSearchBarStatus}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <div className="grid grid-cols-12 mt-6  gap-y-[40px] xl:gap-x-[40px]">
        <div className="col-span-12 xl:col-span-8 order-2 xl:order-1">
          <LocationTable data={data} />
        </div>
        <div className="col-span-12 xl:col-span-4 order-1 xl:order-2">
          <LocationFrom />
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
