"use client";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { useCreateTweet, useTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import { graphqlClient } from "@/clients/api";
import { getSignedUrlForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets } = useTweets();
  const { mutate: createTweet } = useCreateTweet();
  const [content, setContent] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (e: Event) => {
      e.preventDefault();
      const file = input.files?.[0];
      if (!file) return;

      const { getSignedUrlForTweet } = await graphqlClient.request(
        getSignedUrlForTweetQuery,
        {
          imageType: file.type.split("/")[1],
        }
      );

      if (!getSignedUrlForTweet) return;
      const toastId = toast.loading("Uploading image...");
      const res = await axios.put(getSignedUrlForTweet, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      toast.success("Image uploaded successfully", { id: toastId });
      const url = new URL(getSignedUrlForTweet);
      const filePath = `${url.origin}${url.pathname}`;
      setImageURL(filePath);
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(() => {
    createTweet({ content, imageUrl: imageURL });
    setContent("");
    setImageURL("");
  }, [content, createTweet, imageURL]);

  return (
    <>
      <TwitterLayout>
        <div>
          <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageUrl && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageUrl || ""}
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                  placeholder="What's happening?"
                  rows={3}
                ></textarea>
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt="tweet-image"
                    width={300}
                    height={300}
                  />
                )}
                <div className="mt-2 flex justify-between items-center">
                  <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tweets &&
          tweets.length > 0 &&
          tweets.map((tweet, index) => (
            <FeedCard key={tweet?.id || index} tweet={tweet as Tweet} />
          ))}
      </TwitterLayout>
    </>
  );
}
