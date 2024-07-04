import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/Mongodb';
import { signIn } from 'next-auth/react';

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

  session: {
    strategy: 'jwt',
    // Update this with any relevant session options like refresh JWTs
  },

  // Callbacks to handle user authentication and session management
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account.provider === 'google') {
  //       // Check for existing user with Google email
  //       const existingUser = await User.findOne({ email: profile.email });
  //       if (!existingUser) {
  //         // Create new user if doesn't exist
  //         await User.create({
  //           email: profile.email,
  //           name: profile.name,
  //           image: profile.picture,
  //           googleId: profile.sub,
  //         });
  //       }
  //       return true;
  //     }
  //     return true;
  //   },

  //   async session({ session, token }) {
  //     session.user.id = token.id;
  //     return session;
  //   },

  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Custom logic on sign-in
      if (account.provider === 'google') {
        // Check for existing user with Google email
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          // Create new user if doesn't exist
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            googleId: profile.sub,
          });
        }
        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, user, token }) {
      // Attach additional properties to the session object
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Handle the JWT token
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV,
  pages: { signIn: '/login' },
};
