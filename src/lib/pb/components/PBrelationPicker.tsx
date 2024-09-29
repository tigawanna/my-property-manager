import {
  PBListCollection,
  type PBListCollectioncolumn,
} from "./PBListCollection";
import { SearchBox } from "@/components/search/SearchBox";
import type { CollectionName } from "@/lib/pb/client";
import { Suspense, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Check, GitFork, X } from "lucide-react";
import { useGlobalPocketbaseSearchQuery } from "./use-search-query";

interface PBrelationPickerProps<T extends Record<string, any>> {
  fieldLabel: string;
  filterBy: keyof T;
  maxSelected: number;
  columns: Partial<PBListCollectioncolumn<T>>;
  collectionName: CollectionName;
  searchParamKey: string;
  selectedRows?: T[];
  setSelectedRows: (selectedRows: T[]) => void;
  dialogTrigger?: React.ReactNode;
}

export function PBrelationPicker<T extends Record<string, any>>({
  collectionName,
  columns,
  maxSelected,
  searchParamKey,
  filterBy,
  selectedRows = [],
  setSelectedRows,
  fieldLabel,
}: PBrelationPickerProps<T>) {
  const { isDebouncing, debouncedValue, setKeyword, keyword } =
    useGlobalPocketbaseSearchQuery({ default_value: "" });

  // const { searchParam } = useCustomSearchParams({
  //   key: searchParamKey,
  //   defaultValue: "1",
  // });
  useGlobalPocketbaseSearchQuery({ default_value: "" });
  // console.log({ selectedRows });
  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="flex w-full flex-col justify-between gap-3 px-3 pr-5 md:flex-row">
        <div className="w-full">
          <h1 className="bg-base-200 text-2xl">{fieldLabel}</h1>
        </div>

        <SearchBox
          inputProps={{
            placeholder: "type to search",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </div>
      <div className="h-[95%] w-full">
        <ul className="flex max-h-[25%] w-full flex-wrap gap-2 overflow-clip p-2">
          <li>{selectedRows?.length} selected</li>
          {selectedRows?.slice?.(0, 5)?.map((item) => (
            <li
              key={item.id}
              className="rounded-lg bg-secondary px-2 text-center"
            >
              {item[filterBy as any]}
            </li>
          ))}
          {selectedRows?.length > 5 && <li>......</li>}
        </ul>

        <Suspense
          fallback={
            <div className="flex h-full w-full flex-col gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={i}
                  className="skeleton h-8 w-[95%] gap-2 rounded-lg bg-base-300/40"
                />
              ))}
            </div>
          }
        >
          <PBListCollection<T>
            selectedRows={selectedRows}
            collectionName={collectionName}
            maxSelected={maxSelected}
            columns={columns}
            debouncedValue={debouncedValue}
            searchParam={keyword}
            searchParamKey={searchParamKey}
            filterBy={filterBy}
            setSelectedRows={(rows) => setSelectedRows(rows)}
          />
        </Suspense>
      </div>
    </div>
  );
}

export function PBPickRelationsModal<T extends Record<string, any>>({
  collectionName,
  columns,
  searchParamKey,
  maxSelected,
  filterBy,
  selectedRows,
  setSelectedRows,
  fieldLabel,
  dialogTrigger,
}: PBrelationPickerProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {dialogTrigger || (
          <span className="btn btn-outline flex cursor-pointer gap-1 p-2">
            <GitFork className="" /> Pick relations
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="h-[80%] w-full overflow-auto sm:max-w-[80%]">
        <DialogTitle>{fieldLabel} relation</DialogTitle>
        <DialogDescription>Pick a relation for {fieldLabel}</DialogDescription>
        <div className="h-[95%] w-full overflow-y-scroll">
          <PBrelationPicker
            collectionName={collectionName}
            columns={columns}
            maxSelected={maxSelected}
            searchParamKey={searchParamKey}
            filterBy={filterBy}
            fieldLabel={fieldLabel}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
          />
        </div>
        <DialogClose className="btn btn-sm btn-wide flex gap-3">
          Done
          <Check className="h-5 w-5" />
        </DialogClose>

        {/* <DialogFooter className="sm:justify-start">
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export function PBPickRelationField<T extends Record<string, any>>({
  collectionName,
  columns,
  searchParamKey,
  maxSelected,
  filterBy,
  selectedRows,
  setSelectedRows,
  fieldLabel,
  dialogTrigger,
}: PBrelationPickerProps<T>) {
  return (
    <div className="flex h-full w-full flex-wrap gap-2">
      <PBPickRelationsModal
        collectionName={collectionName}
        columns={columns}
        searchParamKey={searchParamKey}
        maxSelected={maxSelected}
        filterBy={filterBy}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        fieldLabel={fieldLabel}
        dialogTrigger={dialogTrigger}
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {selectedRows?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center rounded-lg border-2 border-secondary px-2"
          >
            <div className="flex h-full w-full items-center justify-center">
              {" "}
              {item[filterBy as any]}
            </div>

            <X
              className="size-5 hover:text-error"
              onClick={() => {
                setSelectedRows(selectedRows?.filter((i) => i.id !== item.id));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
