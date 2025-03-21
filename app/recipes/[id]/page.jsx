'use client';
import Item from '../../../components/Item';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [oneCookingRecipe, setOneCookingRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchOneRecipe();
  }, []);

  async function fetchOneRecipe() {
    console.log('id', id);
    const response = await fetch(`/api/showMealById?id=${id}`);
    const json = await response?.json();
    if (response.ok) {
      console.log('json', json);
      setOneCookingRecipe(json);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Item {...oneCookingRecipe} />
    </div>
  );
}
