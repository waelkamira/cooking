'use client';
import React from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';

export default function SmallItem({ recipe, index }) {
  const session = useSession();
  // console.log('session', session);
  const router = useRouter();
  async function handleDeletePost(recipe) {
    const response = await fetch('/api/allCookingRecipes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });
    if (response.ok) {
      toast.success('the post is deleted');
    } else {
      toast.error('something went wrong');
    }
  }
  return (
    <div
      key={index}
      className="flex flex-col justify-center items-center shadow-md w-full p-4 rounded-lg mt-8 bg-white "
    >
      <div className="flex justify-end items-center gap-2 w-full">
        {session?.data?.user?.email === 'waelkamira@gmail.com' && (
          <div
            className="flex flex-col items-center justify-center cursor-pointer bg-four rounded-lg p-2 md:text-2xl text-white hover:bg-one"
            onClick={() => handleDeletePost(recipe)}
          >
            <IoMdClose className="" />
            <h6 className="text-sm">حذف</h6>
          </div>
        )}
        <div className="flex flex-col justify-center items-end w-full ">
          <h6 className="text-[12px] sm:text-[15px] text-eight font-semibold">
            بهيجة اشرق لبن
          </h6>
          <h1 className="text-[12px] sm:text-[12px] text-gray-400 font-semibold">
            {formatDistanceToNow(new Date(recipe?.createdAt), {
              addSuffix: true,
            })}
          </h1>
        </div>
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <Image
            src={'/bahiga.png'}
            fill
            alt={recipe?.mealName}
            className="bg-one"
          />
        </div>
      </div>{' '}
      <h1 className="text-one sm:my-8 my-2 text-2xl sm:text-5xl font-extrabold bg-white">
        {recipe?.mealName}
      </h1>
      <div className="relative w-full h-44 sm:h-72 overflow-hidden rounded-lg">
        <Image src={recipe?.image} fill alt={recipe?.mealName} />
      </div>
      <div className="bg-white rounded-lg p-8 w-full">
        <h1 className="text-one font-bold xl sm:text-3xl text-end w-full my-2">
          المقادير
        </h1>
        <pre className="text-sm sm:text-lg font-bold text-end w-full line-clamp-6">
          {recipe?.ingredients}
        </pre>
      </div>
      <button
        onClick={() => {
          router.push(`/recipes/${recipe?._id}`);
        }}
        className="sm:text-2xl p-2 bg-five hover:bg-one hover:scale-[102%] text-white font-bold text-center w-full rounded-full shadow-lg transition-all duration-300"
      >
        عرض الوصفة
      </button>
    </div>
  );
}
