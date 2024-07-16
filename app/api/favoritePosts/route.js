// pages/api/favorites.js
import initConnections from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
import { Favorite } from '../models/FavoritePosts'; // Adjust the import path accordingly
import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions/route'; // Adjust the import path accordingly

let connections;

async function getFavoritesConnection() {
  if (!connections) {
    connections = await initConnections();
  }
  return connections.favoritesConnection;
}

// Ensure the connection is ready before using it
async function ensureConnection() {
  const favoritesConnection = await getFavoritesConnection();
  if (!favoritesConnection.readyState) {
    await favoritesConnection.openUri(
      process.env.NEXT_PUBLIC_MONGODB_FAVORITES
    );
  }
}

export async function POST(req) {
  await ensureConnection();

  const data = await req.json();
  const favoritesConnection = await getFavoritesConnection();
  const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
  const FavoritePost = await FavoriteModel.create({ ...data });

  return new Response(JSON.stringify(FavoritePost), { status: 201 });
}

export async function DELETE(req) {
  await ensureConnection();

  const data = await req.json();
  const favoritesConnection = await getFavoritesConnection();
  const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
  const deleteFavoritePost = await FavoriteModel.findByIdAndDelete(data?._id);

  return new Response(JSON.stringify(deleteFavoritePost), { status: 200 });
}

export async function GET() {
  await ensureConnection();

  const session = await getServerSession(authOptions);
  const favoritedByUser = session?.user?.email;

  const favoritesConnection = await getFavoritesConnection();
  const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
  const favoritePosts = await FavoriteModel.find({ favoritedByUser });

  return new Response(JSON.stringify(favoritePosts), { status: 200 });
}

// import { favoritesConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
// import { Favorite } from '../models/FavoritePosts';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../authOptions/route';

// // Ensure the connection is ready before using it
// async function ensureConnection() {
//   if (!favoritesConnection.readyState) {
//     await favoritesConnection.openUri(
//       process.env.NEXT_PUBLIC_MONGODB_FAVORITES
//     );
//   }
// }

// export async function POST(req) {
//   await ensureConnection();

//   const data = await req.json();
//   const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
//   const FavoritePost = await FavoriteModel.create({ ...data });

//   return new Response(JSON.stringify(FavoritePost), { status: 201 });
// }

// export async function DELETE(req) {
//   await ensureConnection();

//   const data = await req.json();
//   const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
//   const deleteFavoritePost = await FavoriteModel.findByIdAndDelete(data?._id);

//   return new Response(JSON.stringify(deleteFavoritePost), { status: 200 });
// }

// export async function GET() {
//   await ensureConnection();

//   const session = await getServerSession(authOptions);
//   const favoritedByUser = session?.user?.email;

//   const FavoriteModel = favoritesConnection.model('Favorite', Favorite.schema);
//   const favoritePosts = await FavoriteModel.find({ favoritedByUser });

//   return new Response(JSON.stringify(favoritePosts), { status: 200 });
// }

// import mongoose from 'mongoose';
// import { Favorite } from '../models/FavoritePosts';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../authOptions/route';

// export async function POST(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const data = await req.json();
//   //   console.log('data from favoritePosts', data);
//   const FavoritePost = await Favorite.create({ ...data });
//   return Response.json(FavoritePost);
// }

// export async function DELETE(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const data = await req.json();
//   const deleteFavoritePost = await Favorite.findByIdAndDelete(data?._id);
//   return Response.json(deleteFavoritePost);
// }

// export async function GET() {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB);
//   const session = await getServerSession(authOptions);
//   const favoritedByUser = session?.user?.email;
//   // console.log('favoritedByUser', favoritedByUser);
//   const favoritePosts = await Favorite.find({ favoritedByUser });
//   // console.log('favoritePosts', favoritePosts);
//   return Response.json(favoritePosts);
// }
