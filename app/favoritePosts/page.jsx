'use client';
import { useSession } from 'next-auth/react';
import SmallItem from '../../components/SmallItem';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
import CustomToast from '../../components/CustomToast';
import SideBarMenu from '../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaPlus, FaUtensils } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

export default function FavoriteRecipes() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetchUserFavorites();
    } else {
      setIsLoading(false);
    }
  }, [session.status, pageNumber]);

  const fetchUserFavorites = async () => {
    setIsLoading(true);
    const email = session?.data?.user?.email;

    if (email) {
      try {
        const res = await fetch(
          `/api/actions?page=${pageNumber}&email=${email}&limit=8`
        );
        const data = await res.json();

        if (res.ok) {
          // Collect the promises from the fetch operations
          const promises = data.map(async (item) => {
            const response = await fetch(`/api/editRecipe?id=${item?.mealId}`);
            if (response.ok) {
              const json = await response.json();
              return json;
            } else {
              throw new Error('Failed to fetch cooking recipe');
            }
          });

          // Wait for all promises to resolve
          const arr = await Promise.all(promises);
          setUserFavorites(arr);
        }
      } catch (error) {
        console.error('Error fetching user favorites:', error);
        toast.custom((t) => (
          <CustomToast t={t} message={'حدث خطأ في تحميل الوصفات المفضلة 😐'} />
        ));
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function handleDeletePost(recipe) {
    setIsDeleting(recipe.id);
    const email = session?.data?.user?.email;

    if (email) {
      try {
        const response = await fetch(`/api/actions?email=${email}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mealId: recipe?.id,
            actionType: 'hearts',
            newActionValue: 0,
          }),
        });

        if (response.ok) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={'👍 تم حذف هذه الوصفة من قائمة المفضلة لديك'}
            />
          ));
          // Update the UI by filtering out the removed recipe
          setUserFavorites(
            userFavorites.filter((item) => item.id !== recipe.id)
          );
        } else {
          toast.custom((t) => <CustomToast t={t} message={'حدث خطأ ما 😐'} />);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.custom((t) => <CustomToast t={t} message={'حدث خطأ ما 😐'} />);
      } finally {
        setIsDeleting(null);
      }
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary pb-12">
      {/* Header */}
      <div className="relative">
        {/* Background image with overlay */}
        <div className="relative h-[250px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Image
            priority
            src="/photo (19).png"
            layout="fill"
            objectFit="cover"
            alt="Favorite Recipes"
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
              وصفاتي المفضلة
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <FaHeart className="mr-2 text-secondary" />
              <span className="text-white/90">
                الوصفات التي أعجبتك وأضفتها إلى المفضلة
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 -mt-16 relative z-30">
        {session?.status === 'unauthenticated' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden p-8 text-center"
          >
            <div className="mb-6">
              <div className="h-20 w-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <FaHeart className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              يجب تسجيل الدخول أولاً
            </h2>
            <p className="text-gray-600 mb-6">
              يرجى تسجيل الدخول لعرض وصفاتك المفضلة
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login">
                <Button
                  title="تسجيل الدخول"
                  style="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-orange-700 text-white px-8 py-3 text-lg font-bold rounded-full shadow-lg"
                />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/newRecipe">
                  <Button
                    title="إنشاء وصفة جديدة"
                    style="bg-white text-primary hover:bg-orange-50 flex items-center gap-2 px-6 py-3 rounded-full shadow-lg"
                    icon={<FaPlus className="ml-1" />}
                  />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <FaHeart className="mr-2 text-secondary" />
                <span className="text-white font-medium">
                  {userFavorites.length} وصفة في المفضلة
                </span>
              </motion.div>
            </div>

            {/* Favorites grid */}
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px] bg-white/10 backdrop-blur-sm rounded-xl">
                <Loading />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {userFavorites?.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {userFavorites.map((recipe, index) => (
                      <motion.div
                        key={recipe.id || index}
                        variants={itemVariants}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeletePost(recipe)}
                            disabled={isDeleting === recipe.id}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isDeleting === recipe.id ? (
                              <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            ) : (
                              <IoMdClose className="h-5 w-5" />
                            )}
                          </motion.button>
                        </div>
                        <SmallItem
                          recipe={recipe}
                          index={index}
                          show={false}
                          id={true}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
                  >
                    <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      لا توجد وصفات في المفضلة
                    </h3>
                    <p className="text-white/80 mb-6">
                      لم تقم بإضافة أي وصفة إلى المفضلة بعد. تصفح الوصفات وأضف
                      ما يعجبك!
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="/">
                        <Button
                          title="تصفح الوصفات"
                          style="bg-white text-primary hover:bg-orange-50 px-6 py-3 rounded-full shadow-lg"
                          icon={<FaUtensils className="ml-2" />}
                        />
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Pagination */}
            {userFavorites?.length > 0 && (
              <div className="flex justify-center items-center mt-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (pageNumber > 1) {
                        setPageNumber(pageNumber - 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={pageNumber <= 1}
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdKeyboardArrowRight className="h-6 w-6" />
                  </motion.button>

                  <div className="px-4 font-medium text-white">
                    الصفحة {pageNumber}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (userFavorites?.length >= 8) {
                        setPageNumber(pageNumber + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={userFavorites?.length < 8}
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdKeyboardArrowLeft className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
