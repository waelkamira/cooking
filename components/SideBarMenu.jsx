'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import CurrentUser from '../components/CurrentUser';
import Button from './Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SideBarMenu() {
  const session = useSession();
  const user = CurrentUser();
  const router = useRouter();

  return (
    <div className="xl:hidden p-4 w-52 h-72 border-[5px] border-one bg-four rounded-lg z-50">
      {session?.status === 'authenticated' && (
        <div className="flex flex-col gap-2 justify-between items-center bg-four p-2 rounded-lg w-full">
          <div
            className="flex justify-around items-center w-full cursor-pointer line-clamp-1"
            onClick={() => router.push('/profile?username')}
          >
            <div className="relative w-14 h-10 overflow-hidden rounded-full">
              <Image src={user?.image} fill alt={session?.data?.user?.name} />
            </div>
            <h1 className=" text-white w-full text-nowrap text-start mx-3 text-lg">
              {session?.data?.user?.name}
            </h1>
          </div>
          <Button
            title={'تسجيل الخروج'}
            style={
              'p-2 text-sm text-white text-nowrap bg-one rounded-full w-full'
            }
            onClick={() => signOut(router.push('/'))}
          />
        </div>
      )}
      {session?.status === 'unauthenticated' && (
        <div className="flex flex-col justify-center items-start gap-1">
          <h1
            onClick={() => router.push('/login')}
            className="cursor-pointer text-white w-full font-bold text-center"
          >
            تسجيل الدخول
          </h1>
          <hr className="w-24 bg-four h-1 border border-four" />
          <hr className="w-24 bg-four h-1 border border-four" />
        </div>
      )}
      {session?.status === 'authenticated' && (
        <div className="bg-four my-4 rounded-lg p-2">
          <Button
            title={'طبخاتي المفضلة'}
            style={
              'p-2 text-sm text-white text-nowrap bg-one rounded-full w-full'
            }
            onClick={() => router.push('/favoritePosts')}
          />
        </div>
      )}
    </div>
  );
}
