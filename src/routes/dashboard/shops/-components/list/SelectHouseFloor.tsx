import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  houseFloors,
  HouseFloorsKeys,
  useShopsFlooor,
} from "./use-shook-hooks";
interface SelectHouseFloorProps {}

export function SelectHouseFloor({}: SelectHouseFloorProps) {
  const floors = Object.entries(houseFloors) as Array<
    [HouseFloorsKeys, string]
  >;
  const { floor, setHouseFloor } = useShopsFlooor();
  return (
    <Select
      value={floor}
      onValueChange={(value: HouseFloorsKeys) => {
        setHouseFloor(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a floor" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {floors.map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
          {/* 
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
