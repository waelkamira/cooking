import Image from 'next/image';
import React from 'react';

export default function HomePageSidesPhotos() {
  return (
    <div className="hidden sm:block">
      <div className="absolute w-52 h-screen -left-[160px] top-0 z-10">
        <Image
          src={'/vegetables.png'}
          layout="fill"
          objectFit="contain"
          alt="photo"
          priority
        />
      </div>
      <div className="absolute w-52 h-full -right-52 top-0 z-10 -rotate-180">
        <Image
          src={'/stru.png'}
          layout="fill"
          objectFit="contain"
          alt="photo"
          priority
        />
      </div>
    </div>
  );
}
