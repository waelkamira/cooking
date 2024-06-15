import Image from 'next/image';
import React from 'react';

export default function HomePageSidesPhotos() {
  return (
    <div className="hidden xl:block">
      <div className="absolute w-72 h-full -left-[130px] top-0 z-10 ">
        <Image
          src={'/vegetables.png'}
          layout="fill"
          objectFit="cover"
          alt="photo"
          priority
        />
      </div>
      <div className="absolute w-72 h-full -right-[130px] top-0 z-10 rotate-180">
        <Image
          src={'/vegetables.png'}
          layout="fill"
          objectFit="cover"
          alt="photo"
          priority
        />
      </div>
    </div>
  );
}
