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
    <div className="w-full h-full flex min-h-[80vh] flex-col items-center justify-center p-1">
      <div className="flex gap-2  p-3 bg-bg-muted rounded-md">
        <div className="w-full flex gap-2 flex-col p-3 bg-bg-muted rounded-md">
          <h1 className="text-5xl">{viewer?.username}</h1>
          <p className="">{viewer?.email}</p>
          <div className="flex gap-2 items-center rounded-lg ">
            <div className="">{viewer?.role}</div>
            {profileRole && profileRole.id && (
              <CheckIcon className="text-success-content fill-success-content" />
            )}
          </div>
        </div>
        <div className="w-full flex gap-2 flex-col p-3 bg-bg-muted  rounded-md">
          <h1 className="text-5xl">Profile</h1>
          <p className="">{viewer?.role}</p>
          <p className="">{viewer?.email}</p>
          <p className="">{viewer?.email}</p>
        </div>
      </div>
    </div>
  );
}


