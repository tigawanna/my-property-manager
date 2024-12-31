import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useSearch, useNavigate } from "@tanstack/react-router";

interface PaymentTypeSelectProps {}

export function PaymentTypeSelect({}: PaymentTypeSelectProps) {
  const { type, ...rest } = useSearch({ from: "/dashboard/payments/" });
  const navigate = useNavigate({ from: "/dashboard/payments" });
  const paymentTypes = [
    "deposit",
    "rent",
    "water",
    "elec",
    "fines",
    "All",
  ] as const;
  return (
    <Select
      value={type}
      onValueChange={(value: any) => {
        if (value) {
          if (value === "All") {
            navigate({ search: { type: "", ...rest }, replace: true });
          } else {
            navigate({ search: { type: value, ...rest }, replace: true });
          }
        }
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Payment type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{type}</SelectLabel>
          {paymentTypes.map((type) => {
            return (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export function PaymentRangeSelect({}: PaymentTypeSelectProps) {
  const { range, ...rest } = useSearch({ from: "/dashboard/payments/" });
  const navigate = useNavigate({ from: "/dashboard/payments" });
  const paymentRange = [
    "yearly",
    "monthly",
  ] as const;
  return (
    <Select
      value={range}
      onValueChange={(value: any) => {
        navigate({ search: { range: value, ...rest }, replace: true });
        
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Payment range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{range}</SelectLabel>
          {paymentRange.map((type) => {
            return (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
