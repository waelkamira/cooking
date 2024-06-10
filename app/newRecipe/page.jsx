'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import ImageUpload from '../../components/ImageUpload';
import CookingForm from '../../components/CookingForm';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
import { signIn, useSession } from 'next-auth/react';
import Button from '../../components/Button';
import Link from 'next/link';
import BackButton from '../../components/BackButton';

export default function NewRecipe() {
  const [isVisible, setIsVisible] = useState(false);
  const session = useSession();
  return (
    <div
      className=" flex justify-center items-start gap-4 overflow-auto w-full h-full border border-five md:p-8 bg-four/90  right-0 top-0 2xl:-top-8 rounded-lg z-50"
      onClick={() => setIsVisible(false)}
    >
      <div
        className={
          (session?.status === 'unauthenticated'
            ? 'h-[650px]'
            : 'h-[2620px] sm:h-[2350px] lg:h-[2500px]') +
          ' relative w-full 2xl:w-2/3 flex flex-col items-start justify-center sm:flex-row top-0 overflow-hidden'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={
            (session?.status === 'authenticated' ? 'h-full' : 'h-[670px]') +
            ' relative border border-five w-full top-0 flex items-start justify-start rounded-lg overflow-hidden'
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
          <BackButton className="z-50 bg-one" />

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
                <TbArrowBigLeftLinesFilled className="hidden xl:block text-one text-5xl mx-32 animate-pulse transition-all duration-300" />
                <ImageUpload />
              </div>
              <CookingForm setIsVisible={setIsVisible} isVisible={isVisible} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
