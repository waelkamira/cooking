'use client';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import SmallItem from './SmallItem';

export default function SearchBar() {
  const [searchedWord, setSearchedWord] = useState(null);
  const [searchedValues, setSearchedValues] = useState([]);

  console.log(searchedWord);
  useEffect(() => {
    response();
  }, [searchedWord]);

  const response = async () => {
    await fetch('/api/allCookingRecipes')
      .then((res) => res.json())
      .then((res) => {
        console.log('this is res', res);
        const search = res?.filter((item) =>
          item?.mealName?.match(searchedWord)
        );
        console.log('this is search', search);
        setSearchedValues(search);
      });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col-reverse gap-2 justify-center items-center w-full my-4 sticky mt-8">
        <div className="relative w-full">
          <input
            value={searchedWord}
            onChange={(e) => setSearchedWord(e.target.value)}
            autoFocus
            type="text"
            id="search_meal"
            name="search_meal"
            placeholder=" ... الباشا و عساكره"
            className="w-full rounded-full border-2 text-lg md:text-xl py-1 md:py-2 px-6 outline-2 focus:outline-one text-right caret-one"
          />
          <div className="absolute top-3 md:top-4 left-4">
            <IoIosSearch className="text-one font-bold size-5" />
          </div>
        </div>
        <h1 className="text-sm sm:text-xl text-nowrap mx-2 font-medium text-white w-full text-end">
          ابحث عن وصفة طبخ
        </h1>
      </div>
      {searchedValues?.length > 0 && searchedWord !== '' && (
        <div className="w-full flex flex-col items-center justify-start p-4 overflow-y-auto h-screen bg-seven rounded-lg content-center">
          <div className="flex flex-row-reverse justify-between w-full">
            <h1 className="text-sm sm:text-2xl text-nowrap mx-2 font-bold text-eight">
              نتائج البحث
            </h1>
            <button
              onClick={() => {
                setSearchedValues([]);
                setSearchedWord('');
              }}
              className="p-2 text-white bg-five w-24 rounded-full font-bold text-lg hover:bg-one hover:scale-105"
            >
              إغلاق
            </button>
          </div>
          {searchedValues?.map((recipe, index) => (
            <div className="w-full 2xl:w-1/2">
              <SmallItem recipe={recipe} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
