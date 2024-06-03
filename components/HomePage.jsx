'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import NewRecipeButton from './NewRecipeButton';
import Categories from './Categories';
import AllCookingRecipes from './AllCookingRecipes';
import { useSession } from 'next-auth/react';
import { ImMenu } from 'react-icons/im';
import SideBarMenu from './SideBarMenu';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  if (typeof window !== 'undefined') {
    localStorage.setItem('image', JSON.stringify(session?.data?.user?.image));
  }

  return (
    <div className="relative flex flex-col justify-center items-center p-2 sm:p-4 lg:p-8 xl:w-4/5 z-50 sm:my-0 w-full">
      <div className="xl:hidden absolute flex flex-col items-end gap-2 z-50 top-4 left-4 lg:top-12 lg:left-12 w-full">
        <ImMenu
          className=" p-2 rounded-lg text-4xl lg:text-four lg:bg-one text-one bg-four "
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && <SideBarMenu />}
      </div>
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
      <div className="flex flex-col justify-center items-start xl:flex-row mt-8 2xl:h-[1120px] w-full rounded-lg gap-4">
        <Categories />
        <AllCookingRecipes />
      </div>
    </div>
  );
}
