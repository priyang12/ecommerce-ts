import { addDays, format, subDays } from "date-fns";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Loading, useTranslate } from "react-admin";
import { useQuery } from "react-query";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios, { AxiosResponse } from "axios";

const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date: number): string =>
  new Date(date).toLocaleDateString();

const aggregateOrdersByDay = (orders: any[]): { [key: string]: number } =>
  orders
    .filter((order) => order.status !== "cancelled")
    .reduce((acc, curr) => {
      const day = format(new Date(curr.createdAt), "yyyy-MM-dd");
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day] += curr.totalPrice;
      return acc;
    }, {} as { [key: string]: number });

const getRevenuePerDay = (orders: any): any[] => {
  const daysWithRevenue = aggregateOrdersByDay(orders);

  return lastMonthDays.map((date: any) => ({
    date: date.getTime(),
    total: daysWithRevenue[format(new Date(date), "yyyy-MM-dd")] || 0,
  }));
};
function Chart() {
  const { data: orders, isLoading: OrderLoading } = useQuery(
    "LastMonth",
    async () => {
      const { data }: AxiosResponse<any> = await axios.get(
        "http://localhost:5001/api/admin/orders/lastMonth",
        {
          headers: {
            "x-auth-token": localStorage.token,
          },
        }
      );
      return data;
    }
  );

  const translate = useTranslate();

  if (OrderLoading)
    return (
      <Loading
        loadingPrimary="app.page.loading"
        loadingSecondary="app.message.loading"
      />
    );

  if (!orders) return null;

  return (
    <div>
      <Card>
        <CardHeader title={translate("30 day Revenue")} />
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={getRevenuePerDay(orders)}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  name="Date"
                  type="number"
                  scale="time"
                  domain={[
                    addDays(aMonthAgo, 1).getTime(),
                    new Date().getTime(),
                  ]}
                  tickFormatter={dateFormatter}
                />
                <YAxis dataKey="total" name="Revenue" unit="€" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value: any) =>
                    new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "USD",
                    }).format(value)
                  }
                  labelFormatter={(label: any) => dateFormatter(label)}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Chart;
