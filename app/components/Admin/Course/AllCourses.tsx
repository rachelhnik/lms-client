import { useGetAllCoursesQuery } from "../../../../redux/features/Courses/CoursesApi";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, error } = useGetAllCoursesQuery({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineEdit className="dark:text-white text-black" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];

  {
    data &&
      data.courses.forEach((course: any) => {
        const date = new Date(course.createdAt);
        const formatDate =
          date.getDate() +
          "/" +
          date.toLocaleString("default", { month: "2-digit" }) +
          "/" +
          date.getFullYear();
        rows.push({
          id: course._id,
          title: course.name,
          ratings: course.ratings,
          purchased: course.purchased,
          created_at: formatDate,
        });
      });
  }

  return (
    <div className="mt-[120px]">
      <Box className="m-[20px]">
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
    </div>
  );
};

export default AllCourses;
