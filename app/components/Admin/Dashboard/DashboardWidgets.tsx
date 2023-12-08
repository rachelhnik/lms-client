import React, { FC, useEffect, useState } from "react";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersLight } from "react-icons/pi";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/Analytics/analytics";

type Props = {
  open?: boolean;
  value?: number;
};
const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        value={value}
        size={45}
        variant="determinate"
        thickness={4}
        color={value && value > 99 ? "info" : "error"}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};
const DashboardWidgets: FC<Props> = ({ open }) => {
  const [comparePercentage, setComparePercentage] = useState<any>();
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [usersComparePercentage, setUsersComparePercentage] = useState<any>();
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      const userLastTwoMonths = data?.users.last12Months.slice(-2);
      const orderLastTwoMonths = ordersData?.orders?.last12Months.slice(-2);
      if (userLastTwoMonths?.length === 2 && orderLastTwoMonths?.length === 2) {
        const userCurrentMonth = userLastTwoMonths[1].count;
        const userPreviousMonth = userLastTwoMonths[0].count;
        const orderCurrentMonth = orderLastTwoMonths[1].count;
        const orderPreviousMonth = orderLastTwoMonths[0].count;
        const userPercentChange =
          userPreviousMonth === 0
            ? userCurrentMonth === 0
              ? 0
              : 100
            : ((userCurrentMonth - userPreviousMonth) / userPreviousMonth) *
              100;
        const orderPercentChange =
          orderPreviousMonth === 0
            ? orderCurrentMonth === 0
              ? 0
              : 100
            : ((orderCurrentMonth - orderPreviousMonth) / orderPreviousMonth) *
              100;

        setUsersComparePercentage({
          currentMonth: userCurrentMonth,
          previousMonth: userPreviousMonth,
          percentageChange: userPercentChange,
        });
        setOrdersComparePercentage({
          currentMonth: orderCurrentMonth,
          previousMonth: orderPreviousMonth,
          percentageChange: orderPercentChange,
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-[30px] ml-[-30px] min-h-screen m-auto">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UsersAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center justify-between p-5">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px]">
                  {ordersComparePercentage?.count}
                </h5>
                <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px] font-400">
                  Sales obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    ordersComparePercentage?.percentageChange > 0
                      ? ordersComparePercentage?.percentageChange
                      : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-5">
                  {ordersComparePercentage?.percentageChange > 0
                    ? "+" +
                      `${ordersComparePercentage?.percentageChange.toFixed(2)}`
                    : "-" +
                      `${ordersComparePercentage?.percentageChange.toFixed(
                        2
                      )}`}{" "}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center justify-between p-5">
              <div className="">
                <PiUsersLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px]">
                  {usersComparePercentage?.currentMonth}
                </h5>
                <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px] font-[400]">
                  {usersComparePercentage?.currentMonth === 0 ||
                  usersComparePercentage?.currentMonth === 1
                    ? "New User"
                    : "New Users"}
                </h5>
              </div>
              <div className="flex flex-col">
                <CircularProgressWithLabel
                  value={
                    usersComparePercentage?.percentageChange > 0
                      ? usersComparePercentage?.percentageChange
                      : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4 ml-2">
                  {usersComparePercentage?.percentageChange > 0
                    ? "+" +
                      `${usersComparePercentage?.percentageChange.toFixed(2)}`
                    : "-" +
                      `${usersComparePercentage?.percentageChange.toFixed(2)}`}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[65%,35%] mt-[20px]">
        <div className="w-[94%] dark:bg-[#111C43] mt-[30px] h-[40vh]  m-auto shadow">
          <OrdersAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px] font-[400] pb-3">
            Recent Transcations
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
