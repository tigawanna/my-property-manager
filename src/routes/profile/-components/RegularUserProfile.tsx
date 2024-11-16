import {
  PropertyUsersListResponse,

} from "@/lib/pb/database";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

interface RegularUserProfileProps {
  userDetails: PropertyUsersListResponse;
}

export function RegularUserProfile({ userDetails }: RegularUserProfileProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Staff Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="font-semibold">Staff Role:</dt>
            <dd className="capitalize">{userDetails.created || "Not assigned"}</dd>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
