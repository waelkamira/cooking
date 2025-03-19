'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// import { Card } from '@/components/ui/card';
import { Menu, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

// Loading component
const Loading = ({ myMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
      <p className="text-white text-lg">{myMessage}</p>
    </div>
  );
};

// SideBarMenu component
const SideBarMenu = (setIsOpen) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="absolute top-0 right-0 bg-white dark:bg-gray-900 shadow-xl p-4 rounded-lg w-64 z-50"
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>
      <nav className="space-y-4">
        <Link
          href="/"
          className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          الصفحة الرئيسية
        </Link>
        <Link
          href="/favorite-recipes"
          className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          وصفاتي المفضلة
        </Link>
        <Link
          href="/newRecipe"
          className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          إنشاء وصفة جديدة
        </Link>
        <Link
          href="/the-garden"
          className="block p-3 rounded-lg bg-orange-100 text-secondary dark:bg-orange-900 dark:text-orange-300"
        >
          حديقة الجوائز
        </Link>
        <Link
          href="/profile"
          className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          الملف الشخصي
        </Link>
      </nav>
    </motion.div>
  );
};

// BackButton component
const BackButton = () => {
  return (
    <Link href="/">
      <Button
        variant="outline"
        className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white"
      >
        العودة للصفحة الرئيسية
      </Button>
    </Link>
  );
};

export default function TheGarden() {
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [icons, setIcons] = useState([]);
  const [userRecipesCount, setUserRecipesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserRecipesAndIcons(pageNumber);
  }, [pageNumber]);

  // Function to fetch user recipes and icons
  const fetchUserRecipesAndIcons = async (page) => {
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      try {
        const userData = JSON.parse(
          localStorage.getItem('CurrentUser') || '{}'
        );
        const email = userData?.email;

        if (email) {
          const response = await fetch(
            `/api/userIcons?email=${email}&page=${page}`
          );
          const json = await response.json();

          if (response.ok) {
            setUserRecipesCount(json.count);
            setIcons(json.icons);
          }
        }
      } catch (error) {
        console.error('Error fetching user icons:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to render icons and placeholders
  const renderIconsAndPlaceholders = () => {
    const elements = [];
    const iconsCount = Math.min(userRecipesCount, 9);

    // Render actual icons
    for (let i = 0; i < iconsCount; i++) {
      elements.push(
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="flex justify-center items-center bg-[#4a5568] p-1 m-2 rounded-lg overflow-hidden"
          key={i}
        >
          <div className="relative size-[62px] lg:size-[100px] transition-all duration-200 hover:scale-110">
            <Image
              priority
              src={icons[i] || '/placeholder.svg?height=100&width=100'}
              fill
              className="object-contain"
              alt={`Achievement icon ${i + 1}`}
            />
          </div>
        </motion.div>
      );
    }

    // Render placeholders
    for (let i = iconsCount; i < 9; i++) {
      elements.push(
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="flex justify-center bg-[#4a5568] p-1 m-2 rounded-lg overflow-hidden"
          key={i}
        >
          <h1 className="text-3xl lg:text-5xl h-full w-full text-center p-3 sm:p-8 transition-all duration-200 hover:scale-110">
            🥝
          </h1>
        </motion.div>
      );
    }

    return elements;
  };

  return (
    <div className="relative w-full bg-[#2d3748] min-h-screen p-4 lg:p-8 rounded-lg">
      {/* Header banner - hidden on small screens */}
      <div className="hidden xl:block relative w-full h-24 sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-[#1a202c]">
        <Image
          priority
          src="/placeholder.svg?height=200&width=1200"
          fill
          className="object-cover"
          alt="Garden banner"
        />
      </div>

      {/* Main illustration */}
      <div className="relative w-full h-52 overflow-hidden xl:mt-8">
        <Image
          priority
          src="/placeholder.svg?height=208&width=1200"
          fill
          className="object-contain"
          alt="Garden illustration"
        />
      </div>

      {/* Content section */}
      <div className="flex flex-col justify-start items-center w-full gap-4 my-8">
        <h1 className="grow text-lg lg:text-2xl w-full text-white">
          الجوائز التي ربحتها نتيجة نشر
          <span className="text-primary"> {userRecipesCount}</span> وصفات
        </h1>

        {/* Create new recipe button */}
        <div className="w-full sm:w-1/3 gap-4 my-8">
          <Link href="/newRecipe">
            <Button className="w-full bg-primary hover:bg-secondary text-white">
              إنشاء وصفة جديدة
            </Button>
          </Link>
        </div>

        {/* Back button */}
        <BackButton />

        {/* Menu toggle */}
        <div className="absolute flex flex-col items-start gap-2 z-40 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-primary/10 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <AnimatePresence>
            {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Icons grid */}
      <div className="flex justify-center items-center text-white w-full h-full">
        {isLoading && <Loading myMessage={'جاري التحميل...'} />}

        {!isLoading && icons.length === 0 && (
          <Loading
            myMessage={
              'لم تربح أي جائزة بعد لأنك لم تقم بنشر أي وصفة طبخ حتى الأن 😉'
            }
          />
        )}

        {/* {!isLoading && icons.length > 0 && (
          <Card className="grid grid-cols-3 w-full sm:w-2/3 xl:w-3/5 h-full bg-[#1a202c] rounded-lg p-4 border-none">
            {renderIconsAndPlaceholders()}
          </Card>
        )} */}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-around text-white text-center mt-6">
        {userRecipesCount > pageNumber * 9 && (
          <Link href="#top">
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <h1 className="text-white text-sm sm:text-lg sm:font-bold">
                الصفحة التالية
              </h1>
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
          </Link>
        )}

        {pageNumber > 1 && (
          <Link href="#top">
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
              <h1 className="text-white text-sm sm:text-lg sm:font-bold">
                الصفحة السابقة
              </h1>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
