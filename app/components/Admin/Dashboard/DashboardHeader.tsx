"use client";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/NotificationApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIo from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: (data: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio("../../../../public/mixkit-bell-notification-933.wav")
  );

  const playerNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data?.notifications.filter(
          (notification: any) => notification.status === "unread"
        )
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playerNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 ">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => (setOpen ? setOpen(!open) : "")}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-slate-300" />
        <span className="absolute -top-2 -right-2 bg-blue-200 rounded-full w-[20px] h-[20px] text-[12px] text-black flex items-center justify-center">
          {notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] bg-white dark:bg-[#111C43] shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center font-Poppins text-[20px] text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications &&
            notifications.map((notificationData: any, index: number) => (
              <div
                key={index}
                className="border-b border-b-[#0000000f] font-Poppins bg-[#00000013] dark:bg-[#2d3a4ea1] dark:border-b=[#ffffff47"
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">
                    {notificationData.title}
                  </p>
                  <p
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() =>
                      handleNotificationStatusChange(notificationData._id)
                    }
                  >
                    Marked as read
                  </p>
                </div>
                <p className="px-2 text-white dark:text-black">
                  {notificationData.message}
                </p>
                <p className="p-2 text-[14px] text-white dark:text-black">
                  {format(notificationData.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
