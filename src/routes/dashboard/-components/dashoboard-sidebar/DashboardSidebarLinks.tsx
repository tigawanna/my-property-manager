import { dashboard_routes } from "@/components/navigation/routes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

interface DashboardSidebarLinksProps {}

export function DashboardSidebarLinks({}: DashboardSidebarLinksProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu className="gap-3">
        {dashboard_routes.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <div className="flex w-full bg-base-200 gap-3 border-b glass p-1">
                  <button className="size-6">{item.icon}</button>
                  <Link to={item.href} className="text-lg">
                    {item.name}
                  </Link>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
