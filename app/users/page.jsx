import React, { useEffect } from 'react';

export default function Users() {
  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function fetchAllUsers() {
    const response = await fetch('/api/users');
    const json = await response.json();
    // console.log(json);
  }
  return <div>Users</div>;
}
