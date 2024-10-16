import { useParams } from "@tanstack/react-router";
import { OneShopDetails } from "./OneShopDetails";
import { OneShopsBillsContainer } from "./list/OneShopsBillsContainer";
import { OneShopUtiltyCharts } from "./charts/OneShopUtiltyCharts";

interface OneShopPageProps {}

export function OneShopPage({}: OneShopPageProps) {
  const { shop } = useParams({
    from: "/dashboard/shops/$shop/",
  });
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <OneShopDetails shop={shop} />
      <div className="flex w-full flex-col items-center justify-center">
      <OneShopUtiltyCharts/>
      </div>
      <OneShopsBillsContainer shop={shop} />
    </div>
  );
}
