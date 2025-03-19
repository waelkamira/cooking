'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import CustomToast from '../../components/CustomToast';
import { useEffect } from 'react';

export default function LogInPage() {
  const session = useSession();
  // console.log(session?.data?.user?.name);
  const router = useRouter();
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(),
  });

  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (session?.data?.user?.email) {
      router.push('/');
    }
  }, [router, session?.data?.user?.email]);

  async function onSubmit() {
    if (getValues()?.email === '') {
      setError('email', {
        type: 'custom',
        message: 'عنوان البريد الإلكتروني مطلوب',
      });
      return;
    } else if (getValues()?.password?.length < 5) {
      setError('password', {
        type: 'custom',
        message:
          'طول كلمة السر يجب أن يكون 5 أحرف (أو 5 أرقام وأحرف) على الأقل',
      });
      return;
    }
    // console.log('getValues', getValues());

    const response = await signIn('credentials', {
      ...getValues(),
      redirect: false,
      callbackUrl: '/',
    });

    if (response.ok) {
      const values = getValues();

      localStorage.setItem('email', values?.email);
      localStorage.setItem('password', values?.password);
      router.push('/');
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={' بهيجة اشرق لبن ترحب بكم أهلا وسهلا '}
          emoji={'🧀'}
          orangeEmoji={'🧀'}
        />
      ));
    } else {
      setError(response?.error);
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={
            'عنوان البريد الالكتروني هذا غير موجود يجب عليك التسجيل أولا 😐'
          }
        />
      ));
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen text-white text-lg md:text-xl text-end">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 bg-four p-8 rounded-lg border border-one"
      >
        <h1 className="w-full my-2 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-center select-none">
          تسجيل الدخول 🧀
        </h1>

        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 select-none text-start text-sm sm:text-lg">
            البريد الإلكتروني
          </h1>
          <input
            type="text"
            name={'email'}
            placeholder="الإيميل"
            {...register('email')}
            className=" placeholder-gray-400 transition-all placeholder:text-sm placeholder:sm:text-lg duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-start"
          />
        </div>
        {errors?.email && (
          <h1 className="text-one text-md my-2 select-none">
            {errors?.email?.message}
          </h1>
        )}

        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 select-none text-start text-sm sm:text-lg">
            كلمة السر
          </h1>
          <input
            type="password"
            name={'password'}
            placeholder="كلمة السر"
            {...register('password')}
            className=" placeholder-gray-400 placeholder:text-sm placeholder:sm:text-lg transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-start"
          />
        </div>
        {errors?.password && (
          <h1 className="text-one text-md my-2 select-none">
            {errors?.password?.message}
          </h1>
        )}
        <div
          className="flex justify-center w-full bg-white rounded-md px-4 py-2 items-center my-8 hover:shadow-md cursor-pointer"
          onClick={() => signIn('google')}
        >
          <div className="relative h-8 w-8 ">
            <Image
              priority
              src={'/google.png'}
              alt="google image"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-sm sm:text-lg grow text-center text-gray-500 select-none font-semibold">
            تسجيل الدخول عن طريق جوجل
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-8 items-center mt-4 w-full">
          <button
            type="submit"
            className=" text-lg p-2  my-3 text-white text-nowrap bg-five hover:bg-primary rounded-lg hover:scale-[101%] w-full "
          >
            تسجيل الدخول
          </button>

          <div className="w-full">
            <Link href={'/'}>
              <button
                type="submit"
                className=" text-lg p-2  my-3 text-white text-nowrap bg-five hover:bg-primary rounded-lg hover:scale-[101%] w-full "
              >
                إغلاق{' '}
              </button>{' '}
            </Link>
          </div>
        </div>
        <Link href={'/register'}>
          <h1 className="mt-4 text-start text-sm sm:text-lg">
            ليس لديك حساب؟ قم بالتسجيل
            <span className="text-one text-lg sm:text-xl hover:scale-105">
              🧀 هنا
            </span>
          </h1>
        </Link>
      </form>
    </div>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession, signIn } from 'next-auth/react';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';

// // دالة للتحقق من صحة البريد الإلكتروني
// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// // دالة للتحقق من صحة بيانات تسجيل الدخول
// function validateLogin(email, password) {
//   const errors = {};

//   if (!email) {
//     errors.email = 'عنوان البريد الإلكتروني مطلوب';
//   } else if (!isValidEmail(email)) {
//     errors.email = 'عنوان البريد الإلكتروني غير صالح';
//   }

//   if (!password) {
//     errors.password = 'كلمة السر مطلوبة';
//   } else if (password.length < 5) {
//     errors.password = 'كلمة السر يجب أن تكون 5 أحرف على الأقل';
//   }

//   return errors;
// }

// // دالة لتسجيل الدخول باستخدام البريد الإلكتروني وكلمة السر
// async function handleLogin(email, password, setIsLoading) {
//   const errors = validateLogin(email, password);
//   if (Object.keys(errors).length > 0) {
//     Object.values(errors).forEach((error) => toast.error(error));
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const result = await signIn('credentials', {
//       email,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       toast.error('فشل تسجيل الدخول: البريد الإلكتروني أو كلمة السر غير صحيحة');
//     } else {
//       toast.success('تم تسجيل الدخول بنجاح!');
//       window.location.href = '/'; // إعادة التوجيه إلى الصفحة الرئيسية
//     }
//   } catch (error) {
//     toast.error('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
//   } finally {
//     setIsLoading(false);
//   }
// }

// // دالة لتسجيل الدخول باستخدام جوجل
// async function handleGoogleSignIn(setIsGoogleLoading) {
//   setIsGoogleLoading(true);

//   try {
//     const result = await signIn('google', { redirect: false });

//     if (result?.error) {
//       toast.error('فشل تسجيل الدخول باستخدام جوجل');
//     } else {
//       toast.success('تم تسجيل الدخول بنجاح باستخدام جوجل!');
//       window.location.href = '/'; // إعادة التوجيه إلى الصفحة الرئيسية
//     }
//   } catch (error) {
//     toast.error('حدث خطأ أثناء تسجيل الدخول باستخدام جوجل.');
//   } finally {
//     setIsGoogleLoading(false);
//   }
// }

// // مكون تسجيل الدخول
// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);
//   const router = useRouter();
//   const { data: session } = useSession();

//   // إذا كان المستخدم مسجل الدخول بالفعل، إعادة توجيهه إلى الصفحة الرئيسية
//   if (session) {
//     router.push('/');
//     return null;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h1>

//         {/* نموذج تسجيل الدخول */}
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
//             await handleLogin(email, password, setIsLoading);
//           }}
//           className="space-y-4"
//         >
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               البريد الإلكتروني
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="أدخل بريدك الإلكتروني"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               كلمة السر
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="أدخل كلمة السر"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
//           >
//             {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
//           </button>
//         </form>

//         {/* زر تسجيل الدخول باستخدام جوجل */}
//         <button
//           onClick={async () => await handleGoogleSignIn(setIsGoogleLoading)}
//           disabled={isGoogleLoading}
//           className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors duration-300"
//         >
//           {isGoogleLoading ? 'جاري التحميل...' : 'تسجيل الدخول باستخدام جوجل'}
//         </button>

//         {/* رابط للتسجيل */}
//         <p className="mt-4 text-center text-sm text-gray-600">
//           ليس لديك حساب؟{' '}
//           <Link href="/register" className="text-blue-500 hover:underline">
//             أنشئ حسابًا جديدًا
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
