'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import CurrentUser from '../components/CurrentUser';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function SideBarMenu({ setIsOpen }) {
  const session = useSession();
  const user = CurrentUser();

  console.log('user', user);
  return (
    <div className="xl:hidden p-4 w-52 h-fit border-[5px] border-one bg-four rounded-lg z-50">
      {session?.status === 'authenticated' && (
        <Link href={'/profile?username'}>
          <div className="flex flex-col justify-between items-center rounded-lg w-full">
            <div className="flex justify-start items-center w-full cursor-pointer line-clamp-1 mb-2">
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image src={user?.image} fill alt={session?.data?.user?.name} />
              </div>
              <h1 className=" text-white text-nowrap text-start mx-3 text-sm line-clamp-1 select-none">
                {session?.data?.user?.name}
              </h1>
            </div>
          </div>
        </Link>
      )}
      {session?.status === 'unauthenticated' && (
        <Button path={'/login'} title={'تسجيل الدخول'} />
      )}
      {session?.status === 'authenticated' && (
        <Button path={'/favoritePosts'} title={'طبخاتي المفضلة'} />
      )}

      {session?.status === 'authenticated' && user?.isAdmin && (
        <Button path={'/users'} title={'المستخدمين'} />
      )}
      {session?.status === 'authenticated' && (
        <div>
          <Button path={'/whatToCookToday'} title={'شو أطبخ اليوم؟'} />
          <Button path={'/'} title={'تسجيل الخروج'} onClick={() => signOut()} />
        </div>
      )}
      <Button path={'/'} title={'إغلاق'} onClick={() => setIsOpen(false)} />
    </div>
  );
}
