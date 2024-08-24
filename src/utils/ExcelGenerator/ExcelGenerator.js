// import XLSX from "xlsx";
import * as XLSX from "xlsx";

const exportExcel = (data, title) => {
  const sheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
  XLSX.writeFile(workbook, title);
};

export default exportExcel;
