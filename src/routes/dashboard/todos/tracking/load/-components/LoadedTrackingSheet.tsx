import { useState } from "react";
import { TrackingSheetRow } from "./utils";
import { LoadFromDocxModal } from "./LoadDocument";
import { getNestedProperty } from "@/utils/object";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { LoadedTrackingSheetForm } from "./LoadedTrackingSheetForm";
import { useTrackingSheetStore } from "@/store/tacking-sheet-store";

interface LoadedTrackingSheetProps {}
type LoadedTrackingSheetColumn = {
  label: string;
  accessor: keyof TrackingSheetRow;
};

export function LoadedTrackingSheet({}: LoadedTrackingSheetProps) {
  const { isMobile } = useSidebar();
  const columns: LoadedTrackingSheetColumn[] = [
    { accessor: "date",label: "Date"},
    { label: "Description",accessor: "description"},
    { label: "Materials", accessor: "materials" },
    { label: "Labour", accessor: "labour" },
    { accessor: "status", label: "status" },
    { accessor: "completion_date", label: "completed" },
  ];
  const { trackingSheet, setTrackingSheet } = useTrackingSheetStore();
  useTrackingSheetStore();
  if (isMobile) {
    return (
      <ul className="flex w-[90%] flex-wrap justify-center gap-2">
        <LoadFromDocxModal />
        {trackingSheet.map((row) => (
          <li key={row.date} className="rounded-lg bg-base-300 p-2">
            <ul>
              {columns.map((column) => (
                <li key={column.accessor}>
                  <span className="font-bold">{column.label}: </span>
                  {row[column.accessor]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto p-5">
      <LoadFromDocxModal />
      <table className="table table-zebra table-pin-rows table-pin-cols table-lg w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.label}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {trackingSheet.map((row) => (
            <tr key={row.date}>
              {columns.map((column) => {
                if (column.accessor.includes(".")) {
                  const value = getNestedProperty(
                    row,
                    `expand.${column.accessor}`,
                  );
                  return <td key={column.accessor}>{value}</td>;
                }

                return <td key={column.accessor}>{row?.[column?.accessor]}</td>;
              })}
              <td>
                <LoadedTrackingSheetForm
                  oneRow={row}
                  setTrackingSheet={setTrackingSheet}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
