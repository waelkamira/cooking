'use client';
import { useSession } from 'next-auth/react';
import SmallItem from '../../components/SmallItem';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
import CustomToast from '../../components/CustomToast';
import BackButton from '../../components/BackButton';

export default function MyRecipes() {
  const [CurrentUser, setCurrentUser] = useState({});
  const session = useSession();
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

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
          setMyRecipes(findUserRecipes?.reverse());
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
      </div>
    </div>
  );
}
