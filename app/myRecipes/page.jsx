'use client';
import { useSession } from 'next-auth/react';
import SmallItem from '../../components/SmallItem';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
import CustomToast from '../../components/CustomToast';
import BackButton from '../../components/BackButton';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Link from 'next/link';
import { inputsContext } from '../../components/Context';
import { TfiMenuAlt } from 'react-icons/tfi';
import SideBarMenu from '../../components/SideBarMenu';

export default function MyRecipes() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(inputsContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [CurrentUser, setCurrentUser] = useState({});
  const session = useSession();
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, [pageNumber]);

  const fetchMyRecipes = async () => {
    await fetch('/api/allCookingRecipes')
      .then((res) => res.json())
      .then((res) => {
        // console.log('these are my recipes', res);
        // console.log('CurrentUser', CurrentUser);
        if (typeof window !== 'undefined') {
          const userData = JSON.parse(localStorage.getItem('CurrentUser'));
          // console.log('userData', userData);
          setCurrentUser(userData);
          const email = userData?.email;
          // console.log('email', email);

          const findUserRecipes = res?.filter(
            (item) => item?.createdBy === email
          );
          const startPage = (pageNumber - 1) * 10;
          const endPage = startPage + 10;
          setMyRecipes(findUserRecipes?.slice(startPage, endPage));
          dispatch({ type: 'MY_RECIPES', payload: findUserRecipes });
        }
      });
  };

  async function handleDeletePost(recipe) {
    const response = await fetch('/api/allCookingRecipes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      toast.custom((t) => (
        <CustomToast t={t} message={'👍 تم حذف هذا البوست من قائمة وصفاتك'} />
      ));
      fetchMyRecipes();
    } else {
      toast.custom((t) => <CustomToast t={t} message={'حدث خطأ ما 😐'} />);
    }
  }

  return (
    <div className="relative w-full bg-four h-full p-4 lg:p-8 rounded-lg">
      <div className="absolute flex flex-col items-start gap-2 z-40 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
        <TfiMenuAlt
          className=" p-1 rounded-lg text-4xl lg:text-5xl text-one cursor-pointer z-50  animate-pulse"
          onClick={() => {
            console.log('clicked');
            setIsOpen(!isOpen);
          }}
        />
        {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
      </div>
      <div className="hidden xl:block relative w-full h-24 sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-one">
        <Image
          priority
          src={'/1.png'}
          layout="fill"
          objectFit="cover"
          alt="photo"
        />
      </div>
      <div className="relative w-full h-52 overflow-hidden xl:mt-8">
        <Image
          priority
          src={'/logo1.png'}
          layout="fill"
          objectFit="contain"
          alt="photo"
        />
      </div>
      <div className="flex justify-between items-center w-full gap-4 my-8">
        <h1 className="grow text-lg lg:text-2xl w-full text-white ">وصفاتي:</h1>
        <BackButton />
      </div>
      <div className="my-8">
        {myRecipes?.length === 0 && (
          <h1 className="text-2xl md:text-3xl w-full text-center text-white mt-8 ">
            😉 لا يوجد نتائج لعرضها ,لم تقم بإنشاء أي وصفة بعد
          </h1>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 justify-center items-center w-full ">
          {myRecipes?.length > 0 &&
            myRecipes.map((recipe, index) => (
              <div className="relative ">
                {session?.status === 'authenticated' && (
                  <div
                    className="absolute top-12 left-4 flex flex-col items-center justify-center cursor-pointer bg-four rounded-lg p-2 md:text-2xl text-white hover:bg-one"
                    onClick={() => handleDeletePost(recipe)}
                  >
                    <IoMdClose className="" />
                    <h6 className="text-sm select-none">حذف</h6>
                  </div>
                )}
                <SmallItem recipe={recipe} index={index} show={false} />
              </div>
            ))}
        </div>
        <div className="flex items-center justify-around my-4 mt-8 text-white">
          {myRecipes?.length >= 10 && (
            <Link href={'#post1'}>
              <div
                className="flex items-center justify-around cursor-pointer"
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                <h1 className="text-white font-bold">الصفحة التالية</h1>
                <MdKeyboardDoubleArrowRight className="text-2xl animate-pulse" />
              </div>
            </Link>
          )}
          {pageNumber > 1 && (
            <Link href={'#post1'}>
              <div
                className="flex items-center justify-around cursor-pointer"
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                <MdKeyboardDoubleArrowLeft className="text-2xl animate-pulse" />
                <h1 className="text-white font-bold">الصفحة السابقة</h1>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
