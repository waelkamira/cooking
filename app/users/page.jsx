'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../components/CurrentUser';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
import CustomToast from '../../components/CustomToast';
import BackButton from '../../components/BackButton';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Link from 'next/link';

export default function Users() {
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState([]);
  const [findUser, setFindUser] = useState('');
  const admin = CurrentUser();
  const session = useSession();

  useEffect(() => {
    fetchAllUsers();
  }, [findUser, pageNumber]);

  if (!session?.status === 'authenticated' || !admin?.isAdmin) {
    return;
  }

  async function fetchAllUsers() {
    const response = await fetch('/api/allUsers');
    const json = await response.json();
    // console.log(json);
    if (response.ok) {
      const startPage = (pageNumber - 1) * 3;
      const endPage = startPage + 3;
      if (findUser) {
        const user = json?.filter((item) => item?.email?.match(findUser));
        // console.log(user);
        setUsers(user);
      } else {
        setUsers(json?.slice(startPage, endPage));
      }
    }
  }

  //? هذه الدالة لحذف مستخدم معين
  async function handleDeleteUser(user) {
    if (user?.isAdmin === true) {
      return toast.custom((t) => (
        <CustomToast t={t} message={'لايمكن حذف الأدمن ✖'} />
      ));
    }
    const response = await fetch('/api/allUsers', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      toast.custom((t) => (
        <CustomToast t={t} message={'تم حذف هذا المستخدم بنجاح ✔'} />
      ));
      fetchAllUsers();
    } else {
      toast.custom((t) => <CustomToast t={t} message={'😐 حدث خطأ ما ✖'} />);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full  bg-four rounded-lg text-lg text-white">
      <div className="flex gap-4 justify-center items-center bg-four rounded-lg text-lg text-white w-full p-4">
        <input
          value={findUser}
          onChange={(e) => setFindUser(e.target.value)}
          type="text"
          id="user"
          name="user"
          placeholder="ابحث عن اسم مستخدم ..."
          autoFocus
          className="text-right w-full p-2 rounded-lg text-lg outline-2 focus:outline-one h-10 text-black"
        />
      </div>
      <div className="relative flex justify-between items-center p-4 sm:p-8 w-full">
        {' '}
        <h1>جميع المستخدمين :</h1>
        <BackButton />
      </div>
      <div className="flex flex-col justify-start items-center w-full">
        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start p-4 sm:p-8 ">
          {users?.length > 0 &&
            users?.map((user) => (
              <div className="flex justify-between items-center bg-four my-2 text-wite w-full h-24 border-[3px] border-one p-2 rounded-lg">
                <div>
                  <h1 className="text-sm sm-text-md lg:text-lg">
                    اسم المستخدم: {user?.name}
                  </h1>
                  <h1 className="text-sm sm-text-md lg:text-lg">
                    الايميل: {user?.email}
                  </h1>
                </div>
                {user?.isAdmin ? (
                  'أدمن'
                ) : (
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer bg-four rounded-lg p-2 md:text-2xl text-white hover:bg-one"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <IoMdClose className="" />
                    <h6 className="text-sm select-none">حذف</h6>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="flex items-center justify-around my-4 mt-8 text-white">
          {users?.length >= 3 && (
            <Link href={'#post1'}>
              <div
                className="flex items-center justify-around cursor-pointer"
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                <h1 className="text-white font-bold">الصفحة التالية</h1>
                <MdKeyboardDoubleArrowRight className="text-2xl animate-pulse" />
              </div>
            </Link>
          )}
          {pageNumber > 1 && (
            <Link href={'#post1'}>
              <div
                className="flex items-center justify-around cursor-pointer"
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                <MdKeyboardDoubleArrowLeft className="text-2xl animate-pulse" />
                <h1 className="text-white font-bold">الصفحة السابقة</h1>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
