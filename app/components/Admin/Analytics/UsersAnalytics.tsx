"use client";
import { useGetUsersAnalyticsQuery } from "@/redux/features/Analytics/analytics";
import React, { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "../../styles/style";

type Props = {
  isDashboard: boolean;
};

const UsersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: { name: string; count: number }[] = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm rounded-sm pb-5"
          }`}
        >
          <div className={`${!isDashboard ? "" : "ml-8 mb-5"}`}>
            <h1
              className={`${styles.title} px-5 !text-start ${
                isDashboard ? "" : "!text-[20px]"
              }`}
            >
              Users analytics
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
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersAnalytics;
