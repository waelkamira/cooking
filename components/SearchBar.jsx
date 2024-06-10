'use client';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import SmallItem from './SmallItem';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchByCategory, setSearchByCategory] = useState('');
  const [searchedWord, setSearchedWord] = useState('');
  const [searchedValues, setSearchedValues] = useState('');
  const searchCate = useSearchParams();
  const searchCategory = searchCate.get('searchCategory');
  const router = useRouter();

  useEffect(() => {
    response();
  }, [searchedWord, searchCategory]);

  const response = async () => {
    await fetch('/api/allCookingRecipes')
      .then((res) => res.json())
      .then((res) => {
        if (searchCategory || searchedWord) {
          setIsVisible(true);
        }
        const search = res?.filter((item) =>
          item?.mealName?.match(searchedWord)
        );
        setSearchedValues(search);

        const categoryValues = res?.filter(
          (item) => item?.selectedValue === searchCategory
        );
        // console.log('categoryValues', categoryValues);
        setSearchByCategory(categoryValues);
      });
  };

  return (
    <div className="w-full lg:mt-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sticky mb-4">
        <div className="relative w-full xl:w-96 h-52 overflow-hidden">
          <Image
            priority
            src={'/logo1.png'}
            layout="fill"
            objectFit="contain"
            alt="photo"
          />
        </div>
        <div className="relative w-full">
          <input
            value={searchedWord}
            onChange={(e) => setSearchedWord(e.target.value)}
            autoFocus
            type="text"
            id="search_meal"
            name="search_meal"
            placeholder="ابحث عن وصفة طبخ   ..."
            className="w-full rounded-full border-2 text-lg md:text-xl placeholder:text-lg py-1 md:py-2 px-10 outline-2 focus:outline-one text-right"
          />
          <div className="absolute top-3 md:top-4 right-4">
            <IoIosSearch className="text-one font-bold size-5" />
          </div>
        </div>
      </div>
      {searchedValues?.length > 0 && searchedWord !== '' && (
        <div className="relative w-full flex flex-col items-center justify-start p-4 overflow-y-auto h-screen bg-seven rounded-lg content-center">
          <div className="sticky top-0 flex flex-row-reverse justify-between w-full ">
            <button
              onClick={() => {
                setIsVisible(false);
                setSearchByCategory([]);
                setSearchedValues([]);
                setSearchedWord('');
                router.push('/');
              }}
              className="p-2 text-white bg-five w-24 rounded-full font-bold text-lg hover:bg-one hover:scale-105"
            >
              إغلاق
            </button>
            <h1 className="text-sm sm:text-2xl text-nowrap mx-2 font-bold text-eight">
              نتائج البحث:
            </h1>
          </div>
          {searchedValues?.map((recipe, index) => (
            <div className="w-full 2xl:w-2/3">
              <SmallItem recipe={recipe} index={index} />
            </div>
          ))}
        </div>
      )}
      {isVisible && searchByCategory?.length > 0 && searchCategory !== '' && (
        <div className="relative w-full flex flex-col items-center justify-start p-4 overflow-y-auto h-screen bg-seven rounded-lg content-center">
          <div className="sticky top-0 flex flex-row-reverse justify-between items-center w-full ">
            <button
              onClick={() => {
                setIsVisible(false);
                setSearchByCategory([]);
                setSearchedValues([]);
                setSearchedWord('');
                router.push('/');
              }}
              className="p-2 text-white bg-five w-24 rounded-full font-bold text-sm sm:text-lg hover:bg-one hover:scale-105"
            >
              إغلاق
            </button>
            <h1 className="text-sm sm:text-2xl text-nowrap mx-2 font-bold text-eight">
              نتائج البحث:
            </h1>
          </div>
          {isVisible &&
            searchByCategory !== '' &&
            searchByCategory?.map((recipe, index) => (
              <div className="w-full 2xl:w-2/3">
                <SmallItem recipe={recipe} index={index} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
