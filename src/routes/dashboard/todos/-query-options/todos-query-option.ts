 
import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";

interface todosQueryOptionPropss {
  keyword: string;
}
export function todosListQueryOptions({ keyword }: todosQueryOptionPropss) {
  return queryOptions({
    queryKey: ["property_todos", keyword],
    queryFn: () => {
      return pb.from("property_todos").getList(1, 24, {});
    },
  });
}
interface oneTodosQueryOptionPropss {
  todos: string;
}
export function oneTodosQueryOptions({ todos }: oneTodosQueryOptionPropss) {
  return queryOptions({
    queryKey: ["property_todos", todos],
    queryFn: () => {
      return pb.from("property_todos").getOne(todos,{
        select: {
          "expand":{
            "participants":true
          }
        }
      });
    },
  });
}
  