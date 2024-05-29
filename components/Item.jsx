import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';

export default function Item({
  image,
  mealName,
  ingredients,
  theWay,
  advise,
  link,
  createdAt,
}) {
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
    <>
      <div className="flex flex-row-reverse justify-between items-center w-full">
        <h1 className="text-lg sm:text-2xl text-nowrap mx-2 font-bold text-white bg-four rounded-lg py-2 px-4">
          الوصفة{' '}
        </h1>
        <div
          className="flex justify-center gap-2 bg-four rounded-lg cursor-pointer"
          onClick={() => router.push('/')}
        >
          {' '}
          <TbArrowBigLeftLinesFilled className="hidden md:block text-white text-5xl animate-pulse transition-all duration-300" />
          <button className="p-2 text-white w-24 rounded-full font-bold text-lg lg:text-2xl hover:scale-105">
            رجوع{' '}
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-2/3 xl:w-1/2 border border-one rounded-lg p-2 sm:p-8 mt-8 bg-four">
        <div className="flex justify-end items-center gap-2 w-full mb-4">
          <div className="flex flex-col justify-center items-end w-full">
            <h6 className="text-[12px] sm:text-[15px] text-eight font-semibold">
              بهيجة اشرق لبن
            </h6>
            {/* <h1 className="text-[12px] sm:text-[12px] text-gray-400 font-semibold">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </h1> */}
          </div>
          <div className="relative w-10 h-10 overflow-hidden rounded-full">
            <Image src={'/bahiga.png'} fill alt={mealName} className="bg-one" />
          </div>
        </div>{' '}
        <div className="relative w-full h-44 sm:h-72 overflow-hidden rounded-lg border border-one">
          <Image src={image} fill alt={mealName} />
        </div>
        <h1 className="text-white my-8 text-3xl md:text-5xl font-bold text-center">
          {mealName}
        </h1>
        <div className="bg-white rounded-lg p-8">
          <div className="flex flex-row justify-between items-center my-4 bg-black h-16 rounded-lg w-full overflow-visible">
            <div className="relative size-24 md:size-32 xl:w-44 xl:size-44 overflow-hidden rounded-lg grow">
              <Image src={'/item7.png'} fill alt={mealName} />
            </div>
            <h1 className="text-white font-bold text-xl sm:text-3xl text-end w-full my-2">
              المقادير
            </h1>
            <h1 className="text-one font-bold text-2xl mx-2">#</h1>
          </div>
          <pre className="text-md lg:text-lg font-bold text-end w-full">
            {ingredients}
          </pre>
          <div className="flex flex-row justify-between items-center my-4 bg-black h-16 rounded-lg w-full overflow-visible">
            <div className="relative size-24 md:size-32 xl:w-44 xl:size-44 overflow-hidden rounded-lg rotate-45">
              <Image src={'/item9.png'} fill alt={mealName} />
            </div>
            <h1 className="text-white font-bold text-xl sm:text-3xl text-end w-full my-2">
              الطريقة
            </h1>
            <h1 className="text-one font-bold text-2xl mx-2">#</h1>
          </div>
          <pre className="text-lg font-bold text-end w-full">{theWay}</pre>
          <div className="flex flex-row justify-between items-center my-4 bg-black h-16 rounded-lg w-full overflow-visible">
            <div className="relative w-24 h-24 md:w-32 md:h-32 xl:w-44 xl:h-44 overflow-hidden rounded-lg">
              <Image src={'/item8.png'} fill alt={mealName} />
            </div>
            <h1 className="text-white font-bold text-xl sm:text-3xl text-end w-full my-2">
              نصائح
            </h1>
            <h1 className="text-one font-bold text-2xl mx-2">#</h1>
          </div>
          <pre className="text-lg font-bold text-end w-full mt-10">
            {advise}
          </pre>
          <div className="flex flex-row justify-between items-center my-4 bg-black h-16 rounded-lg w-full overflow-visible">
            <div className="relative w-24 h-24 md:w-32 md:h-32 xl:w-44 xl:h-44 overflow-hidden rounded-lg rotate-45">
              <Image src={'/item10.png'} fill alt={mealName} />
            </div>
            <h1 className="text-white font-bold text-2xl lg:text-3xl text-end w-full my-2">
              فيديو{' '}
            </h1>
            <h1 className="text-one font-bold text-2xl mx-2">#</h1>
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
    </>
  );
}
