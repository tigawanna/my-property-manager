import { queryOptions } from "@tanstack/react-query";

interface staffQueryOptionPropss{
    keyword:string
}
export function staffListQueryOptions({keyword}:staffQueryOptionPropss){
    return queryOptions({
    queryKey: ["property_staff", keyword],
    queryFn:()=>{
        return new Promise<{items:Array<Record<string,any>&{id:string}>}>((res,rej)=>{
          setTimeout(()=>{
            res({
                items:[
                    { id: "id_1" },
                    { id: "id_2" },
                    { id: "id_3" },
                ]

            })
          },1000) 
        })
    }
    })
}
interface oneStaffQueryOptionPropss{
    staff_id:string
}
export function oneStaffQueryOptions({staff_id}:oneStaffQueryOptionPropss){
    return queryOptions({
    queryKey: ["property_staff", staff_id],
    queryFn:()=>{
        return new Promise<{id:string}>((res,rej)=>{
          setTimeout(()=>{
            res({
                id:staff_id
            })
          },1000) 
        })
    }
    })
}
