import {
  PropertyStaffListResponse,
  PropertyShopsResponse,
  PropertyShopPaymentsResponse,
} from "@/lib/pb/database";
import { getNestedProperty } from "@/utils/object";
import { PossibleNestedUnions } from "@/utils/types/nested_objects_union";
import { ListResult } from "pocketbase";
import { UpdatePaymentForm } from "../form/UpdatePaymentForm";

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
    <div className="overflow-x-auto">
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
                <UpdatePaymentForm row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


