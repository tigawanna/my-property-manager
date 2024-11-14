import { useState } from "react";
import { handleConvert } from "./utils";

interface LoadDocumentProps {}

export function LoadDocument({}: LoadDocumentProps) {
  const [tableJson, setTableJson] = useState({});
  const [file, setFile] = useState<ArrayBuffer | null>(null);
  const [html, setHtml] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        setFile(e.target.result);
      }
    };
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
    };
    reader.onabort = () => {
      console.log("File reading aborted");
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <input
        onChange={handleFileChange}
        type="file"
        accept=".docx"
        className="file-input w-full max-w-xs"
      />
{file&&      <button
        className="btn"
        onClick={() => {
          handleConvert(file).then((res) => {
            if (res) {
              setHtml(res.html);
              setTableJson(res.tableJson);
            }
          });
        }}
      >
        Convert
      </button>}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}
