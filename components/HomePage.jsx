'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import NewRecipeButton from './NewRecipeButton';
import Categories from './Categories';
import AllCookingRecipes from './AllCookingRecipes';

export default function HomePage() {
  return (
    <div className="relative flex flex-col justify-center items-center lg:p-8 xl:w-4/5 z-50 xl:mt-4 sm:my-0 w-full p-2">
      <div className="relative w-full h-24 sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-one">
        <Image
          priority
          src={'/1.png'}
          layout="fill"
          objectFit="cover"
          alt="photo"
        />
      </div>
      <SearchBar />
      <NewRecipeButton />
      <div className="relative flex justify-center w-full  rounded-lg p-2">
        <div className="relative w-full h-24 sm:h-[200px] ">
          <Image
            priority
            src={'/nasoh2.png'}
            layout="fill"
            objectFit="contain"
            alt="photo"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse justify-center items-start 2xl:flex-row-reverse sm:gap-4 mt-8 2xl:h-[1120px] w-full rounded-lg">
        {' '}
        <AllCookingRecipes />
        <Categories />
      </div>
    </div>
  );
}
