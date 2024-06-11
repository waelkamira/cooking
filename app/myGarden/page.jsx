'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TheGarden() {
  const [userRecipes, setUserRecipes] = useState([]);
  const session = useSession();
  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const fetchUserRecipes = async () => {
    await fetch('/api/allCookingRecipes')
      .then((res) => res.json())
      .then((res) => {
        const email = session?.data?.user?.email;
        const findUserRecipes = res?.filter(
          (item) => item?.createdBy === email
        );
        setUserRecipes(findUserRecipes?.reverse());
      });
  };
  const numberOfCubs = userRecipes?.length;
  // const numberOfCubs = 44;
  const arr = [];
  const result = () => {
    for (let i = 0; i < numberOfCubs; i++) {
      arr.push(
        <div className="flex justify-center items-center size-[60px] bg-eleven m-2 rounded-lg text-center">
          {/* <div className="relative w-16 h-16 hover:scale-105 transition-all duration-200">
            <Image
              src="/icon1.png"
              layout="fill"
              objectFit="contain"
              alt="palm-tree"
            />
          </div> */}
          <h1 className="text-4xl">🥝</h1>
        </div>
      );
    }
    return arr;
  };
  return (
    <div className="flex justify-center items-center text-white w-full h-full">
      <div className="flex flex-wrap items-start justify-start sm:min-w-[500px] w-fit sm:min-h-[500px] h-full bg-ten rounded-lg p-4">
        {result()}
      </div>
    </div>
  );
}
