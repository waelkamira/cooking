'use client';
import { useContext, useEffect, useState } from 'react';
import { inputsContext } from './Context';
import { useSession } from 'next-auth/react';

export default function CurrentUser() {
  const { profile_image } = useContext(inputsContext);
  const [user, setUser] = useState();
  // const session = useSession();

  useEffect(() => {
    getUserData();
  }, [profile_image?.image]);

  async function getUserData() {
    const response = await fetch('/api/user')
      .then((res) => res.json())
      .then((res) => {
        console.log('this is res', res);
        if (typeof window !== 'undefined') {
          localStorage.setItem('CurrentUser', JSON.stringify(res[0]));
        }

        setUser(res[0]);
      });
  }
  return { ...user };
}
