'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';
import Image from 'next/image';
import CurrentUser from '../components/CurrentUser';

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
    <div className="hidden xl:block xl:w-1/4 2xl:w-1/5 h-[1945px] bg-gradient-to-t from-two to-five p-8">
      {session?.status === 'authenticated' && (
        <div className="flex flex-col justify-between items-center gap-2 p-2 rounded-lg bg-four">
          <div
            className="flex justify-center items-center w-full cursor-pointer gap-1 line-clamp-1"
            onClick={() => router.push('/profile?username')}
          >
            <div className="relative w-20 h-14 overflow-hidden rounded-full">
              <Image src={user?.image} fill alt={session?.data?.user?.name} />
            </div>
            <h1 className=" text-white w-full text-nowrap">
              {session?.data?.user?.name}{' '}
            </h1>
          </div>

          <Button
            title={'تسجيل الخروج'}
            style={
              'p-2 text-lg text-white text-nowrap bg-five hover:bg-one rounded-full w-full'
            }
            onClick={() => signOut(router.push('/'))}
          />
        </div>
      )}
      {/* <hr className="w-full bg-white h-1 border border-white my-4" /> */}
      {session?.status === 'unauthenticated' && (
        <div className="flex justify-center items-center gap-1 bg-four rounded-lg w-full p-2">
          <h1
            onClick={() => router.push('/login')}
            className="cursor-pointer text-white w-full font-bold text-lg hover:scale-[101%] bg-five hover:bg-one text-center p-1 rounded-lg "
          >
            تسجيل الدخول
          </h1>
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
