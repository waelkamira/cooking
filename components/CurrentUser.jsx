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
    if (response.ok) {
      setUser(json);
    } else {
      toast.error('حدث حطأ ما حاول مرة أخرى');
    }
  }
  return { ...user };
}
