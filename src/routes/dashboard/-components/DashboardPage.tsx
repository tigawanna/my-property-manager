import { Link } from "@tanstack/react-router";
import { Droplet, Store, Users, Wallet, Zap } from "lucide-react";

interface DashboardPageProps {}

const links = [
  {
    name: "bills",
    path: "/dashboard/bills",
    icon: (
      <div className="flex">
        <Droplet />
        <Zap />
      </div>
    ),
  },
  { name: "shops", path: "/dashboard/shops", icon: <Store /> },
  { name: "tenants", path: "/dashboard/tenants", icon: <Users /> },
  { name: "rent", path: "/dashboard/rent", icon: <Wallet /> },
] as const
export function DashboardPage({}: DashboardPageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full flex justify-center items-center"></div>
      <ul className="w-full h-full flex flex-wrap justify-center items-center gap-2 p-[5%]">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="p-[5%] flex gap-2 justify-center items-center 
          text-4xl h-full w-[40%] bg-base-200 rounded-xl
          hover:bg-base-300 hover:text-accent-text">
            {link.icon}
            {link.name}
          </Link>
        ))}

      </ul>
    </div>
  );
}
