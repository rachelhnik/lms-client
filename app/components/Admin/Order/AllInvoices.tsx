import { useGetAllCoursesQuery } from "@/redux/features/Courses/CoursesApi";
import { useGetAllUsersQuery } from "@/redux/features/User/userApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { Box, Hidden } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

type Props = {
  isDashboard: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data: courses } = useGetAllCoursesQuery({});
  const { data: orders } = useGetAllOrdersQuery({});
  const { data: users } = useGetAllUsersQuery({});
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    if (orders) {
      const temp = orders.orders.map((item: any) => {
        const user = users?.users.find(
          (user: any) => user?._id === item?.userId
        );

        const course = courses?.courses.find(
          (course: any) => course?._id === item?.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [courses, orders, users]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created at", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userName}`}>
                  <AiOutlineMail
                    size={20}
                    className="text-black dark:text-white"
                  />
                </a>
              );
            },
          },
        ]),
  ];
  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item?.userId,
        userName: item?.userName,
        userEmail: item?.userEmail,
        title: item?.title,
        price: item?.price,
        created_at: item?.createdAt,
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0 "}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
