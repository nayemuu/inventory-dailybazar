import { useEffect, useState } from 'react';

const LocationTableRow = (props) => {
  const {
    item,
    index,
    handleSingleCheckBox,
    selectedIds,
    actionButtons,
    handleView,
    handleEdit,
    handleDelete,
  } = props;

  const [isSelected, setIsSelected] = useState(false);
  const [hoveredOnViewIcon, setHoveredOnViewIcon] = useState(false);
  const [hoveredOnEditIcon, setHoveredOnEditIcon] = useState(false);
  const [hoveredOnDeleteIcon, setHoveredOnDeleteIcon] = useState(false);

  useEffect(() => {
    if (selectedIds.includes(item.id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedIds]);

  //   console.log('item = ', item);

  return (
    <tr className="hover:bg-[#eee]" key={index}>
      <td className="py-3 ps-4" key={item.id}>
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="border-[#DCE0E4] rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            onChange={() => handleSingleCheckBox(item.id)}
            checked={isSelected}
          />
        </div>
      </td>

      {/* {fieldToShow.map((targetField, i) =>
        item[targetField] ? (
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
            key={i}
          >
            {item[targetField]}
          </td>
        ) : (
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600"
            key={i}
          >
            {handleAlert(index, targetField)}
          </td>
        )
      )} */}

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {item.id}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {item.name}
      </td>

      {item?.icon ? (
        <td>
          <div className="flex items-center">
            <img
              src={item.icon}
              className="object-contain h-[55px] w-[55px] m-1"
            />
          </div>
        </td>
      ) : (
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
          missing
        </td>
      )}

      <td
        className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
        key={`${item.id}-action`}
      >
        <div className="h-full flex items-center gap-[8px]">
          {actionButtons.view && (
            <div
              className="h-full flex justify-center items-center cursor-pointer"
              onClick={() => handleView(item.id)}
              onMouseEnter={() => setHoveredOnViewIcon(true)}
              onMouseLeave={() => setHoveredOnViewIcon(false)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 13.5C13.1422 13.5 16.5 9 16.5 9C16.5 9 13.1422 4.5 9 4.5C4.85775 4.5 1.5 9 1.5 9C1.5 9 4.85775 13.5 9 13.5Z"
                  stroke={
                    hoveredOnViewIcon ? 'var(--primary-color)' : '#637381'
                  }
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 10.875C9.49728 10.875 9.97419 10.6775 10.3258 10.3258C10.6775 9.97419 10.875 9.49728 10.875 9C10.875 8.50272 10.6775 8.02581 10.3258 7.67417C9.97419 7.32254 9.49728 7.125 9 7.125C8.50272 7.125 8.02581 7.32254 7.67417 7.67417C7.32254 8.02581 7.125 8.50272 7.125 9C7.125 9.49728 7.32254 9.97419 7.67417 10.3258C8.02581 10.6775 8.50272 10.875 9 10.875Z"
                  stroke={
                    hoveredOnViewIcon ? 'var(--primary-color)' : '#637381'
                  }
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {actionButtons.edit && (
            <div
              className="h-full flex justify-center items-center cursor-pointer"
              onClick={() => handleEdit(item.id)}
              onMouseEnter={() => setHoveredOnEditIcon(true)}
              onMouseLeave={() => setHoveredOnEditIcon(false)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.125 14.625H16.875V15.75H1.125V14.625ZM14.2875 5.0625C14.7375 4.6125 14.7375 3.9375 14.2875 3.4875L12.2625 1.4625C11.8125 1.0125 11.1375 1.0125 10.6875 1.4625L2.25 9.9V13.5H5.85L14.2875 5.0625ZM11.475 2.25L13.5 4.275L11.8125 5.9625L9.7875 3.9375L11.475 2.25ZM3.375 12.375V10.35L9 4.725L11.025 6.75L5.4 12.375H3.375Z"
                  fill={hoveredOnEditIcon ? 'var(--primary-color)' : '#637381'}
                />
              </svg>
            </div>
          )}

          {actionButtons.delete && (
            <div
              className="h-full flex justify-center items-center cursor-pointer"
              onClick={() => handleDelete(item.id)}
              onMouseEnter={() => setHoveredOnDeleteIcon(true)}
              onMouseLeave={() => setHoveredOnDeleteIcon(false)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.71 1.5C11.0248 1.50008 11.3316 1.59921 11.587 1.78336C11.8423 1.9675 12.0333 2.22731 12.1327 2.526L12.54 3.75H15C15.1989 3.75 15.3897 3.82902 15.5303 3.96967C15.671 4.11032 15.75 4.30109 15.75 4.5C15.75 4.69891 15.671 4.88968 15.5303 5.03033C15.3897 5.17098 15.1989 5.25 15 5.25L14.9977 5.30325L14.3475 14.4105C14.3069 14.978 14.0529 15.509 13.6365 15.8967C13.2202 16.2844 12.6724 16.4999 12.1035 16.5H5.8965C5.32759 16.4999 4.77983 16.2844 4.36347 15.8967C3.94712 15.509 3.69308 14.978 3.6525 14.4105L3.00225 5.3025C3.00089 5.28503 3.00014 5.26752 3 5.25C2.80109 5.25 2.61032 5.17098 2.46967 5.03033C2.32902 4.88968 2.25 4.69891 2.25 4.5C2.25 4.30109 2.32902 4.11032 2.46967 3.96967C2.61032 3.82902 2.80109 3.75 3 3.75H5.46L5.86725 2.526C5.96677 2.22719 6.15783 1.96729 6.41332 1.78314C6.66882 1.59898 6.9758 1.49992 7.29075 1.5H10.7093H10.71ZM13.4977 5.25H4.50225L5.14875 14.3032C5.16221 14.4924 5.24683 14.6694 5.38557 14.7987C5.52431 14.928 5.70687 14.9999 5.8965 15H12.1035C12.2931 14.9999 12.4757 14.928 12.6144 14.7987C12.7532 14.6694 12.8378 14.4924 12.8512 14.3032L13.4977 5.25ZM7.5 7.5C7.6837 7.50002 7.861 7.56747 7.99828 7.68954C8.13556 7.81161 8.22326 7.97981 8.24475 8.16225L8.25 8.25V12C8.24979 12.1912 8.17659 12.375 8.04536 12.514C7.91414 12.653 7.73479 12.7367 7.54395 12.7479C7.35312 12.7591 7.16522 12.697 7.01863 12.5743C6.87204 12.4516 6.77783 12.2776 6.75525 12.0878L6.75 12V8.25C6.75 8.05109 6.82902 7.86032 6.96967 7.71967C7.11032 7.57902 7.30109 7.5 7.5 7.5ZM10.5 7.5C10.6989 7.5 10.8897 7.57902 11.0303 7.71967C11.171 7.86032 11.25 8.05109 11.25 8.25V12C11.25 12.1989 11.171 12.3897 11.0303 12.5303C10.8897 12.671 10.6989 12.75 10.5 12.75C10.3011 12.75 10.1103 12.671 9.96967 12.5303C9.82902 12.3897 9.75 12.1989 9.75 12V8.25C9.75 8.05109 9.82902 7.86032 9.96967 7.71967C10.1103 7.57902 10.3011 7.5 10.5 7.5ZM10.71 3H7.29L7.04025 3.75H10.9598L10.7093 3H10.71Z"
                  fill={hoveredOnDeleteIcon ? '#E40000' : '#637381'}
                />
              </svg>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default LocationTableRow;
