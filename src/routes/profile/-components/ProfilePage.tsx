import { pb } from "@/lib/pb/client";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { BaseProfile } from "./BaseProfile";
import { UserAccountProfile } from "./user-account/UserAccountProfile";
import { Suspense } from "react";

interface ProfilePageProps {}

export function ProfilePage({}: ProfilePageProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.record;
  const viewerId = viewer?.id!;

  const profileQuery = useSuspenseQuery({
    queryKey: ["viewer", "profile", viewerId],
    queryFn: async () => pb.from("property_user").getOne(viewerId),
  });

  const profile = profileQuery?.data;

  if (!viewer || !profile) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center p-1">
      <BaseProfile user={profile} />
      <Suspense>
        <UserAccountProfile />
      </Suspense>
    </div>
  );
}
