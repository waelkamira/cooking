import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '../../../lib/Mongodb';
import { GoogleUser } from '../models/UserModelForGoogle';
import { RegisterGoogleUser } from '../registerGoogleUser/route';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  // adapter: MongoDBAdapter(clientPromise),

  providers: [
    //! google provider
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'your name', type: 'string', placeholder: 'your name' },
        email: {
          label: 'your email',
          type: 'string',
          placeholder: 'your email',
        },
        password: {
          label: 'your password',
          type: 'password',
          placeholder: 'your password',
        },
      },
      async authorize(credentials) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
        const email = credentials?.email;
        const password = credentials?.password;
        const user = await User.findOne({ email });
        // console.log('user', user);
        // console.log('credentials', credentials);
        if (!user) {
          throw new Error('الايميل المدخل غير موجود');
        }

        const checkPassword = await bcrypt.compare(password, user?.password);
        if (!checkPassword) {
          throw new Error('كلمة المرور غير صحيحة');
        }

        if (user && checkPassword) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  //?عند التسجيل عن طريق جوجل session نعرف فيها دالة لإرجاع ال  callbacks  ال
  //?لمعرفة ما إذا كان هذا المستخدم قد سجل أو لا اذا لم يسجل نقوم بتسجيله signIn و نعرف دالة أخر

  callbacks: {
    async session({ session }) {
      //?التي تم انشاوها من حساب جوجل المستخدم session هذه ال
      //? نستطيع اضافة خصائص أخرى للجلسة هنا
      return session;
    },

    //?هو بروفايل المستخدم الذي قام بالتسجيل او تسجيل الدخول عن طريق جوجل profile
    async signIn({ profile, credentials }) {
      try {
        console.log('profile', profile);

        // const userExist = await GoogleUser?.findOne({ email: profile?.email });
        const userExist1 = await User?.findOne({
          email: profile?.email || credentials?.email,
        });
        if (userExist1) {
          signIn({ redirectTo: '/' });
        }
        if (!userExist1) {
          const user = await User.create({
            email: profile?.email || credentials?.email,
            name: profile?.name || credentials?.name,
            image: profile?.picture || credentials?.image,
            password: credentials?.password,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV,
  pages: { signIn: '/login' },
};
