
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ShopsbillsPage } from "@/routes/dashboard/bills/shopsbills/-components/ShopsbillsPage";

const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/bills/shopsbills/")({
  validateSearch: (search) => searchparams.parse(search),
  component:ShopsbillsPage
});

