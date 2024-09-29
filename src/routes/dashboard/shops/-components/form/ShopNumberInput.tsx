import { PropertyShopsCreate } from "@/lib/pb/database";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { floors, PropertyFloorPrefixes } from "./floors";
import { useEffect, useTransition } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { like } from "typed-pocketbase";
import { pb } from "@/lib/pb/client";

interface ShopNumberInputProps {
  input: PropertyShopsCreate & { floor: PropertyFloorPrefixes };
  setInput: React.Dispatch<
    React.SetStateAction<PropertyShopsCreate & { floor: PropertyFloorPrefixes }>
  >;
}

export function ShopNumberInput({ input, setInput }: ShopNumberInputProps) {
  const shopsQuery = useSuspenseQuery({
    queryKey: ["property_shops", input.floor],
    queryFn: () => {
      return pb.from("property_shops").getList(1, 10, {
        sort: "+order",
        filter: like("shop_number", input.floor),
      });
    },
  });
  useEffect(() => {
    const shopNumbers = shopsQuery?.data?.items.map((s) => s.shop_number);
    if (shopNumbers) {
      console.log(shopNumbers);
      setInput((prev) => ({
        ...prev,
        shop_number: `${input.floor}-${shopNumbers.length + 1}`,
      }));
    }
  }, [input.floor]);
  const [_, startTransition] = useTransition();
  const floors_list = Object.entries(floors);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <Select
          onValueChange={(v: PropertyFloorPrefixes) =>
            startTransition(() => setInput((prev) => ({ ...prev, floor: v })))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Floors</SelectLabel>
              {floors_list.map(([k, v]) => (
                <SelectItem key={k} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
