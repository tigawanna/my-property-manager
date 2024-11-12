import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UpdateStaffform } from "../form/update";
import { staffListQueryOptions } from "../../-query-options/staff-query-option";
import { Link } from "@tanstack/react-router";

interface StaffListProps {
  keyword?: string;
}

export function StaffList({ keyword = "" }: StaffListProps) {
  const query = useSuspenseQuery(staffListQueryOptions({ keyword }));
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
        <ItemNotFound label="shops" />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="w-[90%] flex flex-wrap justify-center gap-2">
        {data.items.map((item) => {
          return (
            <li
              key={item.id}
              className="h-56 w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl bg-base-300 p-4 flex justify-center items-center gap-2 "
            >
              <div className="flex flex-col gap-2 w-full justify-center">
                {item.id}
                <Link
                  to={`/dashboard/staff/${item.id}/`}
                  className="text-primary"
                >
                  see details
                </Link>
              </div>
              <UpdateStaffform item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
