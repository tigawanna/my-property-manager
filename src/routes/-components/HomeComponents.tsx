import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar"
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { RoleIcons } from "./RoleIcons";

interface ProfileLinkCardProps {
  viewer: {
    staff?: string;
    tenant?: string;
    pnone?: string;
    avatarUrl: string;
    username: string;
    email: string;
  };
}

export function ProfileLinkCard({viewer}:ProfileLinkCardProps){
return (
  <Link to="/profile" className="group flex hover:brightness-125 items-center justify-center gap-2">
    <Avatar>
      <AvatarImage height={50} className="size-10" src={viewer?.avatarUrl} alt={viewer?.username} />
      <AvatarFallback>{viewer?.username?.slice(0, 2)}</AvatarFallback>
    </Avatar>
    <div className="flex  gap-10 justify-center items-center">
    <span className=" text-2xl">{viewer?.username}</span>
    <RoleIcons role={viewer?.tenant?"staff":"tenant"}/>
    </div>

    <ArrowRightIcon className="size-10 group-hover:animate-ping group-hover:text-secondary" />
  </Link>
);
}
