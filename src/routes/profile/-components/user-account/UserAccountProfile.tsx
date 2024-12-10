import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { PropertyUserResponse } from "@/lib/pb/pb-types";
import { Navigate } from "@tanstack/react-router";
import { getFileURL } from "@/lib/pb/client";
import { UserAccountProfileForm } from "./UserAccountProfileForm";

interface UserAccountProfileProps {}

export function UserAccountProfile({}: UserAccountProfileProps) {
  const { userQuery, logoutMutation } = useViewer();
  const user = userQuery?.data?.record!;
  const [input, setInput] = useState<
    PropertyUserResponse & { avatarUrl: string }
  >({
    ...user,
    avatarUrl: getFileURL({
      collection_id_or_name: "property_user",
      fallback: "/avatar.png",
      record_id: user?.id,
    }),
  });

  if (!input) {
    return <Navigate to="/auth" search={{ returnTo: "/profile" }} />;
  }
  return (
    <Card className="flex w-full flex-col md:flex-row  border-base-200 bg-base-300">
      <CardHeader className="flex flex-row items-center p-0">
        <img
          src={input.avatarUrl}
          className="h-[250px] w-full lg:size-[200px] object-cover"
        />
      </CardHeader>
      <CardContent className="rounded-lg">
        <div className="flex flex-col gap-1 p-3">
          {input.username && (
            <div className="i flex h-full gap-2">
              <CardTitle>{input.username}</CardTitle>
              {input.staff && (
                <Badge>
                  {input.username?.charAt(0).toUpperCase() +
                    input.username?.slice(1)}
                </Badge>
              )}
            </div>
          )}
          {input.email && (
            <span className="font-semibold">Email:{input.email}</span>
          )}
          {input.phone && (
            <span className="font-semibold">Phone:{input.phone}</span>
          )}
        </div>

        <UserAccountProfileForm input={input} setInput={setInput} />
      </CardContent>
    </Card>
  );
}
