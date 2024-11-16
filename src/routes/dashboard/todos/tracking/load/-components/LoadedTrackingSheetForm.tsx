import { useState } from "react";
import { TrackingSheetRow } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Edit } from "lucide-react";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { Input } from "@/components/shadcn/ui/input";

interface LoadedTrackingSheetFormProps {
  oneRow: TrackingSheetRow;
  setTrackingSheet: (
    value: (prev: TrackingSheetRow[]) => TrackingSheetRow[],
  ) => void;
}

export function LoadedTrackingSheetForm({
  oneRow,
  setTrackingSheet,
}: LoadedTrackingSheetFormProps) {
  const [input, setInut] = useState<TrackingSheetRow>({
    date: oneRow.date ?? "",
    description: oneRow.description ?? "",
    materials: oneRow.materials ?? "",
    labour: oneRow.labour ?? "",
    completion_date: oneRow.completion_date ?? "",
    status: oneRow.status ?? "",
  });
  function hnadleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setInut({ ...input, [e.target.name]: e.target.value });
  }
  function handleSubmit() {
    setTrackingSheet((prev) => {
      const index = prev.findIndex((row) => row.date === oneRow.date);
      if (index !== -1) {
        const newRows = [...prev];
        newRows[index] = input;
        return newRows;
      }
      return prev;
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="size-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Row</DialogTitle>
          <DialogDescription className="sr-only">
            {" "}
            Modal to edit row
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">
                Date
              </label>
             <Input
                type="date"
                id="date"
                name="date"
                value={input.date}
                onChange={hnadleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={input.description}
                onChange={hnadleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="materials" className="text-right">
                Materials
              </label>
             <Input
                type="text"
                id="materials"
                name="materials"
                value={input.materials}
                onChange={hnadleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="labour" className="text-right">
                Labour
              </label>
             <Input
                type="text"
                id="labour"
                name="labour"
                value={input.labour}
                onChange={hnadleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="completion_date" className="text-right">
                Completion Date
              </label>
              <Input
                type="date"
                id="completion_date"
                name="completion_date"
                value={input.completion_date}
                onChange={hnadleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
             <Input
                type="text"
                id="status"
                name="status"
                value={input.status}
                onChange={hnadleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <button type="submit" className="btn">
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
