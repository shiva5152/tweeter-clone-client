import React from "react";
import Image from "next/image";
import { BiMessage, BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard = () => {
  return (
    <div className="border border-l-0 border-r-0  border-gray-600 transition-all cursor-pointer p-4 hover:bg-slate-900">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/86485099?v=4"
            alt="Picture of the author"
            width={50}
            height={50}
          />
        </div>
        <div className="col-span-11">
          <h5>
            <span className="font-bold">Kunal</span>
          </h5>
          <p className="w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            culpa! Eius facilis voluptatem ad dicta, voluptate suscipit! Nisi.
          </p>
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
    </div>
  );
};

export default FeedCard;
