import { convertToHtml } from "mammoth";
import HtmlTableToJson from "html-table-to-json";

export function parseRows(rows:Array<Record<string,any>>) {
  return rows.map((row) => {
      if (row["2"] === "") {
          return;
        }
        const new_row = {
            date:row["SEPTEMBER 2023"],
            description: row["2"],
            materials: row["3"],
            labour: row["4"],
            completion_date: row["5"],
            status: row["6"],
        }
    return new_row;
  });
}


export async function handleConvert(file: ArrayBuffer | null) {
    if (file) {
      try {
        const options = { };
        const result = await convertToHtml({ arrayBuffer: file }, options);
        const tableAsJson = HtmlTableToJson.parse(result.value)
  
        return {html: result.value, tableJson: tableAsJson._results};
      } catch (error) {
        console.error('Error converting file:', error);
        return
      }
    } else {
      console.error("File not found");
      return
    }
  };
