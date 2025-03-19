// 'use client';
// import React, { useState, useEffect } from 'react';
// import { IoIosSearch } from 'react-icons/io';
// import SmallItem from './SmallItem';
// import Image from 'next/image';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import {
//   MdKeyboardDoubleArrowRight,
//   MdKeyboardDoubleArrowLeft,
// } from 'react-icons/md';
// import { Suspense } from 'react';

// // Function to normalize Arabic text
// const normalizeArabic = (text) => {
//   if (!text) return '';
//   return text.replace(/[أ]/g, 'ا');
// };

// export default function SearchBar() {
//   const [pageNumber, setPageNumber] = useState(1);
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchByCategory, setSearchByCategory] = useState([]);
//   const [searchedWord, setSearchedWord] = useState('');
//   const [searchedValues, setSearchedValues] = useState([]);
//   const [searchTriggered, setSearchTriggered] = useState(false); // حالة جديدة لتعقب تفعيل البحث
//   const searchCategory = useSearchParams();
//   const searchedCategory = searchCategory.get('searchedCategory');
//   const router = useRouter();

//   // Function to perform search
//   const search = async () => {
//     setSearchTriggered(true); // تفعيل حالة البحث عند تشغيله
//     const queryParams = new URLSearchParams({
//       page: pageNumber.toString(),
//       limit: '3',
//     });

//     const normalizedSearchedWord = normalizeArabic(searchedWord);
//     const normalizedCategory = normalizeArabic(searchedCategory);

//     if (normalizedSearchedWord) {
//       queryParams.append('mealName', normalizedSearchedWord);
//     }

//     if (normalizedCategory) {
//       queryParams.append('selectedValue', normalizedCategory);
//     }

//     const res = await fetch(`/api/search?${queryParams.toString()}`);
//     const json = await res?.json();

//     if (!normalizedSearchedWord && !normalizedCategory) {
//       setIsVisible(false);
//     } else {
//       setIsVisible(true);
//     }

//     if (normalizedSearchedWord) {
//       setSearchedValues(json);
//       setSearchByCategory([]); // Clear category search results
//     }

//     if (normalizedCategory) {
//       setSearchByCategory(json);
//       setSearchedValues([]); // Clear text search results
//     }
//   };

//   // useEffect to perform search when searchedCategory changes or pageNumber changes
//   useEffect(() => {
//     if (searchedCategory) {
//       search();
//     }
//   }, [searchedCategory, pageNumber]); // Added pageNumber to dependencies to fetch new results when page changes

//   const handleSearch = (e) => {
//     e.preventDefault();
//     search();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       search();
//     }
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setSearchByCategory([]);
//     setSearchedValues([]);
//     setSearchedWord('');
//     setSearchTriggered(false); // إعادة تعيين حالة البحث عند الإغلاق
//     router.push('/');
//   };

//   return (
//     <Suspense>
//       <div
//         className={
//           (searchTriggered || searchedCategory
//             ? 'absolute z-50 top-4 left-0 h-screen overflow-scroll'
//             : '') +
//           ' flex flex-col items-start justify-center w-full lg:mt-8 bg-four rounded-lg'
//         }
//       >
//         <div className="flex flex-col justify-center items-center sm:flex-row gap-4 w-full">
//           {!searchedCategory && !searchedWord && (
//             <div className="relative w-full xl:w-96 h-52 overflow-hidden">
//               <Image
//                 priority
//                 src="https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716956/cooking/logo1_uwwlyk.png"
//                 layout="fill"
//                 objectFit="contain"
//                 alt="photo"
//               />
//             </div>
//           )}
//           <div className="relative w-full sm:px-4 bg-four">
//             <input
//               value={searchedWord}
//               onChange={(e) => setSearchedWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               autoFocus
//               type="text"
//               id="search_meal"
//               name="search_meal"
//               placeholder="ابحث عن وصفة طبخ   ..."
//               className=" w-full rounded-full border-2 text-lg md:text-xl placeholder:text-sm sm:placeholder:text-lg py-2 pr-24 lg:pr-28 outline-2 placeholder:px-4 focus:outline-one text-right"
//             />
//             <div className="absolute flex items-center top-0 md:top-0 md:right-4 md:w-24 w-[80px] right-0 h-full bg-primary rounded-r-full ">
//               <button
//                 onClick={handleSearch}
//                 className="text-white size-5 sm:mr-4 mb-2 hover:font-bold px-2"
//               >
//                 <div className="flex items-center gap-1">
//                   <div className="text-white text-xl">
//                     <IoIosSearch />
//                   </div>
//                   <span className="text-white text-lg"> ابحث</span>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//         {isVisible && (
//           <div className="sticky top-0 flex flex-row-reverse justify-between items-center mt-1 w-full z-50 bg-four p-4">
//             <button
//               onClick={handleClose}
//               className="py-1 px-4 text-white bg-five w-24 rounded-full sm:text-lg hover:bg-primary hover:scale-55"
//             >
//               إغلاق
//             </button>
//             <h1 className="text-sm sm:text-2xl text-nowrap mx-2 font-bold text-white">
//               نتائج البحث:
//             </h1>
//           </div>
//         )}
//         {isVisible && (
//           <div className="relative w-full flex flex-col items-center justify-start p-2 overflow-y-auto h-screen bg-four rounded-lg content-center">
//             {searchedWord &&
//               searchedValues.length > 0 &&
//               searchedValues.map((recipe, index) => (
//                 <div className="w-full 2xl:w-2/3 " key={index}>
//                   <SmallItem recipe={recipe} index={index} />
//                 </div>
//               ))}
//             {searchedCategory &&
//               searchByCategory.length > 0 &&
//               searchByCategory.map((recipe, index) => (
//                 <div className="w-full 2xl:w-2/3" key={index}>
//                   <SmallItem recipe={recipe} index={index} />
//                 </div>
//               ))}
//             <div className="flex items-center justify-around my-4 mt-8 w-full">
//               {(searchByCategory.length >= 3 || searchedValues.length >= 3) && (
//                 <Link href="#post1">
//                   <div
//                     className="flex items-center justify-around cursor-pointer"
//                     onClick={() => setPageNumber(pageNumber + 1)}
//                   >
//                     <h1 className="text-white font-bold">الصفحة التالية</h1>
//                     <MdKeyboardDoubleArrowRight className="text-2xl animate-pulse text-primary" />
//                   </div>
//                 </Link>
//               )}
//               {pageNumber > 1 && (
//                 <Link href="#post1">
//                   <div
//                     className="flex items-center justify-around cursor-pointer"
//                     onClick={() => setPageNumber(pageNumber - 1)}
//                   >
//                     <MdKeyboardDoubleArrowLeft className="text-2xl animate-pulse text-primary" />
//                     <h1 className="text-white font-bold">الصفحة السابقة</h1>
//                   </div>
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </Suspense>
//   );
// }
'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, ChevronLeft, X } from 'lucide-react';
import Button from './Button';

