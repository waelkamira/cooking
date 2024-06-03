'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';
import Image from 'next/image';
import CurrentUser from '../components/CurrentUser';
import Categories from './Categories';
import NewRecipeButton from './NewRecipeButton';

export default function SideBar() {
  const router = useRouter();
  const session = useSession();
  const [newImage, setNewImage] = useState('');
  const user = CurrentUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ima = localStorage.getItem('image');
      setNewImage(ima);
    }
  }, []);

  return (
    <div className="hidden xl:block xl:w-1/3 h-[1945px] bg-gradient-to-t from-two to-five p-8">
      {session?.status === 'authenticated' && (
        <div className="flex justify-between items-center bg-four p-2 rounded-lg">
          <div
            className="flex justify-center items-center w-full cursor-pointer gap-1 line-clamp-1"
            onClick={() => router.push('/profile?username')}
          >
            <div className="relative w-14 h-10 overflow-hidden rounded-full">
              <Image src={user?.image} fill alt={session?.data?.user?.name} />
            </div>
            <h1 className=" text-white w-full text-nowrap">
              {session?.data?.user?.name}{' '}
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
            className="cursor-pointer text-white w-full font-bold"
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
            style={''}
            onClick={() => router.push('/favoritePosts')}
          />
        </div>
      )}
    </div>
  );
}
