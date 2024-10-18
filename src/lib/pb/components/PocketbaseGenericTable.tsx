import {
  FlatObjectKeys,
  PossibleNestedUnions,
} from "@/utils/types/nested_objects_union";
import { useMutation } from "@tanstack/react-query";
import { Edit, Loader } from "lucide-react";
import { useRef, useState } from "react";
import { PBPickRelationField } from "./PBrelationPicker";
import { CollectionName } from "../client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Check, GitFork, X } from "lucide-react";
type GenericPocketbaseGenericTableColumn<T extends Record<string, any>> = {
  label: string;
  type: "text" | "number" | "date";
  accessor: PossibleNestedUnions<T> | PossibleNestedUnions<T["expand"]>;
  expand?: {
    // filterBy: FlatObjectKeys<T["expand"]>;
    collection: CollectionName;
  };
};

interface GenericPocketbaseGenericTableProps<T extends Record<string, any>> {
  rows: T[];
  mappedCollumns: (row?: T) => GenericPocketbaseGenericTableColumn<T>[];
  updateItem?: (item: T) => Promise<any>;
}

function getNestedProperty(obj: any, path: string): any {
  const keys = path.split(".");
  return keys.reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

export function GenericPocketbaseGenericTable<T extends Record<string, any>>({
  rows,
  updateItem,
  mappedCollumns,
}: GenericPocketbaseGenericTableProps<T>) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const columns = mappedCollumns();

  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-zebra table-lg sticky top-0 w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.label}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => {
                if (column.accessor.includes(".")) {
                  const value = getNestedProperty(
                    row,
                    `expand.${column.accessor}`,
                  );
                  return <td key={row.id + column.accessor}>{value}</td>;
                }
                return (
                  <td key={row.id + column.accessor}>{row[column.accessor]}</td>
                );
              })}
              <td>
                <PocketbaseGenericTableModal
                  columns={columns}
                  row={row}
                  dialogTrigger={<Edit className="size-4" />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface PocketbaseGenericTableModalProps<T extends Record<string, any>> {
  columns: GenericPocketbaseGenericTableColumn<T>[];
  dialogTrigger?: React.ReactNode;
  row: T;
  updateItem?: (item: T) => Promise<any>;
}

export function PocketbaseGenericTableModal<T extends Record<string, any>>({
  dialogTrigger,
  updateItem,
  row,
  columns,
}: PocketbaseGenericTableModalProps<T>) {
  const [open, setOpen] = useState(false);
  const relations = columns.map((column) => {
    if (column.accessor.includes(".")) {
      return column.accessor;
    }
  });
  const uniqueRelations = new Set(
    relations.filter((v) => typeof v === "string"),
  );
  const [input, setInput] = useState<T>(row);

  const [expansions, setExpansions] = useState((prev = {}) => {
    uniqueRelations.forEach((relation) => {
      // @ts-expect-error
      prev[relation] = [];
    });
    return prev;
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(input);
  }
  const mutation = useMutation({
    mutationFn: (input: T) => {
      return updateItem
        ? updateItem?.(input)
        : new Promise((resolve) => resolve({}));
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {dialogTrigger || (
          <span className="btn btn-outline flex cursor-pointer gap-1 p-2">
            <GitFork className="" />
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="z-50 w-full gap-1 overflow-auto sm:max-w-[80%]">
        <DialogTitle className="">Update</DialogTitle>
        <DialogDescription className="sr-only">
          Form to update the data
        </DialogDescription>
        <div className="h-[95%] w-full overflow-y-scroll">
          <form
            className="flex w-full h-full py-3 flex-wrap items-center justify-center gap-2"
            onSubmit={handleSubmit}
          >
            {columns.map((column) => {
              if (column.accessor.includes(".") && column?.expand) {
                const relationKey = column.accessor.split(".")[0] as string;
                const relationField = column.accessor.split(".")[1] as string;
                const netsedrelationvalue = getNestedProperty(
                  input,
                  `expand.${column.accessor}`,
                );
                const collectionName = column?.expand?.collection;
                const selecetedRowvalue =
                // @ts-expect-error
                  expansions?.[column.accessor]?.[0]?.[relationField];
                return (
                  <div
                    key={column.accessor}
                    className="flex w-full justify-center gap-2"
                  >
                    <PBPickRelationField
                      dialogTrigger={
                        <span className="btn btn-outline btn-sm">
                          {selecetedRowvalue ?? netsedrelationvalue}
                          <Edit className="size-3" />
                        </span>
                      }
                      // @ts-expect-error
                      selectedRows={expansions[column.accessor]}
                      maxSelected={1}
                      setSelectedRows={(itm: any) => {
                        if (Array.isArray(itm)) {
                          setExpansions((prev) => ({
                            ...prev,
                            [column.accessor]: itm,
                          }));
                          setInput((prev) => ({
                            ...prev,
                            [relationKey]: (itm.at(0)?.id as any) ?? "",
                          }));
                        }
                      }}
                      collectionName={collectionName}
                      columns={{
                        [relationField]: {
                          name: relationField,
                        },
                      }}
                      fieldLabel={relationKey}
                      searchParamKey="ths"
                      filterBy={relationField as any}
                    />
                  </div>
                );
              }
              return (
                <div
                  key={column.accessor}
                  className="flex w-full flex-grow flex-col md:w-[40%]"
                >
                  <label className="label">
                    <span className="label-text">{column.label}</span>
                  </label>
                  <input
                    value={input[column.accessor]}
                    onChange={handleChange}
                    id={column.accessor}
                    name={column.accessor}
                    type={column.type}
                    placeholder={`Enter ${column.label}`}
                    className="input input-bordered w-full"
                  />
                </div>
              );
            })}
          </form>
        </div>
        <div className="flex w-full items-center justify-center">
          {updateItem && (
            <button
              type="button"
              className="btn btn-outline btn-primary btn-wide"
            >
              save{" "}
              {mutation.isPending && <Loader className="size-4 animate-spin" />}
            </button>
          )}
          <DialogClose className="btn btn-sm btn-wide flex gap-3">
            Done
            <Check className="h-5 w-5" />
          </DialogClose>
        </div>

        {/* <DialogFooter className="sm:justify-start">
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
