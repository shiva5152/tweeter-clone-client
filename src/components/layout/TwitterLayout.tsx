"use client";
import { graphqlClient } from "@/clients/api";
import { veryUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import { BiMoney } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoBookmark, IoNotifications } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { SlEnvolope, SlOptions } from "react-icons/sl";
import Link from "next/link";

type TwitterSidebarButton = {
  title: string;
  icon: React.ReactNode;
  link: string;
};

export default function TwitterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();

  const handleGoogleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;

    if (!googleToken) {
      toast.error("Google login failed");
      return;
    }
    try {
      const { verifyGoogleToken } = await graphqlClient.request(
        veryUserGoogleTokenQuery,
        { token: googleToken }
      );
      if (!verifyGoogleToken) {
        toast.error("Google login failed");
        return;
      }
      window.localStorage.setItem("token", verifyGoogleToken);
      await queryClient.refetchQueries({ queryKey: ["getCurrentUser"] });
      toast.success("Google login successful");
    } catch (error) {
      console.error("GraphQL Error:", error);
      toast.error("An error occurred during Google login");
    }
  }, []);
  const sidebarButtons: TwitterSidebarButton[] = [
    {
      title: "Home",
      icon: <GoHomeFill />,
      link: "/",
    },
    {
      title: "Explore",
      icon: <FaHashtag />,
      link: "/explore",
    },
    {
      title: "Notifications",
      icon: <IoNotifications />,
      link: "/notifications",
    },
    {
      title: "Messages",
      icon: <SlEnvolope />,
      link: "/messages",
    },
    {
      title: "Bookmarks",
      icon: <IoBookmark />,
      link: "/bookmarks",
    },
    {
      title: "Twitter Blue",
      icon: <BiMoney />,
      link: "/twitter-blue",
    },

    {
      title: "Profile",
      icon: <LuUser />,
      link: `/${user?.id}`,
    },
    {
      title: "More",
      icon: <SlOptions />,
      link: "/more",
    },
  ];
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
                <Link href={button.link} key={button.title}>
                  <li
                    key={button.title}
                    className="flex font-semibold hover:bg-gray-800  gap-4 items-center rounded-full w-fit px-4 cursor-pointer py-2 "
                  >
                    <div className=" text-2xl h-fit  rounded-full cursor-pointer">
                      {button.icon}
                    </div>
                    <div>{button.title}</div>
                  </li>
                </Link>
              ))}
            </ul>
            <div className="px-4">
              <button className=" bg-[#1d9bf0] font-semibold text-lg mr-3 mt-5 rounded-full w-full text-center p-3">
                Tweet
              </button>
            </div>
            {user ? (
              <div className="hover:bg-gray-800 rounded-full p-3  mt-4">
                <div className=" flex gap-2 items-center">
                  <div className=" text-2xl">
                    <Image
                      src={user.profileImageUrl || ""}
                      alt="profile"
                      width={30}
                      height={30}
                      className=" rounded-full"
                    />
                  </div>
                  <div>
                    <div className=" text-sm">{user?.email}</div>
                    <div className=" text-sm text-gray-500">
                      @{user?.firstName}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className=" col-span-6 border-l-[1px] border-r-[1px] border-slate-400 ">
          {children}
        </div>
        <div className=" col-span-3">
          {!user && (
            <div className=" p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter</h1>
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
