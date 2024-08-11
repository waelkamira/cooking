'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import NewRecipeButton from './NewRecipeButton';
import AllCookingRecipes from './AllCookingRecipes';
import { useSession } from 'next-auth/react';
import SideBarMenu from './SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import CategoriesSlides from './CategoriesSlides';
import { Suspense } from 'react';
import UploadingAndDisplayingImage from './UploadingAndDisplayingImage';
import { useRouter } from 'next/navigation';
import Button from './Button';
import VideoPlayer from './VideoPlayer';
export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  //! التطبيق build حتى لا تسبب مشكلة عند  useEffect يجب وضع الجملة الشرطية هذه ضمن
  // useEffect(() => {
  //   if (session?.data?.user?.email === undefined) {
  //     router.push('/login');
  //   }
  // }, [router, session?.data?.user?.email]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && session?.user?.image) {
  //     localStorage.setItem('image', JSON.stringify(session.user.image));
  //   }
  // }, [session?.user?.image]);

  // if (session?.data?.user?.email === undefined) {
  //   router.push('/login');
  // }

  if (typeof window !== 'undefined' && session?.user?.image) {
    localStorage.setItem('image', JSON.stringify(session.user.image));
  }

  return (
    <Suspense>
      <div className="relative flex flex-col justify-center items-center xl:w-4/5 z-40 sm:my-0 w-full bg-four">
        <div className="w-full p-2 sm:p-4 lg:p-8">
          <div className="xl:hidden absolute flex flex-col items-start gap-2 z-50 top-2 right-0 sm:top-4 sm:right-4 lg:top-12 lg:right-12 w-full">
            <TfiMenuAlt
              className=" p-2 rounded-lg text-5xl text-one animate-pulse"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
          </div>
          <div className="relative hidden lg:block w-full h-24 sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-one">
            <Image
              priority
              src={'/photo (5).png'}
              layout="fill"
              objectFit="cover"
              alt="photo"
            />
          </div>
          {/* <div className="h-96 w-96 ">
            <h1>مشغل</h1>
            <div class="flex items-center justify-center">
              <video controls controlsList="nodownload" class="w-96 h-64">
                <source
                  src="https://cdn.arteenz.com/75441e2b95254493ab02a4e94d7710e9:arteenz/001/a7lam_wa_fra7/a7lam_wa_fra7_01.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div> */}

          <SearchBar />
          <div className={'xl:hidden'}>
            <NewRecipeButton />
            {session?.status === 'unauthenticated' && (
              <Button title={'تسجيل الدخول'} path={'/login'} style={' '} />
            )}
          </div>
          <h1 className="hidden xl:block text-md sm:text-lg lg:text-3xl text-nowrap mx-2 font-bold text-white bg-four rounded-full py-2 px-4 select-none text-center">
            أحدث المنشورات
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full rounded-lg sm:p-8 gap-4 bg-[url(https://res.cloudinary.com/dh2xlutfu/image/upload/v1719060133/shoed13tnpenwajfs8sa.png)]">
          <CategoriesSlides />
          <h1 className="xl:hidden text-md sm:text-lg lg:text-3xl text-nowrap mx-2 font-bold text-white bg-four rounded-full py-2 px-4 select-none text-center">
            أحدث المنشورات
          </h1>
          <AllCookingRecipes />
        </div>
      </div>
    </Suspense>
  );
}
