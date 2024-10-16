import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";
import { useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  oneShopBillsQueryOptions,
  oneShopQueryOptions,
} from "../../query-options/shops-query-options";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryEror";
import { getMonthFromNumber } from "@/utils/hooks/date";
interface OneShopUtiltyChartsProps {}

export function OneShopUtiltyCharts({}: OneShopUtiltyChartsProps) {
  const { shop } = useParams({ from: "/dashboard/shops/$shop/" });
  const { cy } = useSearch({
    from: "/dashboard/shops/$shop/",
  });
  const oneShopQuery = useSuspenseQuery(oneShopQueryOptions({ shop }));
  const oneShopData = oneShopQuery.data;
  const selectedYear = cy ?? new Date().getFullYear();
  const query = useSuspenseQuery(
    oneShopBillsQueryOptions({ shop, year: selectedYear }),
  );
  const data = query.data;
  const error = query.error;
  if (error) {
    return (
      <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center">
        <PBReturnedUseQueryError error={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center">
        <div className="flex h-full items-center justify-center rounded-lg border bg-info-content p-[2%] text-sm">
          {error && (
            <div className="warning rounded-lg p-2">No bills found</div>
          )}
        </div>
      </div>
    );
  }
  const oneShopChartsData = data.items.map((item) => {
    const month = getMonthFromNumber(item.month);
    return {
      month,
      elec: item.elec_readings,
      water: item.water_readings,
    };
  }).reverse()
  //   const chartData = [
  //     { month: "January", elec: 16, water: 10 },
  //     { month: "February", elec: 35, water: 15 },
  //     { month: "March", elec: 27, water: 20 },
  //     { month: "April", elec: 73, water: 25 },
  //     { month: "May", elec: 29, water: 30 },
  //     { month: "June", elec: 24, water: 35 },
  //     { month: "July", elec: 45, water: 40 },
  //     { month: "August", elec: 38, water: 45 },
  //     { month: "September", elec: 56, water: 50 },
  //     { month: "October", elec: 62, water: 55 },
  //     { month: "November", elec: 49, water: 60 },
  //     { month: "December", elec: 33, water: 65 },
  //   ];

  const chartConfig = {
    elec: {
      label: "electricity",
      color: "oklch(var(--chart-1))",
    },
    water: {
      label: "water",
      color: "oklch(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="max-h-lg w-full">
      <CardHeader>
        <CardTitle>Utilities</CardTitle>
        <CardDescription>January - December {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart
            accessibilityLayer
            data={oneShopChartsData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {(oneShopData.utils === "both" || oneShopData.utils === "elec") && (
              <Bar dataKey="elec" fill="var(--color-elec)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            )}
            {(oneShopData.utils === "both" ||
              oneShopData.utils === "water") && (
              <Bar dataKey="water" fill="var(--color-water)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
