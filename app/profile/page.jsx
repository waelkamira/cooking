'use client';
import CurrentUser from '../../components/CurrentUser';
import ImageUpload from '../../components/ImageUpload';
import Button from '../../components/Button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { inputsContext } from '../../components/Context';
import toast from 'react-hot-toast';
import Link from 'next/link';
import CustomToast from '../../components/CustomToast';
import BackButton from '../../components/BackButton';
import SideBarMenu from '../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import { MdEdit } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaUtensils, FaHeart, FaPlus } from 'react-icons/fa6';
import { IoFastFoodOutline } from 'react-icons/io5';

export default function Profile() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const user = CurrentUser();
  const { profile_image, dispatch } = useContext(inputsContext);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newName = JSON.parse(localStorage.getItem('CurrentUser'));
      setNewUserName(newName?.name);
    }
    editProfileImageAndUserName();
  }, [profile_image?.image]);

  async function editProfileImageAndUserName() {
    if (profile_image?.image || newUserName) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('image', JSON.stringify(profile_image?.image));
      }
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.data?.user?.email,
          image: profile_image?.image,
          name: newUserName,
        }),
      });
      if (response.ok) {
        toast.custom((t) => (
          <CustomToast t={t} message={'تم التعديل بنجاح '} orangeEmoji={'✔'} />
        ));
        dispatch({ type: 'PROFILE_IMAGE', payload: profile_image?.image });
        if (typeof window !== 'undefined') {
          const newName = JSON.parse(localStorage.getItem('CurrentUser'));
          setNewUserName(newName?.name);
        }
      } else {
        toast.custom((t) => (
          <CustomToast t={t} message={'حدث حطأ ما حاول مرة أخرى 😐'} />
        ));
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="relative">
        {/* Background image with overlay */}
        <div className="relative h-[250px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Image
            priority
            src="/photo (22).png"
            layout="fill"
            objectFit="cover"
            alt="New Recipe"
            className="object-center"
          />

          {/* Back button */}
          <div className="absolute top-4 left-4 z-50">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <FaArrowLeft className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>

          {/* Menu button */}
          <div className="absolute top-4 right-4 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <TfiMenuAlt className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                <div
                  className="absolute top-0 right-0 h-full w-[80%] max-w-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SideBarMenu setIsOpen={setIsOpen} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Page title */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-2 text-center"
            >
              <Link
                href="/newRecipe"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                إنشاء وصفة جديدة
              </Link>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <FaUtensils className="mr-2 text-orange-300" />
              <span className="text-white/90">
                شارك وصفتك المفضلة مع الآخرين
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {session?.status === 'authenticated' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-8 px-4 md:px-6 lg:px-8" // هوامش محسنة
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {' '}
            {/* ظل أنيق */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Profile Image and Upload */}
              <div className="relative">
                <div className="relative size-24 md:size-32 rounded-full overflow-hidden border-4 border-orange-400">
                  {' '}
                  {/* حدود ملونة */}
                  <Image
                    priority
                    src={user?.image}
                    layout="fill"
                    objectFit="cover"
                    alt={user?.name}
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-3 md:-bottom-6 right-0 md:right-4 h-12 w-12 rounded-full cursor-pointer overflow-hidden z-40 bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center" // لون ثانوي جذاب
                >
                  <ImageUpload
                    priority
                    src={user?.image}
                    style={'w-full h-full cursor-pointer'}
                  />
                </motion.div>
              </div>

              {/* User Details and Options */}
              <div className="flex flex-col justify-center items-start w-full text-gray-800 dark:text-gray-100">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <MdEdit className="text-xl text-orange-400" />{' '}
                    {/* أيقونة تعديل بارزة */}
                    <span className="font-semibold text-lg">تعديل الاسم:</span>
                  </div>
                  <div className="flex items-center border-b border-gray-300 dark:border-gray-700 py-2">
                    {' '}
                    {/* فاصل سفلي */}
                    <input
                      type="text"
                      className="bg-transparent w-full text-xl font-medium focus:outline-none"
                      defaultValue={user?.name}
                      onBlur={(e) => setNewUserName(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  title={'حفظ الاسم'}
                  onClick={editProfileImageAndUserName}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                />{' '}
                {/* زر بتصميم عصري */}
                <div className="mt-6 space-y-4">
                  <ProfileLink
                    href="/myRecipes"
                    icon={<IoFastFoodOutline className="text-xl" />}
                  >
                    وصفاتي
                  </ProfileLink>
                  <ProfileLink
                    href="/favoritePosts"
                    icon={<FaHeart className="text-xl text-red-500" />}
                  >
                    وصفات أعجبتني
                  </ProfileLink>
                  <ProfileLink
                    href="/newRecipe"
                    icon={<FaPlus className="text-xl text-green-500" />}
                  >
                    إنشاء وصفة جديدة
                  </ProfileLink>
                  <div className="mt-4">
                    <span className="text-gray-500 dark:text-gray-400 block text-sm mb-1">
                      البريد الإلكتروني:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {session?.data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const ProfileLink = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200"
  >
    {icon}
    <span className="text-gray-700 dark:text-gray-300">{children}</span>
  </Link>
);
