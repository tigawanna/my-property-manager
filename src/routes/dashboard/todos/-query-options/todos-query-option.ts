 
import { queryOptions } from "@tanstack/react-query";

interface todosQueryOptionPropss {
  keyword: string;
}
export function todosListQueryOptions({ keyword }: todosQueryOptionPropss) {
  return queryOptions({
    queryKey: ["todos_list", keyword],
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
  