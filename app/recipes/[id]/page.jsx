'use client';
import Item from '../../../components/Item';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SideBarMenu from '../../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
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
      setOneCookingRecipe(res[0]);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Item {...oneCookingRecipe} />
    </div>
  );
}
