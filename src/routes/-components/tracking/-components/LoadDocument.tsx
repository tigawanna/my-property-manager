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

    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    // The FileReader API is used to read the contents of a Blob or File.
    // It makes it possible to read the contents of a file in JavaScript.
    const reader = new FileReader();

    // The onload event is fired when the file has been read successfully.
    // The event handler is passed the result of the file read as an argument.
    // The result is an ArrayBuffer which is a typed array of integers.
    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        setFile(e.target.result);
      }
    };

    // The onerror event is fired when there is an error reading the file.
    // The event handler is passed the error as an argument.
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
    };

    // The onabort event is fired when the file read has been aborted.
    // The event handler is passed no arguments.
    reader.onabort = () => {
      console.log("File reading aborted");
    };

    // Start the file read by calling the readAsArrayBuffer method.
    // This method takes a Blob or File as an argument.
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
      {file && (
        <button
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
        </button>
      )}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}
