"use client";
import TwitterLayout from "@/components/layout/TwitterLayout";
import Image from "next/image";
import type { GetServerSideProps, NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import { useCurrentUser } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { useUserById } from "@/hooks/user";
import { useRouter } from "next/navigation";
// import { getUserByIdQuery } from "@/graphql/query/user";
import { useCallback, useMemo } from "react";
// import {
//   followUserMutation,
//   unfollowUserMutation,
// } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

// interface ServerProps {
//   userInfo?: User;
// }

const UserProfilePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  //   const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { user } = useUserById(params.id);
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex items-center gap-3 py-3 px-3">
            <span className="cursor-pointer" onClick={() => router.back()}>
              <BsArrowLeftShort className="text-4xl" />
            </span>
            <div>
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <h1 className="text-md font-bold text-slate-500">
                {user?.tweets?.length} Tweets
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {user?.profileImageUrl && (
              <Image
                src={user?.profileImageUrl}
                alt="user-image"
                className="rounded-full"
                width={100}
                height={100}
              />
            )}
            <h1 className="text-2xl font-bold mt-5">
              {user?.firstName} {user?.lastName}
            </h1>
            {/* <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span>{props.userInfo?.followers?.length} followers</span>
                <span>{props.userInfo?.following?.length} following</span>
              </div>
              {currentUser?.id !== props.userInfo?.id && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnfollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div> */}
          </div>
          <div>
            {user?.tweets?.map((tweet) => (
              <FeedCard tweet={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export default UserProfilePage;
