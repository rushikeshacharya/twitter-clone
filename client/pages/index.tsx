"use client";
import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import {
  BiHomeCircle,
  BiHash,
  BiUser,
  BiMoney,
  BiImageAlt,
} from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}
const sideBarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notification",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];
export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google Token Not Found");

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified Success");
      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      console.log("Token", verifyGoogleToken);
    },
    []
  );
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-8 px-4">
          <div className="text-4xl h-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all w-fit">
            <BsTwitter />
          </div>
          <div className="mt-4 text-2xl pr-4">
            {sideBarMenuItems.map((item) => (
              <li
                className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer placeholder-sky-400 mt-2"
                key={item.title}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </li>
            ))}
            <div className="mt-5 px-3 ">
              <button className="bg-[#1d9bf0] py-2 px-4 rounded-full w-full text-lg font-semibold">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] aborder-gray-600">
          <div className="border border-gray-600 p-4 hover:bg-slate-900 transition-all:cursor-pointer border-r-0 border-l-0 border-b-0">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {
                  <Image
                    className="rounded-full "
                    src="https://avatars.githubusercontent.com/u/18182040?v=4"
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                }
              </div>
              <div className="col-span-11">
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New To Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
      <Toaster />
      <ReactQueryDevtools />
    </div>
  );
}
