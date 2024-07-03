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
    maxAge: 30 * 24 * 60 * 60, // Set session expiration to 30 days
    // Update this with any relevant session options like refresh JWTs
  },

  // Callbacks to handle user authentication and session management
  callbacks: {
    async signIn({ user, account, profile }) {
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
      }
      return true;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV,
  pages: { signIn: '/login' },
};

// import mongoose from 'mongoose';
// import { User } from '../models/UserModel';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import bcrypt from 'bcrypt';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '../../../lib/Mongodb';
// import { redirect } from 'next/navigation';
// import { signIn } from 'next-auth/react';

// // Ensure database connection
// mongoose.connect(process.env.NEXT_PUBLIC_MONGODB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
//         const user = await User.findOne({ email: credentials.email });
//         if (user && bcrypt.compareSync(credentials.password, user.password)) {
//           return user;
//         } else {
//           throw new Error('Invalid email or password');
//         }
//       },
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   secret: process.env.NEXT_PUBLIC_SECRET,
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // Set session expiration to 30 days
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account.provider === 'google') {
//         const existingUser = await User.findOne({ email: profile.email });
//         if (!existingUser) {
//           await User.create({
//             email: profile.email,
//             name: profile.name,
//             image: profile.picture,
//             googleId: profile.sub,
//           });
//         }
//       }
//       return true;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
//   debug: process.env.NODE_ENV === 'development',
// };
