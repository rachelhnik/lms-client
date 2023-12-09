import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/Courses/CoursesApi";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { styles } from "../../styles/style";
import { Modal } from "@mui/material";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {
  user: any;
};

const AllCourses: FC<Props> = ({ user }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, error, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error: Error }] = useDeleteCourseMutation(
    {}
  );
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState();

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
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <AiOutlineEdit className="dark:text-white text-black" size={20} />
            </Link>
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
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
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
      data.courses
        .filter((coursedata) => coursedata.userId === user?._id)
        .forEach((course: any) => {
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

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Successfully updated");
    }
    if (Error) {
      if ("data" in Error) {
        const errorMsg = Error as any;

        toast.error("Something went wrong");
      }
    }
  }, [isSuccess, error, Error]);
  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };
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
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] border-2 bg-white dark:bg-slate-800 border-white p-3">
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this course?
              </h1>
              <div className="flex w-full items-center justify-center mb-6 mt-4">
                <div
                  className={`${styles.button} mr-6 !w-[120px] h-[30px] bg-[#57c7a3]`}
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} !w-[120px] h-[30px] bg-red-600`}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </Box>
    </div>
  );
};

export default AllCourses;
