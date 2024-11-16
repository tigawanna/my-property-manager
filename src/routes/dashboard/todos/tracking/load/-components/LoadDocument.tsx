import { useState } from "react";
import { handleConvert, parseRows, TrackingSheetRow } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";

import { useTrackingSheetStore } from "@/store/tacking-sheet-store";
import { FolderPlus } from "lucide-react";

interface LoadFromDocxModalProps {

}

export function LoadFromDocxModal({

}: LoadFromDocxModalProps) {
  const {setTrackingSheet} = useTrackingSheetStore()
  const [file, setFile] = useState<ArrayBuffer | null>(null);

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
    <Dialog>
      <DialogTrigger>
        <span className="btn btn-outline btn-secondary btn-sm btn-wide">
          Load Document
          <FolderPlus />
        </span>
      </DialogTrigger>
      <DialogContent className="flex w-full flex-col gap-5">
        <DialogHeader>
          <DialogTitle>Load Document</DialogTitle>
          <DialogDescription className="sr-only">
            Modal for loading word document
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-3">
          <input
            onChange={handleFileChange}
            type="file"
            accept=".docx"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
          />
        </div>
        <DialogFooter className="flex w-full items-center justify-center">
          {file && (
            <button
              className="btn btn-sm btn-wide"
              onClick={() => {
                handleConvert(file).then((res) => {
                  if (res) {
                    setTrackingSheet((prev) => {
                      return parseRows(res.tableJson[0] as TrackingSheetRow[]);
                    });
                  }
                });
              }}
            >
              Convert
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
