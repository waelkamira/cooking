import Image from 'next/image';
import React from 'react';
import Button from './Button';

export default function TheGarden() {
  const numberOfCubs = 9;
  const arr = [];
  const result = () => {
    for (let i = 0; i < numberOfCubs; i++) {
      arr.push(
        <div className="flex justify-center items-center size-20 bg-white m-2 rounded-lg text-center">
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
    <div className="text-white">
      <div className="grid grid-cols-3 ">{result()}</div>
    </div>
  );
}
