import { pb } from "@/lib/pb/client";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";

interface ProfilePageProps {}

export function ProfilePage({}: ProfilePageProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.record;
  const viewerId = viewer?.id!;

  const profileQuery = useSuspenseQuery({
    queryKey: ["viiewer", "profile", viewerId],
    queryFn: async () =>
      pb.from("property_user").getOne(viewerId, {
        select: {
          expand: {
            staff: true,
            tenant: true,
            user: true,
          },
        },
      }),
  });

  const profileRole = profileQuery.data?.expand?.[viewer?.role || "user"];
  return (
    <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center p-1">
      <div className="flex gap-2 rounded-md bg-base-200 p-3">
        <div className="flex w-full flex-col gap-2 rounded-md bg-base-200 p-3">
          <h1 className="text-5xl">{viewer?.username}</h1>
          <p className="">{viewer?.email}</p>
          <div className="flex items-center gap-2 rounded-lg">
            <div className="">{viewer?.role}</div>
            {profileRole && profileRole.id && (
              <CheckIcon className="fill-success-content text-success-content" />
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 rounded-md bg-base-200 p-3">
          <h1 className="text-5xl">Profile</h1>
          <p className="">{viewer?.role}</p>
          <p className="">{viewer?.email}</p>
          <p className="">{viewer?.email}</p>
        </div>
      </div>
    </div>
  );
}
