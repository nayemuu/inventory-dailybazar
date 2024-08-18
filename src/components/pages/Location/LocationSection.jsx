import { useEffect, useState } from 'react';
import SectionHeaderActions from '../../reuseable/Section/SectionHeaderActions/SectionHeaderActions';
import LocationTable from './LocationTable/LocationTable';
import LocationFrom from './LocationFrom/LocationFrom';
import { useGetLocationQuery } from '../../../redux/features/location/locationApi';
import EditLocationFrom from './LocationFrom/EditLocationFrom/EditLocationFrom';

const LocationSection = () => {
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  console.log('editId = ', editId);
  console.log('searchText = ', searchText);

  const { isLoading, isError, isSuccess, isFetching, data, error, refetch } =
    useGetLocationQuery();

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('data = ', data);
  //   }
  // }, [isSuccess, data]);

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
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <div className="grid grid-cols-12 mt-6  gap-y-[40px] xl:gap-x-[40px]">
        <div className="col-span-12 xl:col-span-8 order-2 xl:order-1">
          <LocationTable
            isLoading={isLoading}
            data={data}
            editId={editId}
            setEditId={setEditId}
          />
        </div>
        <div className="col-span-12 xl:col-span-4 order-1 xl:order-2">
          {editId ? (
            <EditLocationFrom
              data={data}
              editId={editId}
              setEditId={setEditId}
            />
          ) : (
            <LocationFrom />
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
