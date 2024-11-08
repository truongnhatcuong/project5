import React from "react";
import ListItem from "./ListItem";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoSearchSharp, IoCart } from "react-icons/io5";

const HeadePager = () => {
  return (
    <div className="flex justify-around bg-white shadow-lg mt-5 mb-3">
      <div>
        <Link href={"/"}>
          {" "}
          <Image src={"/Image/logo.png"} alt="Logo" width={200} height={50} />
        </Link>
      </div>
      <div className="mt-7 hidden md:flex flex-grow justify-center">
        <ListItem />
      </div>
      <div className="flex items-center space-x-6 mr-3">
        {/* Search Input */}
        <div className="relative flex items-center border rounded-md p-2">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2"
          />
          <IoSearchSharp className="text-gray-500 ml-2 text-xl" />
        </div>
        <div>
          <Link href={"/login"}>
            <FaUser className="text-gray-700 hover:text-blue-500 cursor-pointer text-xl border border-black rounded-full w-6 h-6 p-0.5" />
          </Link>
        </div>
        <div>
          <Link href={"/cart"}>
            <IoCart className="text-gray-700 hover:text-blue-500 cursor-pointer text-2xl  " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeadePager;
