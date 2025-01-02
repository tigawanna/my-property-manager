
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { UpdateTodosform } from "@/routes/dashboard/todos/-components/form/update";
import { todosListQueryOptions } from "@/routes/dashboard/todos/-query-options/todos-query-option";
import { ArrowRight, Pen } from "lucide-react";
import { getRelativeTimeString, isdateGreater } from "@/utils/date-helpers";

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
              className="flex h-48 w-[95%] flex-grow gap-2 rounded-xl bg-base-300 p-4 sm:w-[45%] lg:w-[30%]"
            >
              <div className="-center flex w-full flex-col justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl font-bold">{item.title}</h1>
                  <p className="">{item.description}</p>
                </div>
                <div className="flex w-full justify-between gap-2">
                  <div className="flex w-full flex-col justify-center gap-">
                    {isdateGreater(item.updated, item.created)&& (
                      <div className="text-xs flex items-center gap-1 text-base-content/70">
                        <Pen className="size-3" />
                        {getRelativeTimeString(new Date(item.updated))}
                      </div>
                    )}
                    <div className="text-sm">
                      {getRelativeTimeString(new Date(item.created))}
                    </div>
                  </div>
                  <Link
                    to={`/dashboard/todos/${item.id}/`}
                    className="flex min-w-fit items-center gap-2 text-primary"
                  >
                    see details <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <UpdateTodosform item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}


