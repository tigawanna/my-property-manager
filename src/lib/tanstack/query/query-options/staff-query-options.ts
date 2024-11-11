import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";
export const oneStaffQueryOptions = (staffId: string) => queryOptions
    ({
        queryKey: ["property_staff_list", staffId],
        queryFn: () => {
            return pb
                .from("property_staff_list")
                .getFirstListItem(`account = "${staffId}"`)
                .then((res) => {
                    return res;
                })

        },
        staleTime: 1000 * 60 * 60,
    });
