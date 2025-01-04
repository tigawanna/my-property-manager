import { Badge } from "@/components/shadcn/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/shadcn/ui/card";
import {
  PropertyShopPaymentsResponse,
  PropertyStaffListResponse,
  PropertyShopsResponse,
  PropertyTenantsListResponse,
} from "@/lib/pb/pb-types";
import { CalendarIcon, Droplets, Home, Receipt, Store, Zap } from "lucide-react";

interface PaymentsCardProps {
  payment: PropertyShopPaymentsResponse & {
    expand?:
      | {
          staff?: PropertyStaffListResponse | undefined;
          shop?:
            | (PropertyShopsResponse & {
                expand?:
                  | {
                      tenant?: PropertyTenantsListResponse | undefined;
                    }
                  | undefined;
              })
            | undefined;
        }
      | undefined;
  };
}

export function PaymentsCard({payment}: PaymentsCardProps) {
    const typeIcons = {
      elec: <Zap className="h-4 w-4" />,
      water: <Droplets className="h-4 w-4" />,
      rent: <Home className="h-4 w-4" />,
      deposit: <Store className="h-4 w-4" />,
      fines: <Receipt className="h-4 w-4" />,
    };

    const typeColors = {
      elec: "text-yellow-500",
      water: "text-blue-500",
      rent: "text-green-500",
      deposit: "text-purple-500",
      fines: "text-red-500",
    };
  return (
    <Card className="p-0 rounded-lg w-full sm:w-[45%] border-none ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center ">
          <Badge
            variant="outline"
            className={`${typeColors[payment.type]} `}
          >
            {typeIcons[payment.type]}
            <span className="ml-1 capitalize">{payment.type}</span>
          </Badge>
          <Badge variant="outline">{payment.expand?.shop?.shop_number}</Badge>
        </div>
        <div className="font-mono text-sm text-muted-foreground">
          {payment.reciept_number}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "KES",
          }).format(payment.amount)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {payment.month}/{payment.year}
        </div>
        <div>{new Date(payment.created).toLocaleDateString()}</div>
      </CardFooter>
    </Card>
  );
}
