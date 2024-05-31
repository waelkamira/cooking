'use client';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
import CurrentUser from '../components/CurrentUser';
import Link from 'next/link';

export default function Item({
  image,
  mealName,
  ingredients,
  theWay,
  advise,
  link,
  createdAt,
}) {
  const user = CurrentUser();

  const router = useRouter();

  console.log(createdAt);
  //? src نريد ان نستخرج منه قيمة ال string لكنه نص  ifram html الذي هو عبارة عن عنصر  link انشأنا ديف مؤقت لوضع ال
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = link;

  //? داخل هذا الديف iframe بحثنا عن اول
  let iframeElement = tempDiv.querySelector('iframe');

  //? موجود ifram اذا كان عنصر ال src استخرجنا قيمة ال
  let iframeSrc = iframeElement ? iframeElement.getAttribute('src') : null;

  console.log(iframeSrc);
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
      <div className="flex flex-row-reverse justify-between items-center w-full mt-8">
        <h1 className="text-lg sm:text-xl text-nowrap mx-2 font-bold text-white bg-four rounded-full py-2 px-4 select-none">
          الوصفة{' '}
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
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full lg:w-2/3 xl:w-1/2 border  rounded-lg p-2 sm:p-8 mt-8 bg-white">
          <div className="flex justify-end items-center gap-2 w-full mb-4">
            <div className="flex flex-col justify-center items-end w-full">
              <h6 className="text-[12px] sm:text-[15px] text-eight font-semibold select-none">
                {user?.name}
              </h6>
              {/* <h1 className="text-[12px] sm:text-[12px] text-gray-400 font-semibold select-none">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
            </h1> */}
            </div>
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <Image src={user?.image} fill alt={mealName} className="bg-one" />
            </div>
          </div>{' '}
          <div className="relative w-full h-44 sm:h-72 overflow-hidden rounded-lg border ">
            <Image src={image} fill alt={mealName} />
          </div>
          <h1 className="text-four my-4 text-3xl md:text-5xl font-bold text-center select-none  rounded-lg p-2">
            {mealName}
          </h1>
          <div className="bg-white rounded-lg p-2 lg:p-8">
            <div className="flex flex-row justify-between items-center mb-16 bg-four h-16 rounded-lg w-full overflow-visible">
              <div className="relative size-24 md:size-32 xl:w-44 xl:size-44 overflow-hidden rounded-lg grow">
                <Image src={'/item7.png'} fill alt={mealName} />
              </div>
              <h1 className="text-white font-bold text-xl sm:text-3xl text-end w-full my-2 select-none">
                المقادير
              </h1>
              <h1 className="text-one font-bold text-2xl mx-2 select-none">
                #
              </h1>
            </div>
            <pre className="text-md lg:text-lg font-bold text-end w-full select-none">
              {ingredients}
            </pre>
            <div className="flex flex-row justify-between items-center my-16 bg-four h-16 rounded-lg w-full overflow-visible">
              <div className="relative size-24 md:size-32 xl:w-44 xl:size-44 overflow-hidden rounded-lg rotate-45">
                <Image src={'/item9.png'} fill alt={mealName} />
              </div>
              <h1 className="text-white font-bold text-xl sm:text-3xl text-end w-full my-2 select-none">
                الطريقة
              </h1>
              <h1 className="text-one font-bold text-2xl mx-2 select-none">
                #
              </h1>
            </div>
            <pre className="text-lg font-bold text-end w-full select-none">
              {theWay}
            </pre>
            <div className="flex flex-row justify-between items-center my-16 bg-four h-16 rounded-lg w-full overflow-visible">
              <div className="relative w-24 h-24 md:w-32 md:h-32 xl:w-44 xl:h-44 overflow-hidden rounded-lg">
                <Image src={'/item8.png'} fill alt={mealName} />
              </div>
              <h1 className="text-white font-bold text-xl sm:text-3xl text-end w-full my-2 select-none">
                نصائح
              </h1>
              <h1 className="text-one font-bold text-2xl mx-2 select-none">
                #
              </h1>
            </div>
            <pre className="text-lg font-bold text-end w-full mt-10 select-none">
              {advise}
            </pre>
            <div className="flex flex-row justify-between items-center my-16 bg-four h-16 rounded-lg w-full overflow-visible">
              <div className="relative w-24 h-24 md:w-32 md:h-32 xl:w-44 xl:h-44 overflow-hidden rounded-lg rotate-45">
                <Image src={'/item10.png'} fill alt={mealName} />
              </div>
              <h1 className="text-white font-bold text-2xl lg:text-3xl text-end w-full my-2 select-none">
                فيديو{' '}
              </h1>
              <h1 className="text-one font-bold text-2xl mx-2 select-none">
                #
              </h1>
            </div>

            <div className="flex justify-center items-center w-full mt-16">
              <iframe
                // width="560"
                // height="315"
                src={iframeSrc}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                className="rounded-lg w-full h-full sm:h-52 2xl:h-96"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
