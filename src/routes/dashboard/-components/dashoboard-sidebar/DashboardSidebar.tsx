import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Outlet,Link } from "@tanstack/react-router";
import { DashboardSidebarHeader } from "./DashboardSidebarHeader";
import { DashboardSidebarLinks } from "./DashboardSidebarLinks";
import { DashboardSidebaruser } from "./DashboardSidebaruser";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import {Castle} from "lucide-react"
import { TSRBreadCrumbs } from "@/lib/tanstack/router/TSRBreadCrumbs";
interface DashboardSidebarProps {
  sidebar_props: React.ComponentProps<typeof Sidebar>;
}

export function DashboardSidebar({ sidebar_props }: DashboardSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar className="" collapsible="icon" {...sidebar_props}>
        <SidebarHeader>

          <DashboardSidebarHeader />
        </SidebarHeader>
        <SidebarContent>
          <DashboardSidebarLinks />
        </SidebarContent>
        <SidebarFooter>
          <ThemeToggle />
          <DashboardSidebaruser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 sticky top-0 bg-base-100 z-30 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <TSRBreadCrumbs/>
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        {/* main content */}
        <div>
          <Outlet />
        </div>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="skeleton bg-base-300 aspect-video rounded-xl" />
            <div className="skeleton bg-base-300 aspect-video rounded-xl" />
            <div className="skeleton bg-base-300 aspect-video rounded-xl" />
          </div>
          <div className="skeleton bg-base-300 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
