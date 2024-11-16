 
import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";

interface trackingQueryOptionPropss {
  keyword: string;
}
export function trackingListQueryOptions({ keyword }: trackingQueryOptionPropss) {
  return queryOptions({
    queryKey: ["property_staff_tracking_sheet", keyword],
    queryFn: () => pb.from("property_staff_tracking_sheet").getList(1, 24, {}),
  });
}
interface oneTrackingQueryOptionPropss {
  tracking: string;
}
export function oneTrackingQueryOptions({ tracking }: oneTrackingQueryOptionPropss) {
  return queryOptions({
    queryKey: ["property_staff_tracking_sheet","one_tracking" ,tracking],
    queryFn: () => pb.from("property_staff_tracking_sheet").getOne(tracking),
  });
}
  