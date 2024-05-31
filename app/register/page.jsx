'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const schema = z.object({
    name: z.string(),
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
    console.log('getValues', getValues());
    if (getValues()?.name === '') {
      setError('name', {
        type: 'custom',
        message: 'اسم المستخدم مطلوب',
      });
      return;
    } else if (getValues()?.email === '') {
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

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getValues()),
    });

    if (response.ok) {
      toast.success('تم التسجيل بنجاح');
      router.push('/login');
    } else {
      setError('email', {
        type: 'custom',
        message:
          'هذا الإيميل موجود بالفعل! قم بتسجيل الدخول أو استخدم عنوان بريد الكتروني أخر',
      });
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen text-white text-lg md:text-xl text-end">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 bg-four p-8 rounded-lg border border-one"
      >
        <h1 className="w-full my-2 text-4xl font-bold text-center select-none">
          التسجيل 🍔
        </h1>
        <div className="flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 ">اسم المستخدم</h1>
          <input
            type="text"
            name={'name'}
            placeholder="الإسم"
            {...register('name')}
            className=" placeholder-gray-400 transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-end"
          />
        </div>
        {errors?.name && (
          <h1 className="text-one text-md my-2">{errors?.name?.message}</h1>
        )}
        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 ">البريد الإلكتروني</h1>
          <input
            type="text"
            name={'email'}
            placeholder="الإيميل"
            {...register('email')}
            className=" placeholder-gray-400 transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-end"
          />
        </div>
        {errors?.email && (
          <h1 className="text-one text-md my-2">{errors?.email?.message}</h1>
        )}
        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 ">كلمة السر</h1>
          <input
            type="password"
            name={'password'}
            placeholder="كلمة السر"
            {...register('password')}
            className=" placeholder-gray-400 transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-end"
          />
        </div>
        {errors?.password && (
          <h1 className="text-one text-md my-2">{errors?.password?.message}</h1>
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
          <h1 className="text-lg grow text-center text-four">
            التسجيل عن طريق جوجل
          </h1>
        </div>
        <div className="flex justify-between gap-8 items-center mt-4">
          <Button title={'إغلاق'} onClick={() => router.push('/')} />
          <Button title={'تسجيل'} />
        </div>
        <Link href={'/login'}>
          {' '}
          <h1>
            هل لديك حساب بالفعل ؟ قم بتسجيل الدخول{' '}
            <span className="text-one text-lg md:text-[27px] hover:scale-105">
              🥧 هنا
            </span>
          </h1>
        </Link>
      </form>
    </div>
  );
}
