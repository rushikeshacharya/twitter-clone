import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiMoney, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
// import { AiOutlineHeart } from "react-icons/sl";


const FeedCard: React.FC = () => {
  return (
    <div className="border border-gray-600 p-4 hover:bg-slate-900 transition-all:cursor-pointer border-r-0 border-l-0 border-b-0">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
            <Image src="https://avatars.githubusercontent.com/u/18182040?v=4" alt="user-image" height={50} width={50}></Image>
            
        </div>
        <div className="col-span-11">
            <h5>Rushikesh Acharya</h5>
            <p>Hijkl sdfkd skldfjalk a;sldkjf asdflkj awe fa;lskdjflaksdj; al;skdjf;l kajsdlfk jkdlfsjalkfjds;la a;lkdjf; la</p>
            <div className="flex justify-between mt-5 text-xl items-center p-2">
                <div className="">
                    <BiMessageRounded/>
                </div>
                <div className="">
                    <FaRetweet/>
                </div>
                <div className="">
                    <AiOutlineHeart/>
                </div>
                <div className="">
                    <BiUpload/>
                </div>
            </div>
        </div> 
      </div>
    </div>
  );
}; 

export default FeedCard;
