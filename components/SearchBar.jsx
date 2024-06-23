'use client';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import SmallItem from './SmallItem';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

export default function SearchBar() {
  const [pageNumber, setPageNumber] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [searchByCategory, setSearchByCategory] = useState('');
  const [searchedWord, setSearchedWord] = useState('');
  const [searchedValues, setSearchedValues] = useState('');
  const searchCate = useSearchParams();
  const searchCategory = searchCate.get('searchCategory');
  const router = useRouter();

  useEffect(() => {
    response();
  }, [searchedWord, searchCategory, pageNumber]);

  const response = async () => {
    await fetch('/api/allCookingRecipes')
      .then((res) => res.json())
      .then((res) => {
        const startPage = (pageNumber - 1) * 10;
        const endPage = startPage + 10;
        if (searchedWord) {
          setIsVisible(true);
          setSearchByCategory([]);
          const search = res?.filter((item) =>
            item?.mealName?.match(searchedWord)
          );
          setSearchedValues(search.slice(startPage, endPage));
        } else if (searchCategory) {
          setIsVisible(true);
          setSearchedValues([]);
          setSearchedWord('');
          const categoryValues = res?.filter(
            (item) => item?.selectedValue === searchCategory
          );
          // console.log('categoryValues', categoryValues);
          setSearchByCategory(categoryValues.slice(startPage, endPage));
        }
      });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full lg:mt-8 bg-four rounded-lg ">
      <div className="flex flex-col justify-center items-center sm:flex-row gap-4 w-full mb-4 ">
        <div className="relative w-full xl:w-96 h-52 overflow-hidden">
          <Image
            priority
            src={
              'https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716956/cooking/logo1_uwwlyk.png'
            }
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
            className="w-full rounded-full border-2 text-lg md:text-xl placeholder:text-lg  py-1 md:py-2 px-10 outline-2 placeholder:px-2 focus:outline-one text-right"
          />
          <div className="absolute top-3 md:top-4 right-4">
            <IoIosSearch className="text-one font-bold size-5" />
          </div>
        </div>
      </div>

      {isVisible && searchedValues?.length > 0 && searchedWord !== '' && (
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
              className="p-2 text-white bg-five w-24 rounded-full font-bold text-lg hover:bg-one hover:scale-55"
            >
              إغلاق
            </button>
            <h1 className="text-sm sm:text-2xl text-nowrap mx-2 font-bold text-eight">
              نتائج البحث:
            </h1>
          </div>
          {searchedValues?.map((recipe, index) => (
            <div className="w-full 2xl:w-2/3" key={index}>
              <SmallItem recipe={recipe} index={index} />
            </div>
          ))}
          <div className="flex items-center justify-around my-4 mt-8 w-full">
            {(searchByCategory?.length >= 10 ||
              searchedValues?.length >= 10) && (
              <Link href={'#post1'}>
                <div
                  className="flex items-center justify-around cursor-pointer"
                  onClick={() => setPageNumber(pageNumber + 1)}
                >
                  <h1 className="text-gray-600 font-bold">الصفحة التالية</h1>
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
                  <h1 className="text-gray-600 font-bold">الصفحة السابقة</h1>
                </div>
              </Link>
            )}
          </div>
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
              className="p-2 text-white bg-five w-24 rounded-full font-bold text-sm sm:text-lg hover:bg-one hover:scale-55"
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
              <div className="w-full 2xl:w-2/3" key={index}>
                <SmallItem recipe={recipe} index={index} />
              </div>
            ))}
          <div className="flex items-center justify-around my-4 mt-8 w-full">
            {(searchByCategory?.length >= 10 ||
              searchedValues?.length >= 10) && (
              <Link href={'#post1'}>
                <div
                  className="flex items-center justify-around cursor-pointer"
                  onClick={() => setPageNumber(pageNumber + 1)}
                >
                  <h1 className="text-gray-600 font-bold">الصفحة التالية</h1>
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
                  <h1 className="text-gray-600 font-bold">الصفحة السابقة</h1>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
