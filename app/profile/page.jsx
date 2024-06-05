'use client';
import CurrentUser from '../../components/CurrentUser';
import ImageUpload from '../../components/ImageUpload';
import Button from '../../components/Button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { inputsContext } from '../../components/Context';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
import CustomToast from '../../components/CustomToast';

export default function Profile() {
  const user = CurrentUser();
  // console.log('this is user from profile', user);
  const { profile_image } = useContext(inputsContext);
  // console.log('this is profile_image', profile_image?.image);
  const session = useSession();
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    editProfileImage();
    setNewImage(profile_image?.image);
  }, [profile_image?.image]);

  async function editProfileImage() {
    if (profile_image?.image) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('image', JSON.stringify(profile_image?.image));
      }
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.data?.user?.email,
          image: profile_image?.image,
        }),
      });
      if (response.ok) {
        toast.custom((t) => (
          <CustomToast t={t} message={'تم التعديل بنجاح 👏🏽'} />
        ));
      } else {
        toast.custom((t) => (
          <CustomToast t={t} message={'حدث حطأ ما حاول مرة أخرى 😐'} />
        ));
      }
    }
  }
  return (
    <>
      {session?.status === 'unauthenticated' && (
        <div className="p-4 bg-four rounded-lg m-2 md:m-8 border border-one text-center h-screen">
          <h1 className="text-lg md:text-2xl p-2 my-8 text-white">
            يجب عليك تسجيل الدخول أولا لرؤية هذا البروفايل
          </h1>
          <div className="flex flex-col justify-between items-center gap-4 w-full">
            <Link href={'/login'}>
              {' '}
              <Button title={'تسجيل الدخول'} />
            </Link>{' '}
            <Link href={'/'}>
              <div className="flex items-center justify-center rounded-full overflow-hidden cursor-pointer xl:w-fit ">
                <button className=" text-white rounded-r-full font-bold text-lg lg:text-xl hover:scale-105 bg-one p-1 lg:p-2">
                  رجوع
                </button>
                <TbArrowBigLeftLinesFilled className=" text-white text-4xl lg:text-[44px] animate-pulse transition-all duration-300 bg-gray-500 rounded-l-full" />
              </div>
            </Link>
          </div>
        </div>
      )}
      {session?.status === 'authenticated' && (
        <div className="flex justify-center items-center bg-four rounded-lg text-end text-four text-lg lg:text-2xl w-full">
          <div className="flex flex-col items-center gap-4 justify-center w-full 2xl:w-2/3 h-full rounded-lg overflow-hidden">
            <div className="relative w-full bg-green-400">
              <div className="relative h-64 w-full bg-seven rounded-full">
                <Image
                  src={'/profile background.png'}
                  layout="fill"
                  objectFit="cover"
                  alt={session?.data?.user?.name}
                />
              </div>
              <div className="absolute right-1 -bottom-6 h-20 w-20 bg-four rounded-full cursor-pointer">
                <ImageUpload
                  image={user?.image}
                  style={
                    'peer/image rounded-full w-20 h-20 cursor-pointer overflow-hidden'
                  }
                />
                <MdOutlineAddPhotoAlternate className="absolute text-one text-xl top-0 -right-1" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full text-end text-white">
              <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <h1 className="text-nowrap text-end w-full select-none">
                  {session?.data?.user?.name}
                </h1>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-gray-400 rounded-full border-hidden" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <h1 className="text-nowrap text-end w-full select-none">
                  {session?.data?.user?.email}
                </h1>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-gray-400 rounded-full border-hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
