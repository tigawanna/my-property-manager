import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { StaffPage } from "./-components/StaffPage";

const searchparams = z.object({
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/staff/")({
  validateSearch: (search) => searchparams.parse(search),
  component:StaffPage
});
