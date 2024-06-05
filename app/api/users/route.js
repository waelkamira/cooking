import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions/route';
export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const { email, image } = await req.json();
  // console.log(email, image);
  const user = await User.findOneAndUpdate({ email }, { image: image });

  // console.log('find user', user);

  return Response.json(user);
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = await User.find({ email });
  return Response.json(user);
}

export async function GetAllUsers() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const users = await User.find();
  return Response.json(users);
}
