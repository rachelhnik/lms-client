"use client";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type Props = {
  title: string;
  videoUrl: string;
};

const CoursePlayer: FC<Props> = ({ title, videoUrl }) => {
  const [videoData, setVideoData] = useState({ otp: "", playbackInfo: "" });
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/courses/getVideoCipherOtp`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  console.log(videoUrl);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allow="encrypted-media"
          allowFullScreen={true}
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
