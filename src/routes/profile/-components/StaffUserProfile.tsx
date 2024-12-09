import { PropertyStaffListResponse, PropertyUserResponse } from "@/lib/pb/pb-types";
import { BaseProfile } from "./BaseProfile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

interface StaffUserProfileProps {
  user: PropertyUserResponse;
  staffDetails: PropertyStaffListResponse;
}

export function StaffUserProfile({ user, staffDetails }: StaffUserProfileProps) {
  return (
    <div className="space-y-6">
      <BaseProfile user={user} />
      <Card>
        <CardHeader>
          <CardTitle>Staff Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="font-semibold">Staff Role:</dt>
            <dt className="font-semibold">Account ID:</dt>
            <dd>{staffDetails.account}</dd>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
