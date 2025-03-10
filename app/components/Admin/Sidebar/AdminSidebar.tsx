"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  AnalyticsIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  DataUsageIcon,
  EqualizerIcon,
  GridViewIcon,
  HomeIcon,
  PeopleIcon,
  QueueIcon,
  QuizIcon,
  ReceiptIcon,
  VideoCallIcon,
  WorkspacesIcon,
} from "./Icons";
import Image from "next/image";
import userProfile from "../../../../public/userProfile.png";
import { Category } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsCollapsed,
  getSelectedNmae,
  setIsCollapsed,
  setSelectedName,
} from "@/redux/features/sidebar/AdminSidebarSlice";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
  router: any;
}

const Item: FC<ItemProps> = ({ title, to, icon, setSelected, router }) => {
  const dispatch = useDispatch();
  const name = useSelector(getSelectedNmae);

  return (
    <div className="hello">
      <Link href={to}>
        <MenuItem
          active={name === title ? true : false}
          onClick={(e: any) => {
            e.preventDefault();
            setSelected(title);
            dispatch(setSelectedName(title));
            router.push(to);
          }}
          icon={icon}
          className={`text-slate-700 dark:text-slate-300  ${
            name === title ? "border-2 border-blue-400" : ""
          }`}
        >
          <Typography className="!text-[16px] hello text-black dark:text-slate-300 !font-Poppins">
            {title}
          </Typography>
        </MenuItem>
      </Link>
    </div>
  );
};

const AdminSidebar: FC<any> = ({ user }) => {
  const dispatch = useDispatch();
  const isCollapse = useSelector(getIsCollapsed);

  const [selected, setSelected] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          backgroundColor: `${theme === "dark" ? "#111C43" : "white"}`,
        },
        // "& .ps-menuitem-root:hover": { color: "black", background: "blue" },
        // "& .ps-menu-label:hover": { text : "black" },
      }}
      //className="bg-white dark:bg-slate-900"
    >
      <Sidebar
        collapsed={isCollapse}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: isCollapse ? "0%" : "16%",
          backgroundColor: "#003049",
          zIndex: 9999,
        }}
      >
        <Menu>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <Link href="/">
              {isCollapse ? (
                <HomeIcon />
              ) : (
                <h3 className="text-[25px] font-Poppins uppercase  text-slate-700 dark:text-slate-300">
                  ELearning
                </h3>
              )}
            </Link>
            <IconButton
              onClick={() => {
                dispatch(setIsCollapsed(!isCollapse));
              }}
              sx={{ ":hover": { bgcolor: "gray" } }}
            >
              {isCollapse ? (
                <ArrowForwardIcon className="text-slate-700 dark:text-slate-300 color-slate-300 wrapclass" />
              ) : (
                <ArrowBackIcon className="text-slate-700 dark:text-slate-300 color-slate-300 " />
              )}
            </IconButton>
          </Box>

          {!isCollapse && (
            <Box mb={2}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt=""
                  width={100}
                  height={150}
                  className="hello"
                  src={user.avatar ? user.avatar.url : userProfile}
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                    marginTop: 2,
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="text-[20px] text-slate-700 dark:text-slate-300 "
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="h4"
                  className="text-[20px] text-slate-700 dark:text-slate-300 "
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.role}
                </Typography>
              </Box>
            </Box>
          )}
          <Box sx={{ mt: isCollapse ? 2 : 0 }}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<GridViewIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Typography
              variant="h5"
              sx={{ margin: "15px 0px 5px 25px" }}
              className="text-[18px] text-slate-700 dark:text-slate-300  capitalize font-400"
            >
              {!isCollapse && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<PeopleIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Typography
              variant="h5"
              sx={{ margin: "15px 0px 5px 25px" }}
              className="text-[18px] text-slate-700 dark:text-slate-300  capitalize font-400"
            >
              {!isCollapse && "Content"}
            </Typography>
            <Item
              title="Create course"
              to="/admin/create-course"
              icon={<QueueIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Item
              title="Live courses"
              to="/admin/courses"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Typography
              variant="h5"
              sx={{ margin: "15px 0px 5px 25px" }}
              className="text-[18px] text-slate-700 dark:text-slate-300  capitalize font-400"
            >
              {!isCollapse && "Customization"}
            </Typography>
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<Category />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            {/* <Typography
              variant="h5"
              sx={{ margin: "15px 0px 5px 25px" }}
              className="text-[18px] text-slate-700 dark:text-slate-300  capitalize font-400"
            >
              {!isCollapse && "Controllers"}
            </Typography>
            <Item
              title="Manage team"
              to="/admin/team"
              icon={<WorkspacesIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            /> */}
            <Typography
              variant="h5"
              sx={{ margin: "15px 0px 5px 25px" }}
              className="text-[18px] text-slate-700 dark:text-slate-300  capitalize font-400"
            >
              {!isCollapse && "Analytics"}
            </Typography>
            <Item
              title="Course analytics"
              to="/admin/course-analytics"
              icon={<AnalyticsIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Item
              title="Order analytics"
              to="/admin/order-analytics"
              icon={<EqualizerIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Item
              title="User analytics"
              to="/admin/user-analytics"
              icon={<DataUsageIcon />}
              selected={selected}
              setSelected={setSelected}
              router={router}
            />
            <Box sx={{ height: 10 }}></Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AdminSidebar;
