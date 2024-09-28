import { useParams } from "@tanstack/react-router";
import { OneShopDetails } from "./OneShopDetails";

interface OneShopPageProps {}

export function OneShopPage({}: OneShopPageProps) {
  const { shop } = useParams({
    from: "/dashboard/shops/$shop/",
  });
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <OneShopDetails shop_id={shop} />
    </div>
  );
}
