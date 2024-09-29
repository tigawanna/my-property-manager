import { createFileRoute } from "@tanstack/react-router";
import { ShopsPage } from "./-components/ShopsPage";
import { z } from "zod";
import { houseFloorsKeys } from "./-components/list/use-shook-hooks";

const searchparams = z.object({
  sq: z.string().optional(),
  floor: z.enum(houseFloorsKeys).optional(),
});

export const Route = createFileRoute("/dashboard/shops/")({
  validateSearch: (search) => searchparams.parse(search),
  component: ShopsPage,
});
