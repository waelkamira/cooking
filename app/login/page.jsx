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

export default function RegisterPage() {
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
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit() {
    // console.log('getValues', getValues());

    const response = await signIn('credentials', {
      ...getValues(),
      redirect: false,
      callbackUrl: '/',
    });

    if (response.ok) {
      toast.success(`🎉أهلا وسهلا 🎉`);
      router.push('/');
    } else {
      setError(response?.error);
      toast.error(response?.error);
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen text-white text-lg md:text-xl text-end">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 bg-four p-8 rounded-lg border border-one"
      >
        <h1 className="w-full my-2 text-4xl font-bold text-center select-none">
          تسجيل الدخول 🧀
        </h1>

        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 select-none">البريد الإلكتروني</h1>
          <input
            type="text"
            name={'email'}
            placeholder="الإيميل"
            {...register('email')}
            className=" placeholder-gray-400 transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-end"
          />
        </div>
        {errors?.email && (
          <h1 className="text-one text-md my-2 select-none">
            {errors?.email?.message}
          </h1>
        )}

        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 select-none">كلمة السر</h1>
          <input
            type="password"
            name={'password'}
            placeholder="كلمة السر"
            {...register('password')}
            className=" placeholder-gray-400 transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-end"
          />
        </div>
        {errors?.password && (
          <h1 className="text-one text-md my-2 select-none">
            {errors?.password?.message}
          </h1>
        )}
        <div
          className="flex justify-between w-full bg-white rounded-md px-4 py-2 items-center my-2 hover:shadow-md cursor-pointer"
          onClick={() => signIn('google')}
        >
          <div className="relative h-8 w-8">
            <Image
              src={'/google.png'}
              alt="google image"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-lg grow text-center text-four select-none">
            تسجيل الدخول عن طريق جوجل
          </h1>
        </div>
        <div className="flex justify-between gap-8 items-center mt-4">
          <Button title={'إغلاق'} onClick={() => router.push('/')} />
          <Button title={'تسجيل الدخول'} />
        </div>
        <Link href={'/register'}>
          {' '}
          <h1>
            ليس لديك حساب؟ قم بالتسجيل{' '}
            <span className="text-one text-lg md:text-[27px] hover:scale-105">
              🥧 هنا
            </span>
          </h1>
        </Link>
      </form>
    </div>
  );
}
