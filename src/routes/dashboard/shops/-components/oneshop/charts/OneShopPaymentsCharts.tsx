import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

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
} from "@/components/shadcn/ui/chart";
import { useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  oneShopMonthlyPaymentsQueryOptions,
  oneShopQueryOptions,
} from "../../query-options/shops-query-options";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
interface OneShopPaymentsChartsProps {}

export function OneShopPaymentsCharts({}: OneShopPaymentsChartsProps) {
  const { shop } = useParams({ from: "/dashboard/shops/$shop/" });
  const { cy } = useSearch({
    from: "/dashboard/shops/$shop/",
  });
  const oneShopQuery = useSuspenseQuery(oneShopQueryOptions({ shop }));
  const oneShopData = oneShopQuery.data;
  const selectedYear = cy ?? new Date().getFullYear();
  const query = useSuspenseQuery(
    oneShopMonthlyPaymentsQueryOptions({ shop, year: selectedYear }),
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
          <ItemNotFound label="shop payments" />
        </div>
      </div>
    );
  }

  const oneShopMonthlyChartsData = data.items.reduce(
    (acc, item) => {
      acc["rent"] = acc["rent"]
        ? { ...acc["rent"], total: acc["rent"].total + item.amount }
        : {
            total: item.amount,
            fill: "oklch(var(--chart-1))",
          };
      return acc;
    },
    {
      rent: {
        total: 0,
        fill: "oklch(var(--chart-1))",
      },
    },
  );

  const chartConfig = {
    rent: {
      label: "rent",
      color: "oklch(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="max-h-lg w-full">
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>January - December {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          data-theme="dark"
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={[oneShopMonthlyChartsData.rent]}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="total" cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle "
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-base-content text-4xl font-bold"
                        >
                          {oneShopMonthlyChartsData.rent.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-base-content"
                        >
                          Rent
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
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
