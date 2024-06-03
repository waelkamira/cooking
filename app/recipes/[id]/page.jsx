'use client';
import Item from '../../../components/Item';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [oneCookingRecipe, setOneCookingRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchOneCookingRecipe();
  }, []);

  async function fetchOneCookingRecipe() {
    const response = await fetch('/api/allCookingRecipes');
    const json = await response?.json();
    if (response.ok) {
      const res = await json?.filter((item) => item?._id === id);
      console.log('res[0]', res[0]);
      setOneCookingRecipe(res[0]);
    }
  }
  //createdAt: "2024-05-31T17:16:54.554Z"
  //createdAt: '2024-05-30T19:12:13.826Z';
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Item {...oneCookingRecipe} />
    </div>
  );
}
