import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { PaymentsPage } from './-components/PaymentsPage';

const searchparams = z.object({
  sq: z.string().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  page:z.number().optional(),
 type:z.enum(['deposit','rent','water','elec','fines','']).optional(),
  range:z.enum(['yearly','monthly']).optional()
});

export const Route = createFileRoute("/dashboard/payments/")({
  validateSearch: (search) => searchparams.parse(search),
  component:PaymentsPage,
});
