import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import { PropertyUserResponse } from "@/lib/pb/pb-types";

interface BaseProfileProps {
user:PropertyUserResponse
}

export function BaseProfile({user}:BaseProfileProps){
return (
  <Card className="w-full max-w-md rounded-xl border-base-200 bg-base-300">
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar className="size-16 border border-primary">
        <AvatarImage src={user.avatarUrl} alt={user.username} />
        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <CardTitle>{user.username}</CardTitle>
        {user?.staff && <Badge>{user.username?.charAt(0).toUpperCase() + user.username?.slice(1)}</Badge>}
      </div>
    </CardHeader>
    <CardContent className="rounded-lg">
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <dt className="font-semibold">Email:</dt>
        <dd>{user.email}</dd>
        <dt className="font-semibold">Phone:</dt>
      </dl>
    </CardContent>
  </Card>
);
}
