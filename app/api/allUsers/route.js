import { getUsersConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
import { User } from '../models/UserModel';

async function ensureConnection() {
  const usersConnection = await getUsersConnection();
  return usersConnection;
}

export async function GET() {
  const usersConnection = await ensureConnection();

  const UserModel = usersConnection.model('User', User.schema);
  const users = await UserModel.find();

  return new Response(JSON.stringify(users), { status: 200 });
}

export async function DELETE(req) {
  const usersConnection = await ensureConnection();

  const { email } = await req.json();

  const UserModel = usersConnection.model('User', User.schema);
  const deleteUser = await UserModel.findOneAndDelete({ email });

  return new Response(JSON.stringify(deleteUser), { status: 200 });
}

// import mongoose from 'mongoose';
// import { User } from '../models/UserModel';

// export async function GET() {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const users = await User.find();
//   return Response.json(users);
// }

// export async function DELETE(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const { email } = await req.json();
//   const deleteUser = await User.findOneAndDelete({ email });
//   return Response.json(deleteUser);
// }
