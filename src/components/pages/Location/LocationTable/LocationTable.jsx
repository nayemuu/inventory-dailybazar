import React, { useState } from 'react';
import LocationTableRow from './LocationTableRow';

const LocationTable = ({ data }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  // console.log('selectedIds = ', selectedIds);

  let headers = ['Location Id', 'Location Name', 'Icon'];

  let actionButtons = {
    view: true,
    edit: true,
    delete: true,
  };

  const handleSingleCheckBox = (id) => {
    if (selectedIds.includes(id)) {
      let newSelectedIds = selectedIds.filter((singleId) => singleId !== id);
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds((previousState) => [id, ...previousState]);
    }
  };

  const handleAllCheckBox = () => {
    if (data.length !== selectedIds.length) {
      let allIds = [];

      data.map((item) => {
        allIds.push(item.id);
      });

      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleView = (id) => {
    console.log('id = ', id);
  };

  const handleEdit = (id) => {
    console.log('id = ', id);
  };

  const handleDelete = (id) => {
    console.log('id = ', id);
  };

  let content = <></>;

  if (data?.length) {
    content = (
      <tbody className="divide-y divide-[#DCE0E4] dark:divide-gray-700">
        {data.map((item, index) => (
          <LocationTableRow
            key={index}
            item={item}
            index={index}
            handleSingleCheckBox={handleSingleCheckBox}
            selectedIds={selectedIds}
            actionButtons={actionButtons}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    );
  }

  return (
    <div>
      <div className="section-title">Location Table</div>

      <div className="flex flex-col mt-5">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-[#DCE0E4]">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 ps-4">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          onClick={handleAllCheckBox}
                        />
                      </div>
                    </th>

                    {headers.map((header, index) => (
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm font-medium text-gray-500"
                        key={index}
                      >
                        {header}
                      </th>
                    ))}

                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm font-medium text-gray-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {content}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTable;
