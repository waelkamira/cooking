'use client';
import Image from 'next/image';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useRouter } from 'next/navigation';
const animation = { duration: 50000, easing: (t) => t };

const items = [
  {
    image: '/item1.png',
  },
  {
    image: '/item2.png',
  },
  { image: '/item3.png' },
];

const items1 = [
  { image: '/item5.png' },
  { image: '/item10.png' },
  { image: '/item9.png' },
];
const categories = [{ name: 'الوجبة الرئيسية', image: '/10.png' }];
const categories1 = [
  { name: 'المعجنات', image: '/2.png' },
  {
    name: 'المقبلات',
    image: '/7.png',
  },
];
const categories2 = [
  {
    name: 'السلطات',
    image: '/6.png',
  },
  {
    name: 'الحلويات',
    image: '/5.png',
  },
];
const categories3 = [
  {
    name: 'الشوربات',
    image: '/3.png',
  },
  {
    name: 'العصائر',
    image: '/4.png',
  },
];

const smallSize = [
  { name: 'وجبة رئيسية', image: '/1.png' },
  { name: 'معجنات', image: '/2.png' },
  {
    name: 'شوربات',
    image: '/3.png',
  },
  {
    name: 'مقبلات',
    image: '/7.png',
  },
  {
    name: 'سلطات',
    image: '/6.png',
  },
  {
    name: 'حلويات',
    image: '/5.png',
  },
  {
    name: 'عصائر و مشروبات',
    image: '/4.png',
  },
];

export default function Categories() {
  const router = useRouter();

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details?.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details?.abs + 5, true, animation);
    },
  });
  return (
    <div className="w-full xl:w-1/3 h-full rounded-lg">
      <div className="xl:hidden">
        <hr className="w-full h-1 m-0 p-0 bg-white border border-white rounded-full" />
        <div ref={sliderRef} className=" keen-slider ">
          {smallSize.map((category) => (
            <div
              className="keen-slider__slide flex flex-col gap-2 justify-center items-center bg-four rounded-lg cursor-pointer h-full "
              onClick={() => router.push(`?searchCategory=${category?.name}`)}
            >
              <div className="relative border-2 border-four mt-4 w-52 h-24 sm:w-72 sm:h-32 md:w-80 md:h-44 lg:w-[500px] lg:h-62 xl:w-[900px]  rounded-lg overflow-hidden hover:scale-[101%] transition-all duration-500">
                <Image
                  src={category.image}
                  layout="fill"
                  objectFit="cover"
                  alt="photo"
                />
              </div>
              <h1 className="text-md md:text-lg text-center rounded-full p-2 text-white mx-4 font-semibold w-full select-none">
                {category.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden xl:flex flex-col items-center justify-center p-4 w-full bg-four rounded-lg border-[10px] border-one">
        <h1 className="text-lg sm:text-xl text-center p-2 text-white mx-4 font-semibold w-full select-none">
          ابحث حسب الصنف
        </h1>
        {smallSize.map((category) => (
          <div className=" flex flex-col justify-center items-center rounded-full mx-4 cursor-pointer w-full ">
            <div
              className="relative border border-one w-full h-[103px] rounded-lg overflow-hidden hover:scale-[101%] transition-all duration-300 shadow-lg"
              onClick={() => router.push(`?searchCategory=${category?.name}`)}
            >
              <Image
                src={category.image}
                layout="fill"
                objectFit="cover"
                alt="photo"
              />
            </div>
            <h1 className="text-lg sm:text-xl text-center p-2 text-white mx-4 font-ةي w-full select-none">
              {category.name}
            </h1>
          </div>
        ))}
      </div>
      {/* <div className="hidden 2xl:block w-full rounded-lg">
        <div className="w-full  ">
          <div className="flex flex-col items-center justify-center p-4 w-full">
            {categories.map((category) => (
              <div className=" flex flex-col justify-center items-center rounded-full mx-4 cursor-pointer w-full ">
                <div className="relative border-2 border-four w-full h-24 sm:h-52 rounded-lg overflow-hidden hover:scale-[101%] transition-all duration-500 shadow-lg">
                  <Image
                    src={category.image}
                    layout="fill"
                    objectFit="cover"
                    alt="photo"
                  />
                </div>
                <h1 className="text-lg sm:text-xl text-center rounded-full p-2 text-white mx-4 font-semibold w-full select-none">
                  {category.name}
                </h1>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center w-full">
            {categories1.map((category) => (
              <div className=" flex flex-col justify-center items-center rounded-full mx-4 cursor-pointer w-full p-4">
                <div className="relative border-2 border-four w-full h-24 sm:h-32 rounded-lg overflow-hidden hover:scale-[103%] transition-all duration-500 shadow-lg">
                  <Image
                    src={category.image}
                    layout="fill"
                    objectFit="cover"
                    alt="photo"
                    priority
                  />
                </div>
                <h1 className="text-lg sm:text-xl text-center rounded-full p-2 text-white mx-4 font-semibold w-full select-none">
                  {category.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="px-8">
          <div className="bg-four flex items-center justify-center w-full h-12 my-4 overflow-visible rounded-lg">
            {items.map((category) => (
              <div className=" flex justify-center items-center rounded-full cursor-pointer w-full p-4">
                <div className="relative w-full h-16 hover:scale-105 transition-all duration-500">
                  <Image
                    src={category.image}
                    layout="fill"
                    objectFit="contain"
                    alt="photo"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center w-full ">
          {categories2.map((category) => (
            <div className=" flex flex-col justify-center items-center rounded-full mx-4 cursor-pointer w-full p-4 mt-4">
              <div className="relative border-2 border-four w-full h-24 sm:h-32 rounded-lg overflow-hidden hover:scale-[103%] transition-all duration-500 shadow-lg">
                <Image
                  src={category.image}
                  layout="fill"
                  objectFit="cover"
                  alt="photo"
                  priority
                />
              </div>
              <h1 className="text-lg sm:text-xl text-center rounded-full p-2 text-white mx-4 font-semibold w-full select-none">
                {category.name}
              </h1>
            </div>
          ))}
        </div>
        <div className="px-8">
          <div className="bg-four flex items-center justify-center w-full h-12 my-4 overflow-visible rounded-lg">
            {items1.map((category) => (
              <div className=" flex justify-center items-center rounded-full cursor-pointer w-full p-4">
                <div className="relative w-full h-16 hover:scale-105 transition-all duration-500 rotate-[25deg]">
                  <Image
                    src={category.image}
                    layout="fill"
                    objectFit="contain"
                    alt="photo"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-4 ">
          {categories3.map((category) => (
            <div className=" flex flex-col justify-center items-center rounded-full mx-4 cursor-pointer w-full p-4">
              <div className="relative border-2 border-four w-full h-24 sm:h-32 rounded-lg overflow-hidden hover:scale-[103%] transition-all duration-500 shadow-lg">
                <Image
                  src={category.image}
                  layout="fill"
                  objectFit="cover"
                  alt="photo"
                  priority
                />
              </div>
              <h1 className="text-lg sm:text-xl text-center rounded-full p-2 text-white mx-4 font-semibold w-full select-none">
                {category.name}
              </h1>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
