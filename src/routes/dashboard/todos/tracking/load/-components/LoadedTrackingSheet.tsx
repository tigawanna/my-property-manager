import { useState } from "react";
import { TrackingSheetRow } from "./utils";
import { LoadFromDocxModal } from "./LoadDocument";
import { getNestedProperty } from "@/utils/object";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { LoadedTrackingSheetForm } from "./LoadedTrackingSheetForm";
import { useTrackingSheetStore } from "@/store/tacking-sheet-store";
import { cva } from "class-variance-authority";
import { cn } from "@/components/shadcn/lib/utils";
import { X } from "lucide-react";

interface LoadedTrackingSheetProps {}
type LoadedTrackingSheetColumn = {
  label: string;
  accessor: keyof TrackingSheetRow;
};

export function LoadedTrackingSheet({}: LoadedTrackingSheetProps) {
  const { isMobile } = useSidebar();
  const columns: LoadedTrackingSheetColumn[] = [
    { accessor: "date", label: "Date" },
    { label: "Description", accessor: "description" },
    { label: "Materials", accessor: "materials" },
    { label: "Labour", accessor: "labour" },
    { accessor: "status", label: "status" },
    { accessor: "completion_date", label: "completed" },
  ];
  const { trackingSheet, setTrackingSheet, removeRow } =
  useTrackingSheetStore();
  useTrackingSheetStore();

  const statusVariants = cva("badge badge-primary badge-outline", {
    variants: {
      variant: {
        default: "",
        "Work done": "badge-success text-success",
        Done: "badge-success text-success",
        "EmergencyWork done": "badge-success text-success",
        "Emergency corrected.Work done": "badge-success  text-success",
        "Emergency corrected.Work done.": "badge-success text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });
  if (isMobile) {
    return (
      <ul className="flex w-[90%] flex-col justify-center gap-2">
        {trackingSheet.map((row, idx) => (
          <li
            key={row.date + idx}
            className="flex flex-col gap-2 rounded-lg bg-base-300 p-2"
          >
            <div className="flex w-full items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold">Date</span> {row.date}
              </div>
              <div className="flex gap-2">
                <div
                  className={cn(
                    statusVariants({ variant: row.status }),
                    "flex min-w-fit items-center gap-2 text-sm",
                  )}
                >
                  <span className="font-bold">status</span> {row.status}
                </div>
                <LoadedTrackingSheetForm
                  oneRow={row}
                  setTrackingSheet={setTrackingSheet}
                />
                <X
                  onClick={() => removeRow(row)}
                  className="size-5 cursor-pointer text-error"
                />
              </div>
            </div>
            {/* description */}
            <div className="flex w-full flex-col justify-between text-sm">
              <span className="font-bold">Description:</span> {row.description}
            </div>
            {/* materials and labour */}
            <div className="flex w-full items-center justify-between gap-2 border-t text-sm">
              <div className="flex w-full items-center gap-2 text-sm">
                <span className="font-bold">Materials:</span> {row.materials}
              </div>
              <div className="flex w-full items-center gap-2 text-sm">
                <span className="font-bold">Labour:</span> {row.labour}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto p-5">
      <table className="table table-zebra table-pin-rows table-pin-cols table-lg w-full">
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={column.accessor + idx}>{column.label}</th>
            ))}
            <th>Edit</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {trackingSheet.map((row, idx) => (
            <tr key={row.date + idx}>
              {columns.map((column, idx) => {
                if (column.accessor === "status") {
                  return (
                    <td key={column.accessor}>
                      {
                        <span
                          className={cn(
                            statusVariants({ variant: row.status }),
                            "badge-lg flex h-full min-h-fit min-w-fit items-center gap-2 rounded-sm text-sm",
                          )}
                        >
                          {row?.[column?.accessor]}
                        </span>
                      }
                    </td>
                  );
                }
                return <td key={column.accessor}>{row?.[column?.accessor]}</td>;
              })}
              <td>
                <LoadedTrackingSheetForm
                  oneRow={row}
                  setTrackingSheet={setTrackingSheet}
                />
              </td>
              <td>
                <X
                  onClick={() => removeRow(row)}
                  className="cursor-pointer text-error hover:border hover:border-error"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
