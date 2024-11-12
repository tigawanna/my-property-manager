
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { UpdateTodosform } from "@/routes/dashboard/todos/-components/form/update";
import { todosListQueryOptions } from "@/routes/dashboard/todos/-query-options/todos-query-option";

interface TodosListProps {
  keyword?: string;
}

export function TodosList({ keyword = "" }: TodosListProps) {
  const query = useSuspenseQuery(todosListQueryOptions({ keyword }));
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
                  to={`/dashboard/todos/${item.id}/`}
                  className="text-primary"
                >
                  see details
                </Link>
              </div>
              <UpdateTodosform item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}


