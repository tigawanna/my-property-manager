import { Badge } from "@/components/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shadcn/ui/card";
import { CalendarIcon, Droplets, Zap } from "lucide-react";
import { MonthlyBills } from "../api/bills";
import { MutateBill } from "../form/MutateBill";
import { useViewer } from "@/lib/tanstack/query/use-viewer";

interface BillsCardProps {
  bills: MonthlyBills;
}

export function BillsCard({ bills }: BillsCardProps) {
  const { role } = useViewer();
  return (
    <Card className="w-full rounded-lg border-none bg-base-200 p-0 sm:w-[45%]">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="items-cente flex flex-wrap gap-2">
          <Badge variant="outline">{bills.shop_number}</Badge>
          <Badge variant="outline">{bills.shop_name}</Badge>
        </div>
        <div className="font-mono text-lg text-muted-foreground">
          {bills.list_order}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-full w-full px-4">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Util</th>
                <th>Curr</th>
                <th>Prev</th>
                <th>Diff</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Droplets className="h-4 w-4 fill-blue-400 stroke-blue-500" />
                </td>
                <td>{bills.current_water}</td>
                <td>{bills.previous_water}</td>
                <td>{bills.water_diff}</td>
              </tr>

              <tr>
                <td>
                  <Zap className="h-4 w-4 fill-yellow-400 stroke-yellow-500" />
                </td>
                <td>{bills.current_elec}</td>
                <td>{bills.previous_elec}</td>
                <td>{bills.elec_diff}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {bills.curr_month}/{bills.curr_year}
        </div>
        {role === "staff" && (
          <div>
            <MutateBill bill={bills} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
