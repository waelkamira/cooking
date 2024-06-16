'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

const smallSize = [
  { name: 'وجبة رئيسية', image: '/11.png' },
  { name: 'معجنات', image: '/22.png' },
  {
    name: 'شوربات',
    image: '/33.png',
  },
  {
    name: 'مقبلات',
    image: '/7.png',
  },
  {
    name: 'سلطات',
    image: '/6.png',
  },
  {
    name: 'حلويات',
    image: '/55.png',
  },
  {
    name: 'عصائر و مشروبات',
    image: '/44.png',
  },
];
export default function CategoriesSlid() {
  const router = useRouter();

  return (
    <div className="hidden xl:flex flex-col items-center justify-center p-4 w-full bg-four rounded-lg border-[10px] border-one">
      <h1 className="text-lg sm:text-xl text-center p-2 text-white mx-4 font-semibold w-full select-none">
        ابحث حسب الصنف
      </h1>
      {smallSize.map((category) => (
        <div className=" flex flex-col justify-center items-center rounded-full mx-4 cursor-pointer w-full ">
          <div
            className="relative border border-one w-full h-[150px] rounded-lg overflow-hidden hover:scale-[101%] transition-all duration-300 shadow-lg"
            onClick={() => router.push(`?searchCategory=${category?.name}`)}
          >
            <Image
              src={category.image}
              layout="fill"
              objectFit="cover"
              alt="photo"
            />
          </div>
          <h1 className="text-lg sm:text-xl text-center p-2 text-white mx-4 font-ةي w-full select-none">
            {category.name}
          </h1>
        </div>
      ))}
    </div>
  );
}
