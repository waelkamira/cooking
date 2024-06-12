'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TheGarden() {
  const [CurrentUser, setCurrentUser] = useState({});
  const [icons, setIcons] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const session = useSession();

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  //? هذه الدالة لجلب كل وصفات المستخدم لحساب عددها و عرضع الجوائز بناء على العدد
  const fetchUserRecipes = async () => {
    await fetch('/api/allCookingRecipes')
      .then((res) => res.json())
      .then((res) => {
        // console.log('these are my recipes', res);

        if (typeof window !== 'undefined') {
          const userData = JSON.parse(localStorage.getItem('CurrentUser'));
          console.log('userData', userData);
          setCurrentUser(userData);
          const email = userData?.email;
          console.log('email', email);

          const findUserRecipes = res?.filter(
            (item) => item?.createdBy === email
          );
          console.log('findUserRecipes', findUserRecipes);

          setUserRecipes(findUserRecipes);
          fetchIcons();
        }
      });
  };

  const numberOfCubs = userRecipes?.length;
  // const numberOfCubs = 0;
  const arr = [];
  const result = () => {
    for (let i = 0; i < numberOfCubs; i++) {
      arr.push(
        <div className="flex justify-center items-center size-[60px] bg-eleven m-2 rounded-lg text-center">
          <h1 className="text-4xl">🥝</h1>
        </div>
      );
    }
    return arr;
  };

  //? هذه الدالة لجلب كل الايقونات من الباك اند
  const fetchIcons = async () => {
    const response = await fetch('/api/getIcons');
    const data = await response.json();
    if (response.ok) {
      const numberOfCubs = userRecipes?.length;
      console.log('numberOfCubs', numberOfCubs);
      setIcons(data?.slice(0, numberOfCubs));
    }
  };

  return (
    <div className="flex justify-center items-center text-four w-full">
      {result()?.length === 0 && (
        <h1> لم تربح أي جائزة بعد لأنك لم تقم بنشر أي وصفة طبخ حتى الأن</h1>
      )}
      {result()}
      <div className="flex flex-wrap items-center justify-center w-full md:w-2/3 xl:w-1/2  h-fit bg-black rounded-lg p-4">
        {icons?.length > 0 &&
          icons?.map((icon, index) => (
            <div
              className="relative w-12 h-12 transition-all duration-200"
              key={index}
            >
              <Image src={icon} layout="fill" objectFit="contain" alt="icon" />
            </div>
          ))}
      </div>
    </div>
  );
}
