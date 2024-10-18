import { Droplet, Home, Store, User, Users, Wallet, Zap } from "lucide-react";

export const dashboard_routes = [
  { name: "shops", href: "/dashboard/shops", icon: <Store /> },
  {
    name: "utilities",
    href: "/dashboard/bills",
    icon: (
      <div className="flex">
        <Droplet className="fill-info text-info" />
        <Zap className="fill-warning text-warning" />
      </div>
    ),
  },
  { name: "tenants", href: "/dashboard/tenants", icon: <Users /> },
  { name: "payments", href: "/dashboard/payments", icon: <Wallet /> },
] as const;



export const routes = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
    children: undefined,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Store />,
    children: dashboard_routes,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User />,
    children: undefined,
  },
] as const;


