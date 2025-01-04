import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar"
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { RoleIcons } from "./RoleIcons";
import { getFileURL } from "@/lib/pb/client";

interface ProfileLinkCardProps {
  viewer: {
    id: string;
    staff?: string;
    tenant?: string;
    pnone?: string;
    avatar: string;
    username: string;
    email: string;
  };
}

export function ProfileLinkCard({viewer}:ProfileLinkCardProps){
  const avatarUrl= getFileURL({
    collection_id_or_name: "property_user",
    fallback: "/avatar.png",
    record_id: viewer?.id,
    file_name: viewer?.avatar
  })
return (
  <Link
    to="/profile"
    data-test="homepage-section--profile-link"
    className="group flex items-center justify-center gap-2 hover:brightness-125"
  >
    <Avatar>
      <AvatarImage
        height={50}
        className="size-10"
        src={avatarUrl}
        alt={viewer?.username}
      />
      <AvatarFallback>{viewer?.username?.slice(0, 2)}</AvatarFallback>
    </Avatar>
    <div className="flex items-center justify-center gap-10">
      <span className="text-2xl">{viewer?.username}</span>
      <RoleIcons role={viewer?.tenant ? "staff" : "tenant"} />
    </div>

    <ArrowRightIcon className="size-10 group-hover:animate-ping group-hover:text-secondary" />
  </Link>
);
}
