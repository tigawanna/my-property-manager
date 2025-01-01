import {
  PropertyStaffListResponse,
  PropertyShopsResponse,
  PropertyShopPaymentsResponse,
  PropertyTenantsListResponse,
} from "@/lib/pb/pb-types";
import { getNestedProperty } from "@/utils/object";
import { PossibleNestedUnions } from "@/utils/types/nested_objects_union";
import { ListResult } from "pocketbase";
import { UpdatePaymentForm } from "../form/UpdatePaymentForm";
import { useViewer } from "@/lib/tanstack/query/use-viewer";

interface PaymentsTableProps {
  data: ListResult<
    PropertyShopPaymentsResponse & {
      expand?:
        | {
            staff?: PropertyStaffListResponse | undefined;
            shop?:
              | (PropertyShopsResponse & {
                  expand?:
                    | {
                        tenant?: PropertyTenantsListResponse | undefined;
                      }
                    | undefined;
                })
              | undefined;
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
  const columns: PaymentstableColumn<(typeof data)["items"][number]>[] = [
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
    { accessor: "type", label: "Type" },
    { accessor: "shop.shop_number", label: "Shop" },
  ] as const;
  const { role } = useViewer();
  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-zebra table-lg w-full">
        <thead>
          <tr>
            <th>name</th>
            {columns.map((column) => {
              return <th key={column.accessor}>{column.label}</th>;
            })}
            {role === "staff" && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {data.items.map((row) => (
            <tr key={row.id}>
              <td>{row?.expand?.shop?.expand?.tenant?.name}</td>
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
              {role === "staff" && (
                <td>
                  <UpdatePaymentForm row={row} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

