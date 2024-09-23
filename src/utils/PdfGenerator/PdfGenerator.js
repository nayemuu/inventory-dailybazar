import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const getProperty = (obj, path) => {
  // Check if path is a valid string
  if (typeof path !== "string" || path.trim() === "") {
    throw new Error("Path must be a non-empty string.");
  }

  // Split the path into parts
  const parts = path.split(".");

  // Use reduce to access the nested property
  const value = parts.reduce((acc, part) => acc && acc[part], obj);

  // Return "N/A" if the value is falsy, otherwise return the value
  return value || "N/A";
};

const addPageNumber = (doc) => {
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(8);
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      "Page " + String(i) + " of " + String(pageCount),
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      {
        align: "center",
      }
    );
  }
};

const exportPdf = ({
  title,
  headers,
  data,
  fieldToShow,
  isSelected = false,
  orientation = "portrait",
}) => {
  if (isSelected) {
    title = `${title} (Selected)`;
  }
  const document = new jsPDF({
    orientation: orientation,
    unit: "mm",
    format: "a4",
  });

  //   Header Title
  const pageWidth = document.internal.pageSize.width;
  const titleWidth = document.getTextDimensions(title).w;
  const x = (pageWidth - titleWidth) / 2;
  document.text(title, x, 14);

  // console.log('data = ', data);
  // console.log('fieldToShow = ', fieldToShow);

  const tableRows = [];

  data.map((item) => {
    let singleRow = [];
    // console.log('item = ', item);

    fieldToShow.map((targetField) => {
      console.log("targetField = ", targetField);
      console.log("item = ", item);
      // console.log('item.targetField = ', item.targetField);
      // avobe style is not working

      // console.log("item.targetField = ", item[targetField]);

      // singleRow.push(item[targetField]);
      //In JavaScript, when you use bracket notation to access object properties, it only works with a single level of property access.

      singleRow.push(getProperty(item, targetField));
    });

    // console.log('singleRow = ', singleRow);
    tableRows.push(singleRow);
  });

  // console.log('tableRows = ', tableRows);

  autoTable(document, {
    startY: 20,
    head: headers,
    body: tableRows,
    theme: "plain", //default value was striped
    styles: { halign: "center", lineColor: "DCE0E4", lineWidth: 0.2 },
    headStyles: {
      textColor: "black",
      fillColor: "#fafbfe",
    },
  });

  addPageNumber(document);

  const date = new Date();
  document.save(`${title.split(" ").join("_")}_${date.toLocaleTimeString()}`);
};

export default exportPdf;
