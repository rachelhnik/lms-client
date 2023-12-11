"use client";
import { useGetAllUsersQuery } from "@/redux/features/User/userApi";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useTheme } from "next-themes";
import React, { FC } from "react";
import { AiOutlineMail } from "react-icons/ai";
import Loader from "../../Loader/Loader";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { isSuccess, data, error, isLoading } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { theme, setTheme } = useTheme();
  console.log("data", data);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "purchased", headerName: "Purchased courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined at", flex: 0.3 },

    {
      field: "  ",
      headerName: "Email",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];
  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((user: any) => user.role === "admin");
    newData &&
      newData.forEach((user: any) => {
        const date = new Date(user.createdAt);
        const formatDate =
          date.getDate() +
          "/" +
          date.toLocaleString("default", { month: "2-digit" }) +
          "/" +
          date.getFullYear();
        rows.push({
          id: user._id,
          title: user.name,
          email: user.email,
          purchased: user.courses.length,
          role: user.role,
          created_at: formatDate,
        });
      });
  } else {
    data &&
      data.users.forEach((user: any) => {
        const date = new Date(user.createdAt);
        const formatDate =
          date.getDate() +
          "/" +
          date.toLocaleString("default", { month: "2-digit" }) +
          "/" +
          date.getFullYear();

        const coursesIds = data?.coursesIds as string[];

        rows.push({
          id: user._id,
          title: user.name,
          email: user.email,
          purchased: user?.courses?.filter((course) =>
            coursesIds.includes(course._id)
          )?.length,
          role: user.role,
          created_at: formatDate,
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="m-[20px]">
          <div className="w-[20%] flex justify-end"></div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "fff" : "000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "white" : "000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff !important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "fff" : "000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "fff" : "000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "fff" : "000",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "fff" : "000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
