
import { pb } from "@/lib/pb/client";
import { wordToNumber } from "@/utils/string";
import { useSuspenseQuery } from "@tanstack/react-query";
import { like} from "typed-pocketbase";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import { listTenantsQueryOptions } from "../tenants-query-options";
import { TenantsCard } from "./TenantsCard";

interface TenantsListProps {
  keyword?: string;
}

export function TenantsList({ keyword = "" }: TenantsListProps) {
  const query = useSuspenseQuery(listTenantsQueryOptions({keyword}));
  const data = query.data;

  return (
    <ul className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[90%] flex flex-wrap gap-2 justify-center">
        {data.items.map((item) => {
          const shops = item.expand?.["property_shops(tenant)"];
          return (
            // <li
            //   key={item.id}
            //   className="relative flex w-[95%] items-center gap-3 rounded-lg bg-base-200 p-2 sm:w-[45%] lg:w-[30%]"
            // >

            //   <Avatar>
            //     <AvatarImage
            //       alt={item.name}
            //       src={`https://picsum.photos/id/${wordToNumber(item.name)}/30/30`}
            //     />
            //     <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
            //   </Avatar>

            //   <div className="w-full">
            //     <div className="max-w-[80%]">
            //       <h1 className="w-full overflow-hidden overflow-ellipsis font-bold">
            //         {item.name}
            //       </h1>
            //       {/* <div className=" flex gap-1 items-center">
            //       <Mail className="w-4 h-4" />
            //       <h4 className="overflow-hidden overflow-ellipsis ">{item.}</h4>
            //     </div> */}
            //       {/* <div className=" flex gap-2 items-center">
            //       <Phone className="w-3 h-3" />
            //       <h4 className="overflow-hidden overflow-ellipsis text-accent">{item.name}</h4>
            //     </div> */}
            //     </div>
            //     {shops && shops?.length > 0 && (
            //       <div className="flex items-center justify-start gap-2">
            //         {shops?.map((shop) => (
            //           <div
            //             className="flex items-center justify-start gap-2"
            //             key={shop.id}
            //           >
            //             {/* <User className="w-3 h-3" /> */}
            //             <h4 className="rounded border border-accent bg-accent px-1 text-xs">
            //               {shop.shop_number}
            //             </h4>
            //           </div>
            //         ))}
            //       </div>
            //     )}
            //   </div>
            //   {/* <div className="absolute top-[5%] right-[2%]">
            //   <MutateTenantModal
            //     tenant={item}
            //     updating={true}
            //     icon={
            //       <Edit2
            //         className="h-3.5 w-3.5 
            //       duration-200 transition-transform 
            //       hover:text-accent hover:scale-[200%] hover:w-5 hover:h-5"
            //       />
            //     }
            //   />
            // </div> */}
            // </li>
            <TenantsCard key={item.id} item={item}/>
          );
        })}
      </div>
    </ul>
  );
}
