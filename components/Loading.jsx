import React from 'react';
import { FaGear } from 'react-icons/fa6';

export default function Loading() {
  return (
    <div className="animate-pulse h-full rounded-lg">
      <div className="flex flex-col justify-start items-center bg-gray-300 rounded-lg w-full h-full p-8 transition duration-300">
        <div className="flex flex-col justify-center items-center">
          <FaGear className="animate-spin text-5xl mt-8 transition duration-300" />
          <FaGear className="animate-spin text-2xl transition duration-300 mx-8 w-full" />
        </div>
        <div className="w-full">
          <hr className="w-1/2 h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
          <hr className="w-3/4 h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
          <hr className="w-full h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
        </div>
      </div>
      <div className="flex flex-col justify-start items-center bg-gray-300 rounded-lg w-full h-full p-8 transition duration-300">
        <div className="flex flex-col justify-center items-center">
          <FaGear className="animate-spin text-5xl mt-8 transition duration-300" />
          <FaGear className="animate-spin text-2xl transition duration-300 mx-8 w-full" />
        </div>
        <div className="w-full">
          <hr className="w-1/2 h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
          <hr className="w-3/4 h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
          <hr className="w-full h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
        </div>
      </div>
      <div className="flex flex-col justify-start items-center bg-gray-300 rounded-lg w-full h-full p-8 transition duration-300">
        <div className="flex flex-col justify-center items-center">
          <FaGear className="animate-spin text-5xl mt-8 transition duration-300" />
          <FaGear className="animate-spin text-2xl transition duration-300 mx-8 w-full" />
        </div>
        <div className="w-full">
          <hr className="w-1/2 h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
          <hr className="w-3/4 h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
          <hr className="w-full h-[10px] bg-gray-600 rounded-full border-hidden animate-pulse my-4 transition duration-300" />
        </div>
      </div>
    </div>
  );
}
