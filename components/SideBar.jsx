'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';
import Image from 'next/image';
export default function SideBar() {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="hidden 2xl:block w-1/4 h-[1845px] bg-gradient-to-t from-two to-five p-8">
      {session?.status === 'authenticated' && (
        <div className="flex flex-row-reverse justify-between items-center bg-four p-2 rounded-lg">
          <div
            className="flex flex-row justify-between items-center w-full grow gap-2 cursor-pointer"
            onClick={() => router.push('/profile?username')}
          >
            <h1 className=" text-white w-full text-end">
              {session?.data?.user?.name}{' '}
            </h1>
            <div className="relative w-14 h-10 overflow-hidden rounded-full">
              <Image
                src={session?.data?.user?.image}
                fill
                alt={session?.data?.user?.name}
              />
            </div>
          </div>
          <Button
            title={'تسجيل الخروج'}
            style={'p-2 text-sm text-white text-nowrap bg-one rounded-full '}
            onClick={() => signOut(router.push('/'))}
          />
        </div>
      )}
      {session?.status === 'unauthenticated' && (
        <div className="flex flex-col justify-center items-end gap-1">
          <h1
            onClick={() => router.push('/login')}
            className="cursor-pointer text-white w-full text-end font-bold"
          >
            تسجيل الدخول
          </h1>
          <hr className="w-24 bg-four h-1 border border-four" />
          <hr className="w-24 bg-four h-1 border border-four" />
        </div>
      )}
    </div>
  );
}
