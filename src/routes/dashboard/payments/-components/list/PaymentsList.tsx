import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryEror";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listPropertyQueryOptions } from "../query-options/payments-query-options";
import { GenericTable } from "@/components/wrappers/GenericTable";
import { pb } from "@/lib/pb/client";
import { GenericPocketbaseGenericTable } from "@/lib/pb/components/PocketbaseGenericTable";
import { and, eq, like, ResolveSelectWithExpand } from "typed-pocketbase";
import { PropertyShopPaymentsCollection } from "@/lib/pb/database";
import { WeekNumberClickEventHandler } from "react-day-picker";
interface PaymentsListProps {
  keyword: string;
  month: number;
  year: number;
  page: number;
}

export function PaymentsList({
  keyword,
  month,
  year,
  page,
}: PaymentsListProps) {
  const query = useSuspenseQuery(
    listPropertyQueryOptions({ keyword, month, year, page }),
  );
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={new Error("No shops found")} />
      </div>
    );
  }
            // pb.from("property_shop_payments").getList(page, 24, {
            //   filter: and(
            //     like("shop.id",""),
            //     // eq("verified", "yes")
            //   ),
            // })

console.log("data", data)

const response_request  =[
    {
        "amount": 24000,
        "collectionId": "fp554yfudhhy15m",
        "collectionName": "property_shop_payments",
        "created": "2024-10-17 17:22:58.714Z",
        "expand": {
            "shop": {
                "collectionId": "zb1etrv0i3olw5p",
                "collectionName": "property_shops",
                "created": "2023-05-02 18:14:37.962Z",
                "id": "0i79mudp364idlq",
                "is_vacant": false,
                "monthly_rent": 0,
                "order": 1,
                "shop_number": "G-30",
                "tenant": "56qjhbgavtxf5l9",
                "updated": "2024-07-02 15:46:19.100Z",
                "utils": "elec"
            },
            "staff": {
                "account": "u7rqcc2vlrmvqtd",
                "collectionId": "oaggjwaw3gz12ah",
                "collectionName": "property_staff_list",
                "created": "2024-07-02 07:36:58.906Z",
                "id": "1vmosq4gghb2m63",
                "name": "dennis",
                "updated": "2024-07-08 16:01:52.320Z"
            }
        },
        "id": "1he7przii7k8jkk",
        "month": 10,
        "reciept_number": "uwu1010",
        "shop": "0i79mudp364idlq",
        "staff": "1vmosq4gghb2m63",
        "type": "rent",
        "updated": "2024-10-17 17:22:58.714Z",
        "year": 2024
    },
    {
        "amount": 20000,
        "collectionId": "fp554yfudhhy15m",
        "collectionName": "property_shop_payments",
        "created": "2024-10-17 17:15:49.249Z",
        "expand": {
            "shop": {
                "collectionId": "zb1etrv0i3olw5p",
                "collectionName": "property_shops",
                "created": "2024-01-03 10:43:10.548Z",
                "id": "fk1jpmkxutc8tht",
                "is_vacant": false,
                "monthly_rent": 40000,
                "order": 22,
                "shop_number": "M2-06",
                "tenant": "s451e6khdejprb5",
                "updated": "2024-10-17 17:20:50.424Z",
                "utils": "both"
            },
            "staff": {
                "account": "u7rqcc2vlrmvqtd",
                "collectionId": "oaggjwaw3gz12ah",
                "collectionName": "property_staff_list",
                "created": "2024-07-02 07:36:58.906Z",
                "id": "1vmosq4gghb2m63",
                "name": "dennis",
                "updated": "2024-07-08 16:01:52.320Z"
            }
        },
        "id": "9lfhvir606an1fd",
        "month": 10,
        "reciept_number": "uw01",
        "shop": "fk1jpmkxutc8tht",
        "staff": "1vmosq4gghb2m63",
        "type": "elec",
        "updated": "2024-10-17 17:15:49.249Z",
        "year": 2024
    }
]

type RequestResponse = typeof response_request;
type OneRequestResponse = RequestResponse[number];
// type ExpandType = OneRequestResponse["expand"];
type KeyOfExpandType = keyof ExpandType;
type KeyOfExpandTypeObjects = keyof ExpandType[KeyOfExpandType] &
  keyof ExpandType[KeyOfExpandType];


type ExpandType = {
  shop: {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    is_vacant: boolean;
    monthly_rent: number;
    order: number;
    shop_number: string;
    tenant: string;
    updated: string;
    utils: string;
  };
  staff: {
    account: string;
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    name: string;
    updated: string;
  };
};

type NestedKeyPaths<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? `${Prefix}${string & K}` | NestedKeyPaths<T[K], `${Prefix}${string & K}.`>
    : `${Prefix}${string & K}`;
}[keyof T];

type AllKeys = NestedKeyPaths<ExpandType>;



  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <GenericPocketbaseGenericTable
        rows={data.items}
        updateItem={(item) =>
          pb.from("property_shop_payments").update(item.id, item)
        }
        mappedCollumns={() => [
          { label: "shop", type: "number", accessor: "shop.shop_number",
            expand:{
              collection:"property_shops" 
            } },
          { label: "month", type: "number", accessor: "month" },
          { label: "year", type: "number", accessor: "year" },
          { label: "amount", type: "number", accessor: "amount" },
          { label: "by", type: "number", accessor: "staff.name" },
        ]}

      />
    </div>
  );
}
