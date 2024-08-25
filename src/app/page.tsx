"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { FaTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FaHashtag } from "react-icons/fa";
import { IoNotifications, IoBookmark } from "react-icons/io5";
import { SlEnvolope, SlOptions } from "react-icons/sl";
import { LuUser } from "react-icons/lu";
import FeedCard from "@/components/FeedCard";
import { BiMoney } from "react-icons/bi";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verify } from "crypto";
import { veryUserGoogleTokenQuery } from "@/graphql/query/user";

type TwitterSidebarButton = {
  title: string;
  icon: React.ReactNode;
};

const sidebarButtons: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
  },
  {
    title: "Explore",
    icon: <FaHashtag />,
  },
  {
    title: "Notifications",
    icon: <IoNotifications />,
  },
  {
    title: "Messages",
    icon: <SlEnvolope />,
  },
  {
    title: "Bookmarks",
    icon: <IoBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },

  {
    title: "Profile",
    icon: <LuUser />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];
export default function Home() {
  const handleGoogleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) {
      toast.error("Google login failed");
      return;
    }
    const { verifyGoogleToken } = await graphqlClient.request(
      veryUserGoogleTokenQuery,
      { token: googleToken }
    );
    if (!verifyGoogleToken) {
      toast.error("Google login failed");
      return;
    }
    window.localStorage.setItem("token", googleToken);
    toast.success("Google login successful");
  }, []);
  return (
    <div>
      <div className=" grid grid-cols-12 h-screen w-screen px-56">
        <div className="flex flex-col justify-start pt-8 px-4 col-span-3">
          <div className=" text-4xl w-fit h-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
            <FaTwitter />
          </div>
          <div>
            <ul className="mt-4 flex flex-col gap-2">
              {sidebarButtons.map((button, index) => (
                <li
                  key={button.title}
                  className="flex font-semibold hover:bg-gray-800  gap-4 items-center rounded-full w-fit px-4 cursor-pointer py-2 "
                >
                  <div className=" text-2xl h-fit  rounded-full cursor-pointer">
                    {button.icon}
                  </div>
                  <div>{button.title}</div>
                </li>
              ))}
            </ul>
            <div className="px-4">
              <button className=" bg-[#1d9bf0] font-semibold text-lg mr-3 mt-5 rounded-full w-full text-center p-3">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className=" col-span-6 border-l-[1px] border-r-[1px] border-slate-400 ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className=" col-span-3">
          <div className=" p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New to Twitter</h1>
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
