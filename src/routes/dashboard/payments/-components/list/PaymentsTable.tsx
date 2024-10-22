import {
  PropertyStaffListResponse,
  PropertyShopsResponse,
  PropertyShopPaymentsResponse,
} from "@/lib/pb/database";
import { getNestedProperty } from "@/utils/object";
import { PossibleNestedUnions } from "@/utils/types/nested_objects_union";
import { ListResult } from "pocketbase";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import { Button } from "@/components/shadcn/ui/button";
import { Edit } from "lucide-react";
import { UpdatePaymentFormDrawer } from "../form/UpdatePaymentForm";

interface PaymentsTableProps {
  data: ListResult<
    PropertyShopPaymentsResponse & {
      expand?:
        | {
            staff?: PropertyStaffListResponse | undefined;
            shop?: PropertyShopsResponse | undefined;
          }
        | undefined;
    }
  >;
}

type PaymentstableColumn<T extends Record<string, any>> = {
  label: string;
  accessor: PossibleNestedUnions<T> | PossibleNestedUnions<T["expand"]>;
};

export function PaymentsTable({ data }: PaymentsTableProps) {
  const columns: PaymentstableColumn<typeof data["items"][number]>[] = [
      {
        accessor: "reciept_number",
        label: "Reciept Number",
      },
    {
      label: "Amout",
      accessor: "amount",
    },
    { label: "Month", accessor: "month" },
    { label: "Year", accessor: "year" },
    {accessor:"type",label:"Type"},
    {accessor:"shop.shop_number",label:"Shop"},
    {accessor:"staff.name",label:"Staff"},
  ];
  return (
    <div className="overflow-x-auto w-[99vw]">
      <table className="table table-zebra table-lg w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.label}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => {
                if (column.accessor.includes(".")) {
                  const value = getNestedProperty(
                    row,
                    `expand.${column.accessor}`,
                  );
                  return <td key={column.accessor}>{value}</td>;
                }
                //   @ts-expect-error
                return <td key={column.accessor}>{row?.[column?.accessor]}</td>;
              })}
              <td>
                <UpdatePaymentFormDrawer row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


interface PaymentsTableUpdateDrawerProps {

}

export function PaymentsTableUpdateDrawer({}:PaymentsTableUpdateDrawerProps){
return (
  <Drawer>
    <DrawerTrigger asChild>
        <Edit className="size-5" />
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="flex w-full flex-col gap-2">
          <h1 className="font-bol text-4xl">NIce DrawerDescription 1</h1>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
);
}
