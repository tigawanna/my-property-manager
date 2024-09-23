import { pb } from "@/lib/pb/client";
import { useSuspenseQuery } from "@tanstack/react-query";


interface ProfileRoleSectionProps {
  userId: string;
}

export function ProfileRoleSection({ userId }: ProfileRoleSectionProps) {
  useSuspenseQuery({
    queryKey: ["viiewer", userId],
    queryFn: async () => {
      return pb.from("property_user").getList(1, 20, {
        expand: "property_staff_list.id",
      });
    },
  });
  return <div className="w-full h-full flex flex-col items-center justify-center">role section </div>;
}
