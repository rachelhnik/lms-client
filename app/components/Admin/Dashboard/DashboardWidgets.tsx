import React, { FC } from "react";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersLight } from "react-icons/pi";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";

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
  return (
    <div className="mt-[30px] min-h-screen">
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
                  120
                </h5>
                <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px] font-400">
                  Sales obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-5">+120%</h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center justify-between p-5">
              <div className="">
                <PiUsersLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px]">
                  450
                </h5>
                <h5 className="pt-2 font-Poppins text-black dark:text-white text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
            </div>
            <CircularProgressWithLabel value={100} open={open} />
            <h5 className="text-center pt-4">+150%</h5>
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
