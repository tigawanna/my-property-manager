import { queryOptions } from "@tanstack/react-query";

interface staffQueryOptionPropss {
  keyword: string;
}
export function staffListQueryOptions({ keyword }: staffQueryOptionPropss) {
  return queryOptions({
    queryKey: ["property_staff", keyword],
    queryFn: () => {
      return new Promise<{
        items: Array<Record<string, any> & { id: string }>;
      }>((res, rej) => {
        setTimeout(() => {
          res({
            items: [{ id: "id_1" }, { id: "id_2" }, { id: "id_3" }],
          });
        }, 1000);
      });
    },
  });
}
interface oneStaffQueryOptionPropss {
  staff: string;
}
export function oneStaffQueryOptions({ staff }: oneStaffQueryOptionPropss) {
  return queryOptions({
    queryKey: ["property_staff", staff],
    queryFn: () => {
      return new Promise<{ id: string }>((res, rej) => {
        setTimeout(() => {
          res({
            id: staff,
          });
        }, 1000);
      });
    },
  });
}
