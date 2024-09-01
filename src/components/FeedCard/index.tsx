import React from "react";
import Image from "next/image";
import { BiMessage, BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  tweet: Tweet | null;
}
const FeedCard = ({ tweet }: FeedCardProps) => {
  return (
    <div className="border border-l-0 border-r-0  border-gray-600 transition-all cursor-pointer p-4 hover:bg-slate-900">
      {tweet && (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-1">
            <Link href={`/${tweet.author?.id}`}>
              <Image
                className="rounded-full"
                src={tweet.author?.profileImageUrl || ""}
                alt="Picture of the author"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <div className="col-span-11">
            <h5>
              <span className="font-bold">
                <Link href={`/${tweet.author?.id}`}>
                  {tweet.author?.firstName}
                </Link>
              </span>
            </h5>
            <p className="w-full">{tweet.content}</p>
            {tweet.imageUrl && (
              <Image
                className="w-full h-full"
                src={tweet.imageUrl}
                alt="Picture of the author"
                width={50}
                height={50}
              />
            )}
            <div className="flex justify-between items-center mt-5  text-xl">
              <div>
                <BiMessageRounded />
              </div>
              <div>
                <FaRetweet />
              </div>
              <div>
                <AiOutlineHeart />
              </div>
              <div>
                <BiUpload />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
