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
      const res = json?.filter((item) => item?._id === id);
      console.log(res[0]);
      setOneCookingRecipe(res[0]);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Item {...oneCookingRecipe} />
    </div>
  );
}
