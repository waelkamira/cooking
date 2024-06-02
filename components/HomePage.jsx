'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import NewRecipeButton from './NewRecipeButton';
import Categories from './Categories';
import AllCookingRecipes from './AllCookingRecipes';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const session = useSession();
  if (typeof window !== 'undefined') {
    localStorage.setItem('image', JSON.stringify(session?.data?.user?.image));
  }

  return (
    <div className="relative flex flex-col justify-center items-center p-2 sm:p-4 lg:p-8 xl:w-4/5 z-50 sm:my-0 w-full">
      <div className="relative hidden lg:block w-full h-24 sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-one">
        <Image
          priority
          src={'/1.png'}
          layout="fill"
          objectFit="cover"
          alt="photo"
        />
      </div>
      <SearchBar />
      <div className="w-full">
        <div className=" lg:hidden flex flex-col justify-between items-center w-full h-full rounded-lg">
          <NewRecipeButton />
        </div>
        <div className="hidden lg:flex justify-between items-center w-full h-full rounded-lg p-2 ">
          <div className=" relative w-full lg:w-56 h-24 sm:h-[200px] ">
            <Image
              priority
              src={'/نصوح.png'}
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
          <NewRecipeButton />

          <div className=" relative w-full lg:w-72 h-24 sm:h-[200px] ">
            <Image
              priority
              src={'/بهيجة2.png'}
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
        </div>
      </div>
      <h1 className="text-md sm:text-lg lg:text-3xl text-nowrap mx-2 font-bold text-white bg-four rounded-full py-2 px-4 select-none">
        أحدث المنشورات
      </h1>
      <div className="flex flex-col-reverse justify-center items-start 2xl:flex-row-reverse sm:gap-4 mt-8 2xl:h-[1120px] w-full rounded-lg">
        <AllCookingRecipes />
        {/* <Categories /> */}
      </div>
    </div>
  );
}
