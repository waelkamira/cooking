import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/Mongodb';

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  adapter: MongoDBAdapter(clientPromise),

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
        console.log('user', user);
        console.log('credentials', credentials);
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

  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV,
  pages: { signIn: '/login' },
};
