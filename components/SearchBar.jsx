'use client';

import React from 'react';
import { useState, useEffect, useCallback } from 'react'; // استيراد useCallback
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // استيراد usePathname
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Button from './Button';
import { RiCloseLargeFill } from 'react-icons/ri';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

// Placeholder for SmallItem component
const SmallItem = ({ recipe, index, onClose }) => {
  return (
    <div className="w-full mb-4 overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-orange-200">
      <Link
        className="flex flex-col md:flex-row"
        href={`/recipes/${recipe?.id}`}
        onClick={onClose} // تفعيل الدالة onClose عند النقر
      >
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Image
            src={recipe.image || '/placeholder.svg?height=200&width=300'}
            alt={recipe.mealName || 'وصفة طبخ'}
            width={300}
            height={200}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary text-black px-2 py-1 rounded-full text-xs">
            وصفة شهية
          </div>
        </div>
        <div className="p-4 md:w-2/3">
          <h3 className="font-bold text-xl mb-2 text-orange-800">
            {recipe.mealName}
          </h3>
          <div className="flex items-center mb-3">
            <div className="flex items-center text-gray-600 text-sm">
              <span className="ml-1">⏱️</span>
              <span>{recipe.cookingTime || '30'} دقيقة</span>
            </div>
            <div className="mx-3 text-gray-300">|</div>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="ml-1">👥</span>
              <span>{recipe.servings || '4'} أشخاص</span>
            </div>
          </div>
          <p className="text-gray-600 line-clamp-2 mb-4">
            {recipe.description || 'وصفة شهية من مطبخ بهيجة'}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={
                    recipe.userImage || '/placeholder.svg?height=32&width=32'
                  }
                  alt={recipe.userName || 'الشيف'}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-gray-700">
                {recipe.userName || 'بهيجة اشرق لبن'}
              </span>
            </div>
            <Link href={`/recipe/${recipe.id}`} onClick={onClose}>
              <Button className="bg-primary hover:bg-secondary text-black">
                عرض الوصفة
              </Button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

const SkeletonItem = () => (
  <div className="w-full mb-4 overflow-hidden bg-gray-100 animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 w-1/2 mb-3"></div>
      <div className="h-4 bg-gray-300 w-full mb-1"></div>
      <div className="h-4 bg-gray-300 w-2/3 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        <div className="h-8 w-20 bg-gray-300"></div>
      </div>
    </div>
  </div>
);

// Function to normalize Arabic text
const normalizeArabic = (text) => {
  if (!text) return '';
  return text.replace(/[أ]/g, 'ا');
};

export default function SearchBar() {
  const [pageNumber, setPageNumber] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [searchByCategory, setSearchByCategory] = useState([]);
  const [searchedWord, setSearchedWord] = useState('');
  const [searchedValues, setSearchedValues] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchCategory = useSearchParams();
  const searchedCategory = searchCategory.get('searchedCategory');
  const [totalCount, setTotalCount] = useState();
  const [hasMore, setHasMore] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // الحصول على المسار الحالي

  // Function to perform search
  const search = async () => {
    setIsLoading(true);
    setSearchTriggered(true);

    document.body.style.cursor = 'wait'; // Change cursor to "wait"

    const queryParams = new URLSearchParams({
      page: pageNumber.toString(),
      limit: '3',
    });

    const normalizedSearchedWord = normalizeArabic(searchedWord);
    const normalizedCategory = normalizeArabic(searchedCategory);

    if (normalizedSearchedWord) {
      queryParams.append('mealName', normalizedSearchedWord);
    }

    if (normalizedCategory) {
      queryParams.append('selectedValue', normalizedCategory);
    }

    try {
      const res = await fetch(
        `/api/search?${queryParams.toString()}&pageNumber=${pageNumber}&limit=8`
      );
      const json = await res?.json();

      if (!normalizedSearchedWord && !normalizedCategory) {
        setIsVisible(false);
      } else {
        setTotalCount(json?.totalCount);
        setHasMore(json?.hasMore);
        console.log();
        setIsVisible(true);
      }

      if (normalizedSearchedWord) {
        setSearchedValues(json?.meals);
        setSearchByCategory([]);
      }

      if (normalizedCategory) {
        setSearchByCategory(json?.meals);
        setSearchedValues([]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
      document.body.style.cursor = 'default'; // Restore default cursor
    }
  };

  // useEffect to perform search when searchedCategory changes or pageNumber changes
  useEffect(() => {
    if (searchedCategory || pageNumber) {
      search();
    }
  }, [searchedCategory, pageNumber]);

  // useEffect to change the cursor
  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isLoading]);

  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  // استخدم useCallback لتغليف handleClose
  const handleClose = useCallback(() => {
    console.log('onClose تم تفعيلها!');

    setIsVisible(false);
    setSearchByCategory([]);
    setSearchedValues([]);
    setSearchedWord('');
    setSearchTriggered(false);
    router.push('/');
  }, [router]); // قم بتضمين router في قائمة الاعتماديات

  // استدعاء handleClose عند تغير المسار
  useEffect(() => {
    handleClose();
  }, [pathname, handleClose]); // قم بتضمين pathname و handleClose في قائمة الاعتماديات

  return (
    <div
      className={`${
        searchTriggered || searchedCategory
          ? 'fixed inset-0 z-50 pt-4 pb-20 px-4 overflow-y-auto bg-gradient-to-b from-secondary to-primary'
          : 'relative z-10'
      } w-full transition-all duration-300`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Search Form */}
        <div className="relative">
          <motion.div
            initial={false}
            animate={{
              y: searchTriggered || searchedCategory ? 0 : 0,
              scale: searchTriggered || searchedCategory ? 1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col items-center w-full"
          >
            {/* Logo */}
            {!searchedCategory && !searchedWord && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative "
              >
                <Image
                  priority
                  src="/logo (2).png"
                  width={400}
                  height={160}
                  alt="شعار موقع الوصفات"
                  className="object-contain"
                />
              </motion.div>
            )}

            {/* Search Input */}
            <div className="w-full max-w-2xl relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    value={searchedWord}
                    onChange={(e) => setSearchedWord(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    type="text"
                    id="search_meal"
                    name="search_meal"
                    placeholder="ابحث عن وصفة طبخ شهية..."
                    className="w-full pr-4 pl-24 py-2 md:py-4 text-lg text-black bg-white/90 backdrop-blur-sm outline-none outline-gray-300 focus:outline focus:outline-secondary rounded-full shadow-lg"
                  />
                  <Button
                    type="submit"
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-orange-700 text-black rounded-full px-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Search className="h-4 w-4 ml-2" />
                        ابحث
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Search Results Header */}
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-between items-center w-full bg-white/90 backdrop-blur-sm rounded-[5px] shadow-md mt-4 p-4"
              >
                {/* نتائج البحث */}
                <h1 className="text-lg md:text-xl font-bold text-gray-500">
                  نتائج البحث:{' '}
                  <span className="text-secondary">{totalCount}</span>
                </h1>

                {/* زر الإغلاق */}
                <button
                  onClick={handleClose}
                  className="flex justify-center items-center gap-2 hover:scale-105 bg-gradient-to-l from-secondary to-primary hover:bg-secondary text-black rounded-full px-3 py-1.5 md:px-4 md:py-2 cursor-pointer text-sm md:text-base"
                >
                  إغلاق <RiCloseLargeFill className="h-4 w-4 ml-2 text-black" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Results */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 space-y-4"
            >
              {/* Loading State */}
              {isLoading && (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonItem key={i} />
                  ))}
                </div>
              )}

              {/* Results from text search */}
              {!isLoading && searchedWord && searchedValues.length > 0 && (
                <div className="space-y-4">
                  {searchedValues.map((recipe, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SmallItem
                        recipe={recipe}
                        index={index}
                        onClose={handleClose}
                      />{' '}
                      {/* تمرير handleClose */}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Results from category search */}
              {!isLoading &&
                searchedCategory &&
                searchByCategory.length > 0 && (
                  <div className="space-y-4">
                    {searchByCategory.map((recipe, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SmallItem
                          recipe={recipe}
                          index={index}
                          onClose={handleClose} // تمرير handleClose
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

              {/* No results message */}
              {!isLoading &&
                ((searchedWord && searchedValues.length === 0) ||
                  (searchedCategory && searchByCategory.length === 0)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-sm p-8 text-center rounded-[5px]"
                  >
                    <div className="text-primary text-5xl mb-4">🍽️</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      لم يتم العثور على نتائج
                    </h3>
                    <p className="text-gray-600">
                      لم نتمكن من العثور على وصفات تطابق بحثك. جرب كلمات مفتاحية
                      أخرى أو تصفح فئات الوصفات.
                    </p>
                  </motion.div>
                )}

              {/* Pagination */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center mt-8 gap-4 bg-green-500 text-black"
              >
                <Link href="#top">
                  <button
                    onClick={() => setPageNumber(pageNumber - 1)}
                    variant="outline"
                    className=" border-orange-200 text-black hover:bg-orange-50 flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 ml-2" />
                    الصفحة السابقة
                  </button>
                </Link>

                <Link href="#top">
                  <button
                    onClick={() => setPageNumber(pageNumber + 1)}
                    variant="outline"
                    className=" backdrop-blur-sm border-orange-200 text-white hover:bg-orange-50 flex items-center"
                  >
                    الصفحة التالية
                    <ChevronLeft className="h-5 w-5 mr-2" />
                  </button>
                </Link>
              </motion.div> */}

              {hasMore && (
                <div className="w-full border-t border-gray-100 p-4 flex flex-col sm:flex-row items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={totalCount < 6}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 mb-2 sm:mb-0"
                  >
                    التالي
                    <MdKeyboardArrowRight className="text-xl" />
                  </motion.button>

                  <div className="flex items-center">
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-primary font-medium text-sm">
                      الصفحة {pageNumber}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber <= 1}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <MdKeyboardArrowLeft className="text-xl" />
                    السابق
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 bg-contain bg-no-repeat opacity-30"
              style={{
                backgroundImage: "url('/placeholder.svg?height=64&width=64')",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float ${
                  5 + Math.random() * 5
                }s ease-in-out infinite ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
