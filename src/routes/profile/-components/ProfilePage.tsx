import { UserAccountProfile } from "./user-account/UserAccountProfile";
import { Suspense } from "react";

interface ProfilePageProps {}

export function ProfilePage({}: ProfilePageProps) {
return (
    <div className="flex h-full min-h-[80vh] w-full flex-col items-center p-1">
      <Suspense>
        <UserAccountProfile />
      </Suspense>
    </div>
  );
}
