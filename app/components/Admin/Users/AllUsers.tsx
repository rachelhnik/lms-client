import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/User/userApi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { styles } from "../../styles/style";
import { Modal } from "@mui/material";
import { useDeleteCourseMutation } from "@/redux/features/Courses/CoursesApi";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { isSuccess, data, error, isLoading } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: success, error: Error }] =
    useDeleteUserMutation();
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "purchased", headerName: "Purchased courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined at", flex: 0.3 },

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
                setUserId(rows.params.id);
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
        rows.push({
          id: user._id,
          title: user.name,
          email: user.email,
          purchased: user.courses.length,
          role: user.role,
          created_at: formatDate,
        });
      });
  }

  useEffect(() => {
    if (success) {
      toast.success("deleted successfully");
    }
    if (Error) {
      setOpen(false);
      toast.error("something went wrong");
    }
  }, []);

  const handleDelete = () => {};
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
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] border-2 border-white p-3">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
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
      )}
    </div>
  );
};

export default AllUsers;
