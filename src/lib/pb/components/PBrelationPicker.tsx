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
useGlobalPocketbaseSearchQuery({default_value:""})
  // console.log({ selectedRows });
  return (
    <div className="w-full h-full flex flex-col  gap-2 overflow-auto p-2">
      <div className="w-full px-3 flex flex-col md:flex-row justify-between gap-3 pr-5">
        <div className="w-full">
          <h1 className="text-2xl bg-base-200 ">{fieldLabel}</h1>
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
      <div className="w-full h-[95%]">
        <ul className="w-full p-2 flex flex-wrap gap-2 overflow-clip max-h-[25%]">
          <li>{selectedRows?.length} selected</li>
          {selectedRows?.slice?.(0, 5)?.map((item) => (
            <li
              key={item.id}
              className="bg-secondary rounded-lg px-2 text-center"
            >
              {item[filterBy as any]}
            </li>
          ))}
          {selectedRows?.length > 5 && <li>......</li>}
        </ul>

        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={i}
                  className="h-8 w-[95%]   bg-base-300/40 skeleton gap-2 rounded-lg"
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
      <DialogTrigger asChild >
        {dialogTrigger || (
          <span className="cursor-pointer flex gap-1  btn btn-outline  p-2">
            <GitFork className="" /> Pick relations
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] w-full h-[80%] overflow-auto ">
        <DialogTitle>{fieldLabel} relation</DialogTitle>
        <DialogDescription>Pick a relation for {fieldLabel}</DialogDescription>
        <div className="w-full  h-[95%] overflow-y-scroll">
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
        <DialogClose className="flex gap-3 btn btn-wide btn-sm ">
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
    <div className="w-full h-full flex flex-wrap  gap-2 ">
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
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {selectedRows?.map((item) => (
          <div
            key={item.id}
            className="border-2 border-secondary rounded-lg px-2  flex items-center justify-center"
          >
            <div className=" w-full h-full flex justify-center items-center">
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
