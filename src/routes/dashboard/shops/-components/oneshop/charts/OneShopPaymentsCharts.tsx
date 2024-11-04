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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";
import { useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  oneShopPaymentsQueryOptions,
  oneShopQueryOptions,
} from "../../query-options/shops-query-options";
import { PBReturnedUseQueryError } from "@/lib/pb/components/PBReturnedUseQueryError";
import { getMonthFromNumber } from "@/utils/hooks/date";
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
    oneShopPaymentsQueryOptions({ shop, year: selectedYear }),
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
  const chartData = [
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  ];
  const chartConfig3 = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "oklch(var(--color-elec))",
    },
  } satisfies ChartConfig;
  
  const oneShopChartsData = data.items.map((item) => {
    const month = getMonthFromNumber(item.month);
    return {
      month,
      rent: item.amount,
      fill: "var(--color-elec)",
    };
  }).reverse()


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
        {/* <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart
            accessibilityLayer
            data={oneShopChartsData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="rent"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value?.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
              <Bar dataKey="mobth" fill="var(--color-elec)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>

          </BarChart>
        </ChartContainer> */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
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
            <RadialBar dataKey="rent" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData?.[0]?.visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
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
