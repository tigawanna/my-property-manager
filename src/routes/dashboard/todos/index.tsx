
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { TodosPage } from "@/routes/dashboard/todos/-components/TodosPage";

const searchparams = z.object({
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/todos/")({
  validateSearch: (search) => searchparams.parse(search),
  component:TodosPage
});

