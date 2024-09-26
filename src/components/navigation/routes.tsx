export const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    children: [
      { name: "profile", href: "/dashboard/profile" },
      { name: "settings", href: "/dashboard/settings" },
      { name: "bills", href: "/dashboard/bills" },
      {
        name: "shops",
        href: "/dashboard/shops",
        children: [{ name: "shop", href: "/dashboard/shops/$shop_id" }],
      },
      {
        name: "tenants",
        href: "/dashboard/tenants",
        children: [{ name: "tenant", href: "/dashboard/tenants/$tenant_id" }],
      },
    ],
  },
] as const;
