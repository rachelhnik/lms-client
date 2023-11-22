"use client";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/Analytics/analytics";
import React, { FC } from "react";
import Loader from "../../Loader/Loader";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { styles } from "../../styles/style";

type Props = {
  isDashboard: boolean;
};

const OrdersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});
  console.log("orders", data);
  const analyticsData: { name: string; count: number }[] = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`${styles.title} px-5 !text-start ${
                isDashboard ? "" : "!text-[20px]"
              }`}
            >
              Orders analytics
            </h1>
            {!isDashboard ? (
              <p className={`${styles.label} px-5`}>
                Last 12 Months Analytics Data
              </p>
            ) : (
              <></>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center `}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {isDashboard && <Legend />}
                <Line type="monotone" dataKey="count" stroke="#82ca0d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
