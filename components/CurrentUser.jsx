'use client';
import React, { useEffect, useState } from 'react';

export default function CurrentUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const response = await fetch('/api/users');
    const json = await response.json();
    // console.log('json', json);
    if (response.ok) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('CurrentUser', JSON.stringify(json));
      }
      setUser(json);
    } else {
      toast.error('حدث حطأ ما حاول مرة أخرى');
    }
  }
  return { ...user };
}
