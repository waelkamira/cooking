'use client';
import SmallItem from '../../components/SmallItem';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';

export default function page() {
  const [userFavorites, setUserFavorites] = useState([]);
  useEffect(() => {
    fetchUserFavorites();
  }, []);

  const fetchUserFavorites = async () => {
    await fetch('/api/favoritePosts')
      .then((res) => res.json())
      .then((res) => {
        console.log('this is res', res);
        setUserFavorites(res);
      });
  };
  return (
    <div className="w-full bg-four h-full p-4 lg:p-8 rounded-lg">
      <div className="relative w-full h-24 sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-one">
        <Image
          priority
          src={'/1.png'}
          layout="fill"
          objectFit="cover"
          alt="photo"
        />
      </div>
      <div className="flex flex-row-reverse justify-start items-center w-full gap-4 my-8">
        <h1 className="grow text-lg lg:text-2xl w-full text-end text-white ">
          وصفاتي المفضلة
        </h1>
        <Link href={'/'}>
          <div className="flex items-center justify-center rounded-full overflow-hidden cursor-pointer xl:w-fit ">
            <TbArrowBigLeftLinesFilled className=" text-white text-4xl lg:text-[44px] animate-pulse transition-all duration-300 bg-gray-500 rounded-l-full" />
            <button className=" text-white rounded-r-full font-bold text-lg lg:text-xl hover:scale-105 bg-one p-1 lg:p-2">
              رجوع
            </button>
          </div>
        </Link>
      </div>
      <div className="my-8">
        {userFavorites?.length === 0 && (
          <h1 className="text-2xl md:text-3xl w-full text-center text-white mt-8 ">
            😉 لا يوجد نتائج لعرضها ,لم تقم بحفظ أي وصفة بعد
          </h1>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 justify-center items-center w-full ">
          {userFavorites?.length > 0 &&
            userFavorites.map((recipe, index) => (
              <SmallItem recipe={recipe} index={index} show={false} id={true} />
            ))}
        </div>
      </div>
    </div>
  );
}
