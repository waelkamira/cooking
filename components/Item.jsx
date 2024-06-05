'use client';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
import CurrentUser from '../components/CurrentUser';
import Link from 'next/link';
import Button from './Button';

export default function Item({
  image,
  mealName,
  ingredients,
  theWay,
  advise,
  link,
  createdAt,
  userImage,
  userName,
}) {
  const user = CurrentUser();
  const router = useRouter();
  const session = useSession();

  console.log(typeof createdAt);
  console.log(createdAt);
  //? src نريد ان نستخرج منه قيمة ال string لكنه نص  ifram html الذي هو عبارة عن عنصر  link انشأنا ديف مؤقت لوضع ال
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = link;

  //? داخل هذا الديف iframe بحثنا عن اول
  let iframeElement = tempDiv.querySelector('iframe');

  //? موجود ifram اذا كان عنصر ال src استخرجنا قيمة ال
  let iframeSrc = iframeElement ? iframeElement.getAttribute('src') : null;

  // console.log(iframeSrc);
  return (
    <>
      {session?.status === 'unauthenticated' && (
        <div className="p-4 bg-four rounded-lg m-2 md:m-8 border border-one text-center h-screen">
          <h1 className="text-lg md:text-2xl p-2 my-8 text-white">
            يجب عليك تسجيل الدخول أولا لرؤية هذه الوصفة
          </h1>
          <Link href={'/login'}>
            {' '}
            <Button title={'تسجيل الدخول'} />
          </Link>{' '}
        </div>
      )}
      {session?.status === 'authenticated' && (
        <div className="w-full bg-four h-full p-4 lg:p-8 rounded-lg">
          <div className="hidden xl:block relative w-full h-24 sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-one">
            <Image
              priority
              src={'/1.png'}
              layout="fill"
              objectFit="cover"
              alt="photo"
            />
          </div>
          <div className="relative w-full h-52 overflow-hidden xl:mt-8">
            <Image
              priority
              src={'/logo1.png'}
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
          <div className="flex justify-between items-center w-full gap-4 my-8">
            <h1 className="grow text-lg lg:text-2xl w-full text-white ">
              الوصفة:{' '}
            </h1>
            <Link href={'/'}>
              <div className="flex items-center justify-center rounded-full overflow-hidden cursor-pointer xl:w-fit ">
                <button className=" text-white rounded-r-full font-bold text-lg lg:text-xl hover:scale-105 bg-one p-1 lg:p-2">
                  رجوع
                </button>
                <TbArrowBigLeftLinesFilled className=" text-white text-4xl lg:text-[44px] animate-pulse transition-all duration-300 bg-gray-500 rounded-l-full" />
              </div>
            </Link>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex flex-col w-full 2xl:w-2/3 border  rounded-lg p-2 sm:p-8 mt-8 bg-white">
              <div className="flex justify-start items-center gap-2 w-full mb-4">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    src={userImage}
                    fill
                    alt={mealName}
                    className="bg-one"
                  />
                </div>
                <div className="flex flex-col justify-center w-full">
                  <h6 className="text-[12px] sm:text-[15px] text-eight font-semibold select-none">
                    {userName}
                  </h6>
                  {/* <h1 className="text-[12px] sm:text-[12px] text-gray-400 font-semibold select-none">
                {formatDistanceToNow(new Date(createdAt), {
                  addSuffix: true,
                })}
              </h1> */}
                </div>
              </div>
              <div className="relative w-full h-44 sm:h-96 overflow-hidden rounded-lg border ">
                <Image src={image} fill alt={mealName} />
              </div>
              <h1 className="text-four my-4 text-3xl md:text-5xl font-bold text-center select-none  rounded-lg p-2">
                {mealName}
              </h1>
              <div className="bg-white rounded-lg p-2 lg:p-8">
                <div className="flex justify-between items-center mb-16 bg-four h-16 rounded-lg w-full overflow-visible">
                  <h1 className="text-white font-bold text-xl sm:text-3xl w-full my-2 select-none">
                    <span className="text-one font-bold text-2xl mx-2 select-none">
                      #
                    </span>
                    المقادير
                  </h1>
                  <div className="relative size-24 md:size-32 xl:w-44 xl:size-44 overflow-hidden rounded-lg grow">
                    <Image src={'/item7.png'} fill alt={mealName} />
                  </div>
                </div>
                <pre className="text-md lg:text-lg font-bold w-full select-none">
                  {ingredients}
                </pre>
                <div className="flex justify-between items-center my-16 bg-four h-16 rounded-lg w-full overflow-visible">
                  <h1 className="text-white font-bold text-xl sm:text-3xl w-full my-2 select-none">
                    <span className="text-one font-bold text-2xl mx-2 select-none">
                      #
                    </span>
                    الطريقة
                  </h1>
                  <div className="relative size-24 md:size-32 xl:w-44 xl:size-44 overflow-hidden rounded-lg rotate-45">
                    <Image src={'/item9.png'} fill alt={mealName} />
                  </div>
                </div>
                <pre className="text-lg font-bold w-full select-none">
                  {theWay}
                </pre>
                <div className="flex justify-between items-center my-16 bg-four h-16 rounded-lg w-full overflow-visible">
                  <h1 className="text-white font-bold text-xl sm:text-3xl w-full my-2 select-none">
                    <span className="text-one font-bold text-2xl mx-2 select-none">
                      #
                    </span>
                    نصائح
                  </h1>
                  <div className="relative w-24 h-24 md:w-32 md:h-32 xl:w-44 xl:h-44 overflow-hidden rounded-lg">
                    <Image src={'/item8.png'} fill alt={mealName} />
                  </div>
                </div>
                <pre className="text-lg font-bold w-full mt-10 select-none">
                  {advise}
                </pre>
                <div className="flex justify-between items-center my-16 bg-four h-16 rounded-lg w-full overflow-visible">
                  <h1 className="text-white font-bold text-2xl lg:text-3xl w-full my-2 select-none">
                    <span className="text-one font-bold text-2xl mx-2 select-none">
                      #
                    </span>
                    فيديو
                  </h1>
                  <div className="relative w-24 h-24 md:w-32 md:h-32 xl:w-44 xl:h-44 overflow-hidden rounded-lg rotate-45">
                    <Image src={'/item10.png'} fill alt={mealName} />
                  </div>
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
      )}
    </>
  );
}
