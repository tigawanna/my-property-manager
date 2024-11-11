import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UpdateStaffform } from "../form/update";
import { staffListQueryOptions } from "../../-query-options/staff-query-option";


interface StaffListProps {
  keyword?: string;
}

export function StaffList({keyword=""}:StaffListProps){
  const query = useSuspenseQuery(staffListQueryOptions({keyword}));
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
 <div className='w-full h-full flex flex-col items-center justify-center'>
    <ul className='w-[90%] flex flex-wrap justify-center gap-2'>
      {data.items.map((item) => {
         return <li key={item.id} className='h-56 hover:via-secondary/30 hover:scale-95 hover:duration-300 hover:ease-in-out hover:text-primary w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl to-base-200"'>
            {item.id}
            <UpdateStaffform item={item}/>
         </li>
      })}

    </ul>
 </div>
);
}
