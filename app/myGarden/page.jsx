'use client';
import BackButton from '../../components/BackButton';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SideBarMenu from '../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';

export default function TheGarden() {
  const [isOpen, setIsOpen] = useState(false);
  const [icons, setIcons] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  //? هذه الدالة لجلب كل وصفات المستخدم لحساب عددها و عرضع الجوائز بناء على العدد
  const fetchUserRecipes = async () => {
    const response = await fetch('/api/allCookingRecipes');
    const json = await response.json();

    if (response?.ok) {
      if (typeof window !== 'undefined') {
        const userData = JSON.parse(localStorage.getItem('CurrentUser'));
        // console.log('userData', userData);

        const email = userData?.email;
        // console.log('email', email);
        const findUserRecipes = json?.filter(
          (item) => item?.createdBy === email
        );
        setUserRecipes(findUserRecipes);

        //? هذه الدالة لجلب كل الايقونات من الباك اند
        const res = await fetch('/api/getIcons');
        const data = await res.json();
        if (res.ok) {
          setIcons(data);
        }
      }
    }
  };

  const numberOfSquares = 31 - userRecipes?.length;
  // const numberOfCubs = 0;
  const arr = [];
  const result = () => {
    for (let i = 0; i < numberOfSquares; i++) {
      arr.push(
        <div className="flex justify-center items-center size-[66px] sm:size-[86px] bg-four m-1 rounded-lg text-center">
          <h1 className="text-5xl">🥝</h1>
        </div>
      );
    }
    return arr;
  };

  // console.log('userRecipes', userRecipes);

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
        <h1 className="grow text-lg lg:text-2xl w-full text-white ">
          الجوائز التي ربحتها نتيجة نشر
          <span className="text-one"> {userRecipes?.length}</span> وصفات
        </h1>
        <BackButton />
        <div className="absolute flex flex-col items-start gap-2 z-50 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
          <TfiMenuAlt
            className=" p-1 rounded-lg text-4xl lg:text-5xl text-one cursor-pointer z-50  animate-pulse"
            onClick={() => {
              console.log('clicked');
              setIsOpen(!isOpen);
            }}
          />
          {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
        </div>
      </div>
      <div className="flex justify-center items-center text-white w-full h-full ">
        {result()?.length === 0 && (
          <h1>لم تربح أي جائزة بعد لأنك لم تقم بنشر أي وصفة طبخ حتى الأن</h1>
        )}

        <div className=" flex flex-wrap items-center justify-center w-full xl:w-2/3 xl:w-1/2  h-full bg-one rounded-lg p-4">
          {icons?.length > 0 &&
            icons?.slice(0, userRecipes?.length)?.map((icon, index) => (
              <div className="p-2 rounded-lg bg-four overflow-hidden m-1">
                <div
                  className="relative w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] transition-all duration-300 hover:scale-110"
                  key={index}
                >
                  <Image
                    src={icon}
                    layout="fill"
                    objectFit="contain"
                    alt="icon"
                  />
                </div>
              </div>
            ))}
          {result()}
        </div>
      </div>
    </div>
  );
}
