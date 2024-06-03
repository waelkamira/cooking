'use client';
import toast from 'react-hot-toast';
import { inputsContext } from './Context';
import { useContext } from 'react';

export async function HandleDeletePost(recipe) {
  const { dispatch } = useContext(inputsContext);
  const response = await fetch('/api/allCookingRecipes', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });

  if (response.ok) {
    toast.success('تم حذف هذا البوست');
    dispatch({ type: 'DELETE_RECIPE', payload: recipe });
  } else {
    toast.error('حدث خطأ ما');
  }
}
