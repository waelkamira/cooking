'use client';
import { useSession } from 'next-auth/react';
import Button from './Button';
import { motion } from 'framer-motion';

export default function NewRecipeButton() {
  const session = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="-mt-8 z-30 flex justify-center md:justify-start md:w-44 gap-4"
    >
      <Button
        title={
          session?.status === 'authenticated'
            ? 'إنشاء وصفة جديدة'
            : 'تسجيل الدخول'
        }
        style={
          ' bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
        }
        path={session?.status === 'authenticated' ? '/newRecipe' : '/login'}
      />
    </motion.div>
  );
}
