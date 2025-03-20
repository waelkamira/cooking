'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa6';
import Loading from '../../components/Loading';

export default function LogInPage() {
  const session = useSession();
  const router = useRouter();

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false); // Initialize to false

  // Zod schema for form validation
  const schema = z.object({
    email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
    password: z
      .string()
      .min(5, { message: 'يجب أن تتكون كلمة المرور من 5 أحرف على الأقل' }),
  });

  // React Hook Form setup with Zod resolver
  const {
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // Redirect if user is already logged in
  useEffect(() => {
    if (session?.data?.user?.email) {
      router.push('/');
    }
  }, [router, session?.data?.user?.email]);

  // Form submission handler
  async function onSubmit() {
    // Explicit validation for email and password length
    if (!getValues().email) {
      setError('email', {
        type: 'custom',
        message: 'عنوان البريد الإلكتروني مطلوب',
      });
      return;
    }

    if (getValues().password.length < 5) {
      setError('password', {
        type: 'custom',
        message: 'طول كلمة السر يجب أن يكون 5 أحرف على الأقل',
      });
      return;
    }

    // Set loading to true *before* the signIn call
    setIsLoading(true);

    // Sign in using credentials provider
    const response = await signIn('credentials', {
      ...getValues(),
      redirect: false,
      callbackUrl: '/',
    });

    // Handle successful login
    if (response?.ok) {
      const values = getValues();
      localStorage.setItem('email', values.email);
      localStorage.setItem('password', values.password);

      // Show success toast
      toast.success('تم تسجيل الدخول بنجاح أهلا بك');

      // Delay the router.push to show the loading state for a brief moment
      setTimeout(() => {
        setIsLoading(false); // Set loading to false *after* the transition
        router.push('/');
      }, 1500); // Adjust the delay (in milliseconds) as needed
    } else {
      // Handle login error
      setError('email', {
        type: 'custom',
        message: 'عنوان البريد الالكتروني او كلمة السر خاطئة',
      });
      toast.error('حدث خطأ ما حاول مرة أخرى');
      setIsLoading(false); // Set loading to false on error
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="flex justify-center items-center w-full h-screen text-gray-500 text-lg md:text-xl text-end"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading ? ( // Show loading component while isLoading is true
        <Loading />
      ) : (
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-1/2 bg-four p-8 rounded-xl transition-transform duration-300 ease-in-out shadow-lg border border-one"
        >
          <h1 className="flex justify-center items-center gap-2 w-full my-4 text-2xl sm:text-3xl md:text-4xl font-bold text-center select-none">
            تسجيل الدخول <FaUtensils className="text-3xl" />
          </h1>

          {/* Google Sign In Button */}
          <motion.div
            className="flex justify-center w-full border bg-white rounded-[5px] px-4 py-2 items-center my-8 hover:shadow-md cursor-pointer"
            onClick={() => signIn('google')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative h-8 w-8">
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
          </motion.div>
          {/* Other form elements (email, password fields, etc.) */}
        </motion.form>
      )}
    </motion.div>
  );
}