// Placeholder for SmallItem component
const SmallItem = ({ recipe, index }) => {
  return (
    <div className="w-full mb-4 overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-orange-200">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Image
            src={recipe.image || '/placeholder.svg?height=200&width=300'}
            alt={recipe.mealName || 'وصفة طبخ'}
            width={300}
            height={200}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs">
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
            <Link href={`/recipe/${recipe.id}`}>
              <Button className="bg-primary hover:bg-secondary text-white">
                عرض الوصفة
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const router = useRouter();

  // Function to perform search
  const search = async () => {
    setIsLoading(true);
    setSearchTriggered(true);

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
      const res = await fetch(`/api/search?${queryParams.toString()}`);
      const json = await res?.json();

      if (!normalizedSearchedWord && !normalizedCategory) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      if (normalizedSearchedWord) {
        setSearchedValues(json);
        setSearchByCategory([]);
      }

      if (normalizedCategory) {
        setSearchByCategory(json);
        setSearchedValues([]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to perform search when searchedCategory changes or pageNumber changes
  useEffect(() => {
    if (searchedCategory) {
      search();
    }
  }, [searchedCategory, pageNumber]);

  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setSearchByCategory([]);
    setSearchedValues([]);
    setSearchedWord('');
    setSearchTriggered(false);
    router.push('/');
  };

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
                className="relative w-full max-w-md h-40 mb-4"
              >
                <Image
                  priority
                  src="https://res.cloudinary.com/dh2xlutfu/image/upload/v1718716955/cooking/nasoh_and_bahiga_cn3e7h.png"
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
                    className="w-full pr-4 pl-24 py-6 text-lg bg-white/90 backdrop-blur-sm border-orange-200 focus:border-primary rounded-full shadow-lg"
                  />
                  <Button
                    type="submit"
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-orange-700 text-white rounded-full px-6"
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
                className="sticky top-0 z-20 flex justify-between items-center w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-md mt-4 p-4"
              >
                <h1 className="text-xl font-bold text-orange-800">
                  نتائج البحث:
                </h1>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="border-primary text-primary hover:bg-orange-50"
                >
                  <X className="h-4 w-4 ml-2" />
                  إغلاق
                </Button>
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
              {/* Results from text search */}
              {searchedWord && searchedValues.length > 0 && (
                <div className="space-y-4">
                  {searchedValues.map((recipe, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SmallItem recipe={recipe} index={index} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Results from category search */}
              {searchedCategory && searchByCategory.length > 0 && (
                <div className="space-y-4">
                  {searchByCategory.map((recipe, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SmallItem recipe={recipe} index={index} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No results message */}
              {((searchedWord && searchedValues.length === 0) ||
                (searchedCategory && searchByCategory.length === 0)) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center"
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
              {(searchByCategory.length >= 3 || searchedValues.length >= 3) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center items-center mt-8 gap-4"
                >
                  {pageNumber > 1 && (
                    <Link href="#top">
                      <Button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        variant="outline"
                        className="bg-white/90 backdrop-blur-sm border-orange-200 text-orange-800 hover:bg-orange-50 flex items-center"
                      >
                        <ChevronRight className="h-5 w-5 ml-2" />
                        الصفحة السابقة
                      </Button>
                    </Link>
                  )}

                  <Link href="#top">
                    <Button
                      onClick={() => setPageNumber(pageNumber + 1)}
                      variant="outline"
                      className="bg-white/90 backdrop-blur-sm border-orange-200 text-orange-800 hover:bg-orange-50 flex items-center"
                    >
                      الصفحة التالية
                      <ChevronLeft className="h-5 w-5 mr-2" />
                    </Button>
                  </Link>
                </motion.div>
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
