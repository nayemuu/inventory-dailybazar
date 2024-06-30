import CommonSectionTableRow from './CommonSectionTableRow';

function CommonSectionTable(props) {
  const {
    title,
    totalColumnForData,
    headers,
    data,
    fieldToShow,
    handleSingleCheckBox,
    handleAllCheckBox,
    selectedIds,
    actionButtons,
    handleView,
    handleEdit,
    handleDelete,
  } = props;

  if (!title) {
    return alert('title is missing');
  }
  if (!headers) {
    return alert('headers is missing');
  }

  if (totalColumnForData !== headers.length) {
    return alert(
      `headers length - (${headers.length}) did not match total number of columnn for Data - (${totalColumnForData})`
    );
  }

  let content = <></>;

  if (data.length) {
    content = (
      <tbody className="divide-y divide-[#DCE0E4] dark:divide-gray-700">
        {data.map((item, index) => (
          <CommonSectionTableRow
            key={index}
            item={item}
            fieldToShow={fieldToShow}
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
      <div className="section-title">{title}</div>

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
}

export default CommonSectionTable;
