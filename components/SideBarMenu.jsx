'use client';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import CurrentUser from '../components/CurrentUser';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import LoadingPhoto from './LoadingPhoto';
import { motion } from 'framer-motion';
import {
  FaUtensils,
  FaHeart,
  FaAward,
  FaUsers,
  FaSignOutAlt,
  FaQuestion,
  FaPlus,
  FaTimes,
} from 'react-icons/fa';

export default function SideBarMenu({ setIsOpen }) {
  const session = useSession();
  const user = CurrentUser();
  const [isHovered, setIsHovered] = useState(null);

  // Navigation items
  const navItems = [
    {
      title: 'إنشاء وصفة',
      path: '/newRecipe',
      icon: <FaPlus className="ml-2" />,
    },
    {
      title: 'شو أطبخ اليوم؟',
      path: '/whatToCookToday',
      icon: <FaQuestion className="ml-2" />,
    },
    {
      title: 'طبخاتي',
      path: '/myRecipes',
      icon: <FaUtensils className="ml-2" />,
    },
    {
      title: 'وصفات أعجبتني',
      path: '/favoritePosts',
      icon: <FaHeart className="ml-2" />,
    },
    // { title: 'الجوائز', path: '/myGarden', icon: <FaAward className="ml-2" /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="p-5 w-full max-w-xs h-full bg-gradient-to-b from-secondary to-primary rounded-lg shadow-xl overflow-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-bold text-xl">القائمة</h2>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(false)}
          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <FaTimes className="h-5 w-5" />
        </motion.button>
      </div>

      {/* User Profile Section */}
      {session?.status === 'authenticated' && (
        <Link href={'/profile?username'}>
          <motion.div
            className="flex items-center gap-3 p-3 mb-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative size-12 overflow-hidden rounded-full border-2 border-white/20">
              {!user?.image ? (
                <LoadingPhoto />
              ) : (
                <Image
                  priority
                  src={user?.image || '/placeholder.svg'}
                  fill
                  alt={session?.data?.user?.name}
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="text-white font-medium text-sm line-clamp-1">
                {session?.data?.user?.name}
              </h3>
              <p className="text-white/70 text-xs">عرض الملف الشخصي</p>
            </div>
          </motion.div>
        </Link>
      )}

      {/* Login Button for Unauthenticated Users */}
      {session?.status === 'unauthenticated' && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mb-4"
        >
          <Button
            title={'تسجيل الدخول'}
            path={'/login'}
            style={
              'bg-white text-secondary hover:bg-orange-50 w-full py-3 font-medium'
            }
          />
        </motion.div>
      )}

      {/* Admin Section */}
      {session?.status === 'authenticated' && user?.isAdmin === 0 && (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mb-4"
        >
          <Button
            title={'المستخدمين'}
            path={'/users'}
            style={
              'flex items-center justify-start bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 transition-all duration-300'
            }
            icon={<FaUsers className="ml-2" />}
          />
        </motion.div>
      )}

      {/* Navigation Items */}
      {session?.status === 'authenticated' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2 mb-6"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <Button
                title={item.title}
                path={item.path}
                style={`flex items-center justify-start bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 transition-all duration-300 ${
                  isHovered === index ? 'pr-5' : 'pr-3'
                }`}
                icon={item.icon}
              />
            </motion.div>
          ))}

          {/* Sign Out Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4"
          >
            <Button
              title={'تسجيل الخروج'}
              path={'/'}
              onClick={() => signOut()}
              style={
                'flex items-center justify-start bg-white/10 hover:bg-primary/70 text-white border border-white/10 hover:border-secondary transition-all duration-300'
              }
              icon={<FaSignOutAlt className="ml-2" />}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Close Button (Bottom) */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-4"
      >
        <Button
          title={'إغلاق'}
          onClick={() => setIsOpen(false)}
          style={
            'bg-white/20 hover:bg-white/30 text-white border border-white/10 w-full'
          }
        />
      </motion.div>
    </motion.div>
  );
}
