import { useParams } from "@tanstack/react-router";
import { OneShopDetails } from "./OneShopDetails";
import { OneShopsBillsContainer } from "./list/OneShopsBillsContainer";
import { OneShopUtiltyCharts } from "./charts/OneShopUtiltyCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { OneShopsPaymentsContainer } from "./list/OneShopPaymentsList";
import { OneShopPaymentsCharts } from "./charts/OneShopPaymentsCharts";
interface OneShopPageProps {}

export function OneShopPage({}: OneShopPageProps) {
  const { shop } = useParams({
    from: "/dashboard/shops/$shop/",
  });
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <OneShopDetails shop={shop} />
      <Tabs defaultValue="payments" className="h-full w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>
        <TabsContent value="payments">
          {/* <OneShopPaymentsCharts /> */}
          <OneShopsPaymentsContainer shop={shop} />
        </TabsContent>
        <TabsContent value="utilities">
          <OneShopUtiltyCharts />
          <OneShopsBillsContainer shop={shop} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
