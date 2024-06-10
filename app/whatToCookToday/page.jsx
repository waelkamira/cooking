'use client';
import { useSession } from 'next-auth/react';
import SmallItem from '../../components/SmallItem';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
import CustomToast from '../../components/CustomToast';
import BackButton from '../../components/BackButton';

export default function whatToCookToday() {
  const [randomCookingRecipes, setRandomCookingRecipes] = useState([]);
  const session = useSession();

  useEffect(() => {
    fetchAllMainCookingRecipes();
    shuffleArray(randomCookingRecipes);
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      setRandomCookingRecipes(array.slice(0, 3));
    }
  }

  const fetchAllMainCookingRecipes = async () => {
    const response = await fetch('/api/allCookingRecipes');
    const json = await response?.json();
    if (response.ok) {
      // console.log(json);
      // setRandomCookingRecipes(json);
      const data = json?.filter(
        (item) => item?.selectedValue === 'وجبة رئيسية'
      );
      // console.log(data.length);
      setRandomCookingRecipes(data.slice(0, 3));
    }
  };

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
        <h1 className="grow text-sm sm:text-lg lg:text-2xl w-full text-white ">
          الأفكار المقترحة لطبخة اليوم:
        </h1>
        <BackButton />
      </div>
      <div className="my-8">
        <button
          className="text-white bg-one rounded-lg p-2 text-lg w-full"
          onClick={() => shuffleArray(randomCookingRecipes)}
        >
          أعطني ثلاث أفكار لطبخة اليوم
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 justify-center items-center w-full ">
          {randomCookingRecipes?.length > 0 &&
            randomCookingRecipes.map((recipe, index) => (
              <div className="relative ">
                <SmallItem recipe={recipe} index={index} show={false} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
