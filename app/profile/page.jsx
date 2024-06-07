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
import BackButton from '../../components/BackButton';

export default function Profile() {
  const user = CurrentUser();
  // console.log('this is user from profile', user);
  const { profile_image, dispatch } = useContext(inputsContext);
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
      const response = await fetch('/api/user', {
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
        // dispatch({ type: 'PROFILE_IMAGE', payload: profile_image?.image });
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
            <div className="flex justify-end w-full items-center bg-sky-300">
              <BackButton />
            </div>
          </div>
        </div>
      )}
      {session?.status === 'authenticated' && (
        <div className="relative flex justify-center items-center w-full h-full bg-four  xl:p-8 rounded-lg text-md sm:text-lg lg:text-xl">
          <BackButton />
          <div className="flex flex-col items-center gap-4  justify-center w-full 2xl:w-2/3 h-full rounded-lg overflow-hidden">
            <div className="relative w-full ">
              <div className="relative h-72 w-full  rounded-full">
                <Image
                  src={'sm' ? '/profile background.png' : '/cupcake.png'}
                  layout="fill"
                  objectFit="cover"
                  alt={session?.data?.user?.name}
                />
              </div>

              <div className="relative">
                <div className="absolute right-1 -bottom-6 h-20 w-20 bg-four rounded-full cursor-pointer overflow-hidden">
                  <ImageUpload
                    image={user?.image}
                    style={
                      'peer/image rounded-full w-20 h-20 cursor-pointer overflow-hidden'
                    }
                  />
                </div>
                <MdOutlineAddPhotoAlternate className="absolute text-one text-xl -top-12 right-1" />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full text-start text-white">
              <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <h1 className="text-nowrap text-start w-full select-none">
                  <span className="text-one font-bold text-2xl ml-2">#</span>
                  {session?.data?.user?.name}
                </h1>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-gray-400 rounded-full border-hidden" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <h1 className="text-nowrap text-start w-full select-none">
                  <span className="text-one font-bold text-2xl ml-2">#</span>
                  {session?.data?.user?.email}
                </h1>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-gray-400 rounded-full border-hidden" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <Link href={'/myRecipes'} className="w-full">
                  <h1 className="text-nowrap text-start w-full select-none cursor-pointer ">
                    <span className="text-one font-bold text-2xl ml-2 ">#</span>
                    وصفاتي{' '}
                  </h1>
                </Link>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-gray-400 rounded-full border-hidden" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <Link href={'/favoritePosts'} className="w-full">
                  <h1 className="text-nowrap text-start w-full select-none cursor-pointer ">
                    <span className="text-one font-bold text-2xl ml-2 ">#</span>
                    وصفات أعجبتني{' '}
                  </h1>
                </Link>
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
