
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { oneTodosQueryOptions } from "@/routes/dashboard/todos/-query-options/todos-query-option";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { isdateGreater, getRelativeTimeString } from "@/utils/date-helpers";
import { Pen, ArrowRight } from "lucide-react";
import { UpdateTodosform } from "../form/update";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";

interface OneTodosDetailsProps {
}

export function OneTodosDetails({}: OneTodosDetailsProps) {
  const { todos } = useParams({ from: "/dashboard/todos/$todos/" });
  const query = useSuspenseQuery(oneTodosQueryOptions({ todos }));
  const item = query.data;
  const error = query.error;

  if(!item) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="todo" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-[95%] flex-col justify-between gap-2 p-5">
        <div className="flex h-full justify-between gap-1">
          <h1 className="text-7xl font-bold">{item.title}</h1>
          <UpdateTodosform item={item} />
        </div>
        <p className="text=lg">{item.description}</p>
        <div className="flex flex-wrap w-full justify-between gap-2">
          <div className="gap- flex  flex-col justify-center">
            {isdateGreater(item.updated, item.created) && (
              <div className="flex items-center gap-1 text-base-content/70">
                last updated:
                {getRelativeTimeString(new Date(item.updated))}
              </div>
            )}
            <div className="flex items-center gap-1 text-sm">
              created
              {getRelativeTimeString(new Date(item.created))}
            </div>
          </div>
          <ul className="flex  flex-wrap gap-2">
            <h1>Contributors</h1>
            {item?.expand?.participants?.map((participant) => {
              return (
                <li
                  key={participant.id}
                  className="flex badge badge-primary badge-outline gap-1"
                >
                  {participant.username}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

  