"use client";
import { BadgeCheck, Bell, ChevronsUpDown, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcn/ui/sidebar";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { getFileURL } from "@/lib/pb/client";
import { Link } from "@tanstack/react-router";
export function DashboardSidebarUser() {
  const { isMobile } = useSidebar();
  const { userQuery, logoutMutation } = useViewer();
  const user = userQuery?.data?.record;
  if(!user){
    return null
  }
  const avatarUrl = getFileURL({
    collection_id_or_name: "property_user",
    fallback: "/avatar.png",
    record_id: user.id,
  });
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="">
              <Avatar className="h-8 w-8 rounded-lg bg-base-content hover:bg-base-300">
                <AvatarImage src={avatarUrl} alt={user.username} />
                <AvatarFallback className="rounded-lg">
                  {user.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-2 text-base-content"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} alt={user.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold flex gap-1 items-center">
                    {user.username} {user?.staff.length > 0 && <ShieldCheck className="size-3 text-accent"/>}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/profile" className="w-full">
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <MutationButton
              className="btn-error max-w-[98%]"
              onClick={() => logoutMutation.mutate()}
              label="Logout"
              mutation={logoutMutation}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
