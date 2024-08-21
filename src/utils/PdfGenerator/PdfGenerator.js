import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const addPageNumber = (doc, head) => {
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

const exportPdf = (pdfTitle, head, data, fieldToShow, isSelected = false) => {
  if (isSelected) {
    pdfTitle = `${pdfTitle} (Selected)`;
  }
  const document = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  });

  //   Header Title
  const pageWidth = document.internal.pageSize.width;
  const titleWidth = document.getTextDimensions(pdfTitle).w;
  const x = (pageWidth - titleWidth) / 2;
  document.text(pdfTitle, x, 14);

  // console.log('data = ', data);
  // console.log('fieldToShow = ', fieldToShow);

  const tableRows = [];

  data.map((item) => {
    let singleRow = [];
    // console.log('item = ', item);

    fieldToShow.map((targetField) => {
      // console.log('targetField = ', targetField);
      // console.log('item = ', item);
      // console.log('item.targetField = ', item.targetField);
      // avobe style is not working

      // console.log('item.targetField = ', item[targetField]);
      singleRow.push(item[targetField]);
    });

    // console.log('singleRow = ', singleRow);
    tableRows.push(singleRow);
  });

  // console.log('tableRows = ', tableRows);

  autoTable(document, {
    startY: 20,
    head: head,
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
  document.save(
    `${pdfTitle.split(" ").join("_")}_${date.toLocaleTimeString()}`
  );
};

export default exportPdf;
