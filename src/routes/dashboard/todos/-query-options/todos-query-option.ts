 
import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";

interface todosQueryOptionPropss {
  keyword: string;
}
export function todosListQueryOptions({ keyword }: todosQueryOptionPropss) {
  return queryOptions({
    queryKey: ["todos_list", keyword],
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
    queryKey: ["one_todos", todos],
    queryFn: () => {
      return new Promise<{ id: string }>((res, rej) => {
        setTimeout(() => {
          res({
            id: todos,
          });
        }, 1000);
      });
    },
  });
}
  