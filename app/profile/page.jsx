'use client';
import Button from '../../components/Button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';

export default function Profile() {
  const session = useSession();
  const [newName, setNewName] = useState(session?.data?.user?.name);
  return (
    <div className="flex justify-center items-center bg-four rounded-lg text-end text-four text-lg lg:text-2xl w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center 2xl:w-2/3 h-full rounded-lg">
        <div className="relative w-full">
          <div className="relative h-64 w-72 bg-seven rounded-full">
            <Image
              src={'/profile background.png'}
              layout="fill"
              objectFit="cover"
              alt={session?.data?.user?.name}
            />
          </div>
          <div className="absolute -right-4 -bottom-4 h-20 w-20 bg-seven rounded-full">
            <Image
              src={session?.data?.user?.image}
              layout="fill"
              objectFit="cover"
              alt={session?.data?.user?.name}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full text-end text-white">
          <div className="flex items-center gap-2 justify-between border border-four rounded-lg px-8 py-2 w-full my-2">
            <h1 className="text-nowrap text-end w-full">
              {session?.data?.user?.name}
            </h1>
            {/* <input
              name={session?.data?.user?.name}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={session?.data?.user?.name}
              className="grow text-end border border-seven"
            />
            <button className="w-24 ">تعديل</button> */}
          </div>
          <div className="flex items-center gap-2 justify-between border border-four rounded-lg px-8 py-2 w-full my-2">
            <h1 className="text-nowrap text-end w-full">
              {session?.data?.user?.email}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
