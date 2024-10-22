import { dashboard_routes } from "@/components/navigation/routes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/shadcn/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Link, useLocation } from "@tanstack/react-router";

interface DashboardSidebarLinksProps {}

export function DashboardSidebarLinks({}: DashboardSidebarLinksProps) {
  const { state, setOpen, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();
  return (
    <SidebarGroup className="h-full bg-base-100">
      <SidebarGroupLabel>House keeping</SidebarGroupLabel>
      <SidebarMenu className="gap-5">
        {dashboard_routes.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <TooltipProvider >
                  <Tooltip defaultOpen={false} delayDuration={10} disableHoverableContent>
                    <TooltipTrigger
                      asChild
                      className={
                        pathname === item.href
                          ? `glass flex w-full gap-3 rounded-lg border bg-primary/60 p-1`
                          : `flex w-full gap-3 rounded-sm p-1 hover:bg-base-300`
                      }
                    >
                      <Link
                        to={item.href}
                        onClick={() => {
                          setOpen(false);
                          setOpenMobile(false);
                        }}
                      >
                        <button className="size-6">{item.icon}</button>
                        {state === "expanded" && (
                          <span className="text-lg"> {item.name}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{item.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
