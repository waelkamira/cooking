'use client';
import { inputsContext } from '../../components/Context';
import Image from 'next/image';
import React, { useContext } from 'react';

export default function TheGarden() {
  const { userRecipes } = useContext(inputsContext);

  const numberOfCubs = userRecipes?.length;
  const arr = [];
  const result = () => {
    for (let i = 0; i < numberOfCubs; i++) {
      arr.push(
        <div className="flex justify-center items-center size-[70px] bg-eleven m-2 rounded-lg text-center">
          <h1 className="relative w-16 h-16 hover:scale-105 transition-all duration-200">
            <Image
              src="/palm-tree.png"
              layout="fill"
              objectFit="contain"
              alt="palm-tree"
            />
          </h1>
        </div>
      );
    }
    return arr;
  };
  return (
    <div className="flex justify-center items-center text-white w-full h-full">
      <div className="flex flex-wrap justify-end items-start sm:min-w-[500px] w-fit sm:min-h-[500px] h-full bg-ten rounded-lg p-4">
        {result()}
      </div>
    </div>
  );
}
