'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import ImageUpload from './ImageUpload';
import CookingForm from './CookingForm';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
import { signIn, useSession } from 'next-auth/react';
import Button from './Button';
import Link from 'next/link';

export default function NewRecipeButton() {
  const [isVisible, setIsVisible] = useState(false);
  const session = useSession();

  return (
    <div className=" my-4 w-full bg-four rounded-lg p-2 z-50">
      {/* <h1 className="text-sm sm:text-xl text-nowrap p-2 text-white w-full text-end">
        شو طابخين اليوم؟
      </h1> */}
      <button
        className="w-full bg-five hover:scale-[100.5%] hover:bg-one shadow-lg transition-all duration-300 rounded-full text-lg md:text-2xl px-4 py-2 text-white text-nowrap"
        onClick={() => setIsVisible(true)}
      >
        إنشاء وصفة طبخ جديدة{' '}
      </button>
      {isVisible && (
        <div
          className="absolute flex justify-center items-start gap-4 overflow-auto w-full h-full border md:p-8 bg-four/90 border-five right-0 top-0 2xl:-top-8 rounded-lg z-50"
          onClick={() => setIsVisible(false)}
        >
          <div
            className="absolute top-2 right-2 sm:top-16 sm:right-16 flex justify-center items-center z-50 bg-five hover:bg-one cursor-pointer h-fit px-4 py-1 text-white font-semibold rounded-lg hover:scale-105 shadow-lg"
            onClick={() => setIsVisible(false)}
          >
            <h1>إغلاق</h1>
            <RxCross2 className="text-xl" />
          </div>
          <div
            className={
              (session?.status === 'unauthenticated'
                ? 'h-[650px]'
                : 'h-[2580px] sm:h-[2350px] lg:h-[2300px]') +
              ' relative bg-four w-full 2xl:w-2/3 flex flex-col items-start justify-center sm:flex-row 2xl:my-8 top-0 z-40 '
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={
                (session?.status === 'authenticated' ? 'h-full' : 'h-[650px]') +
                ' relative border border-five  w-full top-0 flex items-start justify-start rounded-lg '
              }
            >
              <Image
                src={'/background.png'}
                layout="fill"
                objectFit={'cover'}
                alt="photo"
                priority
              />
            </div>

            <div className="absolute w-full h-full flex flex-col items-center justify-start rounded-lg grow z-50 ">
              <div className="relative h-44 sm:h-72 lg:h-96 w-full ">
                <Image
                  src={'/decoration.png'}
                  fill
                  alt="decoration"
                  priority
                  className="m-0"
                />
              </div>
              {session?.status === 'unauthenticated' && (
                <div className="p-4 bg-four rounded-lg m-2 md:m-8 border border-one text-center">
                  <h1 className="text-lg md:text-2xl p-2  text-white">
                    يجب عليك تسجيل الدخول أولا لكي تتمكن من إنشاء وصفة جديدة
                  </h1>
                  <Link href={'/login'}>
                    {' '}
                    <Button title={'تسجيل الدخول'} />
                  </Link>{' '}
                </div>
              )}
              {session?.status === 'authenticated' && (
                <div className="w-full">
                  <div className="flex justify-center items-center w-full px-8">
                    <ImageUpload />
                    <TbArrowBigLeftLinesFilled className="hidden xl:block text-one text-5xl mx-32 animate-pulse transition-all duration-300" />
                  </div>
                  <CookingForm
                    setIsVisible={setIsVisible}
                    isVisible={isVisible}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
