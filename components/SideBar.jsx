'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';
import Image from 'next/image';
import CurrentUser from '../components/CurrentUser';
import TheGarden from './Garden';

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
    <div className="hidden xl:block xl:w-1/4 2xl:w-1/5 h-[2270px] bg-gradient-to-t from-two to-five p-4">
      <div className="w-full bg-four rounded-lg">
        {session?.status === 'authenticated' && (
          <div className="flex flex-col justify-between items-center p-4 rounded-lg w-full">
            <div
              className="flex justify-start items-center w-full cursor-pointer gap-2 line-clamp-1"
              onClick={() => router.push('/profile?username')}
            >
              <div className="relative size-14 overflow-hidden rounded-full">
                <Image src={user?.image} fill alt={session?.data?.user?.name} />
              </div>
              <h1 className=" text-white text-nowrap">
                {session?.data?.user?.name}{' '}
              </h1>
            </div>

            <div className="w-full">
              <Button
                title={'تسجيل الخروج'}
                style={' '}
                onClick={() => signOut()}
              />
            </div>
          </div>
        )}

        {session?.status === 'unauthenticated' && (
          <div className="px-4">
            <Button title={'تسجيل دخول'} style={' '} path="/login" />
          </div>
        )}
      </div>
      {session?.status === 'authenticated' && (
        <div className="w-full bg-four rounded-lg p-4 my-4">
          <Button
            title={'شو أطبخ اليوم؟'}
            style={' '}
            path="/whatToCookToday"
          />

          <Button title={'وصفات أعجبتني'} style={' '} path="/favoritePosts" />
          <Button title={'طبخاتي'} style={' '} path="/myRecipes" />
          <Button title={'الجوائز التي ربحتها'} style={' '} path="/myGarden" />

          {session?.status === 'authenticated' && user?.isAdmin && (
            <Button title={'المستخدمين'} style={' '} path="/users" />
          )}
          <div>
            <TheGarden />
          </div>
          <div className="relative h-[450px] w-full rounded-lg overflow-hidden">
            <Image src={'/menu6.png'} fill alt={'photo'} />
          </div>
        </div>
      )}
    </div>
  );
}
