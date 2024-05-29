'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { inputsContext } from '../components/Context';
import SmallItem from './SmallItem';
export default function AllCookingRecipes() {
  const [allCookingRecipes, setAllCookingRecipes] = useState([]);
  const { newRecipe } = useContext(inputsContext);

  useEffect(() => {
    fetchAllCookingRecipes();
  }, [newRecipe]);

  async function fetchAllCookingRecipes() {
    const response = await fetch('/api/allCookingRecipes');
    const json = await response?.json();
    if (response.ok) {
      // console.log(json);
      setAllCookingRecipes(json);
    }
  }

  return (
    <div className="flex flex-col w-full h-[1120px] px-2 sm:p-8 rounded-lg bg-seven overflow-y-auto">
      {allCookingRecipes.length > 0 &&
        allCookingRecipes.map((recipe, index) => (
          <SmallItem recipe={recipe} index={index} />
        ))}
    </div>
  );
}
