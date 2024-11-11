import { pb } from "@/lib/pb/client";
import { queryOptions } from "@tanstack/react-query";

export const viewerqueryOptions = queryOptions
    ({
        queryKey: ["viewer"],
        queryFn: () =>
            pb
                .from("property_user")
                .authRefresh()
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    pb.authStore.clear();
                    return { record: null, token: null };
                }),
        staleTime: 1000 * 60 * 60,
    });

