'use client';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import { IoMdHeartEmpty } from 'react-icons/io';
import { SlLike } from 'react-icons/sl';

export default function SmallItem({ recipe, index, show = true, id }) {
  const [favorites, setFavorites] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState(recipe?.numberOfLikes);
  const [numberOfEmojis, setNumberOfEmojis] = useState(recipe?.numberOfEmojis);
  const [numberOfHearts, setNumberOfHearts] = useState(recipe?.numberOfHearts);

  const [like, setLike] = useState(false);
  const [heart, setHeart] = useState(false);
  const [emoji, setEmoji] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    handleActions();
    fetchFavoritePosts();
  }, [like, heart, emoji]);

  //? يتم تفعيل هذه الدالة عند الضغط على أحد الأزرار الثلاثة حفظ أعجبني لذيذ وذلك لحساب عدد مرات التفاعل مع البوست
  async function handleActions() {
    const response = await fetch('/api/allCookingRecipes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: recipe?._id,
        userName: session?.data?.user?.name,
        numberOfLikes: numberOfLikes,
        numberOfEmojis: numberOfEmojis,
        numberOfHearts: numberOfHearts,
      }),
    });
  }

  //? يتم تفعيل هذه الدالة عند الضغط على زر حفظ ليتم حفظ البوست الذي تم الضغط عليه من قبل المستخدم في قائمة مفضلاته
  //? أو سوف يتم حذف هذا البوست من قائمة مفضلة المستخدم إذا كان موجودا أي أن المستخدم لم يعد يريجه في قائمته
  async function handleFavoritePost() {
    const findPost = favorites.filter((post) => post?.postId === recipe?._id);
    if (!findPost[0]) {
      const { _id, ...props } = recipe;
      const response = await fetch('/api/favoritePosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...props,
          postId: _id,
          favoritedByUser: session?.data?.user?.email,
        }),
      });
      if (response.ok) {
        fetchFavoritePosts();
        toast.success('😋 تم إضافة هذه الوصفة إلى وصفاتك المفضلة 😋');
      } else {
        toast.error('حدث خطأ ما حاول مرة أخرى');
      }
    } else {
      const response = await fetch('/api/favoritePosts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...findPost[0],
        }),
      });
      if (response.ok) {
        fetchFavoritePosts();
        toast.success('تم إزالة هذه الوصفة من قائمة مفضلاتك');
      } else {
        toast.error('حدث خطأ ما حاول مرة أخرى');
      }
    }
  }

  //? للبحث عن هذا البوست في قائمة المفضلة اذا موجود يتم تفعيل اللون الاحمر بأن المستخدم بالفعل أعجب بهذا البوست من قبل
  async function fetchFavoritePosts() {
    const response = await fetch('/api/favoritePosts');
    const json = await response.json();
    setFavorites(json);
    console.log(json);
    const findPost = json.filter((post) => post?.postId === recipe?._id);
    console.log('findPost', findPost);
    if (findPost[0]) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  }

  //? لحذف أي بوست من أي مستخدم هذه الدالة خاصة بالأدمن فقط
  async function handleDeletePost(recipe) {
    const response = await fetch('/api/allCookingRecipes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      toast.success('تم حذف هذا البوست');
    } else {
      toast.error('حدث خطأ ما');
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
            <h6 className="text-sm select-none">حذف</h6>
          </div>
        )}
        <div className="flex flex-col justify-center items-end w-full ">
          <h6 className="text-[12px] sm:text-[15px] text-eight font-semibold select-none">
            {session?.data?.user?.name}{' '}
          </h6>
          {/* <h1 className="text-[12px] sm:text-[12px] text-gray-400 font-semibold select-none">
            {formatDistanceToNow(new Date(recipe?.createdAt), {
              addSuffix: true,
            })}
          </h1> */}
        </div>
        <div className="relative w-[70px] h-12 overflow-hidden rounded-full">
          <Image
            src={session?.data?.user?.image || '/bahiga.png'}
            layout="fill"
            objectFit="contain"
            alt={recipe?.mealName}
            className="bg-one"
          />
        </div>
      </div>{' '}
      <h1 className="text-one my-4 text-3xl font-extrabold bg-white select-none">
        {recipe?.mealName}
      </h1>
      <div className="relative w-full h-44 sm:h-72 overflow-hidden rounded-lg">
        <Image src={recipe?.image} fill alt={recipe?.mealName} />
      </div>
      {show && (
        <>
          <div className="flex flex-row-reverse justify-between items-center gap-2 w-full text-gray-400 font-semibold my-2">
            <div
              className="flex justify-center items-center gap-2 cursor-pointer hover:bg-seven p-1 lg:p-2 rounded-lg select-none"
              onClick={() => {
                handleActions();
                // setHeart(!heart);
                if (!heart) {
                  setNumberOfHearts(numberOfHearts + 1);
                } else {
                  setNumberOfHearts(numberOfHearts - 1);
                }
                handleFavoritePost();
                fetchFavoritePosts();
              }}
            >
              <h6 className="text-[10px] md:text-[13px] lg:text-[15px] select-none">
                {numberOfHearts}
              </h6>
              <h1
                className={
                  (heart ? 'text-one' : 'text-gray-400') +
                  '  text-[10px] md:text-[13px] lg:text-[15px] select-none'
                }
              >
                حفظ{' '}
              </h1>
              <div className="hover:scale-105">
                <FaHeart
                  className={
                    (heart ? 'text-one' : 'text-gray-400') +
                    ' text-[10px] md:text-[13px] lg:text-[15px] select-none'
                  }
                />
              </div>
            </div>
            <div
              className="flex justify-center items-center gap-2 cursor-pointer hover:bg-seven p-1 lg:p-2 rounded-lg select-none"
              onClick={() => {
                handleActions();
                setLike(!like);
                if (!like) {
                  setNumberOfLikes(numberOfLikes + 1);
                } else {
                  setNumberOfLikes(numberOfLikes - 1);
                }
              }}
            >
              <h6 className="text-[10px] md:text-[13px] lg:text-[15px] select-none">
                {numberOfLikes}
              </h6>
              <h1
                className={
                  (like ? 'text-blue-400' : 'text-gray-400') +
                  ' text-[10px] md:text-[13px] lg:text-[15px] select-none'
                }
              >
                أعجبني
              </h1>
              <SlLike
                className={
                  (like ? 'text-blue-400' : 'text-gray-400') +
                  '  text-[10px] md:text-[13px] lg:text-[15px] select-none'
                }
              />
            </div>
            <div
              className="flex justify-center items-center gap-2 cursor-pointer hover:bg-seven py-1 px-2 rounded-lg select-none"
              onClick={() => {
                handleActions();
                setEmoji(!emoji);
                if (!emoji) {
                  setNumberOfEmojis(numberOfEmojis + 1);
                } else {
                  setNumberOfEmojis(numberOfEmojis - 1);
                }
              }}
            >
              <h6 className="text-[10px] md:text-[13px] lg:text-[15px] select-none">
                {numberOfEmojis}
              </h6>
              <h1
                className={
                  (emoji ? 'text-nine' : 'text-gray-400') +
                  '  text-[10px] md:text-[13px] lg:text-[15px] select-none'
                }
              >
                لذيذ
              </h1>
              <h1
                className={
                  (emoji ? 'text-nine' : 'text-gray-400') +
                  ' text-[15px] md:text-[18px] lg:text-[21px] select-none'
                }
              >
                😋
              </h1>
            </div>
          </div>
          <hr className="w-full h-[1.5px] bg-gray-400 rounded-full border-hidden select-none" />
        </>
      )}
      <div className="bg-white rounded-lg p-4 w-full">
        <h1 className="text-one font-bold text-xl text-end w-full my-2 select-none">
          المقادير
        </h1>
        <pre className="text-sm sm:text-lg font-bold text-end w-full line-clamp-1 select-none">
          {recipe?.ingredients}
        </pre>
      </div>
      <button
        onClick={() => {
          router.push(`/recipes/${id ? recipe?.postId : recipe?._id}`);
        }}
        className="sm:text-2xl p-2 bg-five hover:bg-one hover:scale-[102%] text-white font-bold text-center select-none w-full rounded-full shadow-lg transition-all duration-300"
      >
        عرض الوصفة
      </button>
    </div>
  );
}
