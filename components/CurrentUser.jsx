'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CurrentUser() {
  const [user, setUser] = useState();
  // const session = useSession();
  // const email = session?.data?.user?.email;
  // console.log('email', email);
  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const response = await fetch('/api/users')
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
        if (typeof window !== 'undefined') {
          localStorage.setItem('CurrentUser', JSON.stringify(res[0]));
        }
        setUser(res[0]);
      });
  }
  return { ...user };
}
