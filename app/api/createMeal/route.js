// pages/api/meals.js
import initConnections from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
import { Meal } from '../models/CreateMealModel'; // Adjust the import path accordingly

let connections;

async function getMealsConnection() {
  if (!connections) {
    connections = await initConnections();
  }
  return connections.mealsConnection;
}

// Ensure the connection is ready before using it
async function ensureConnection() {
  const mealsConnection = await getMealsConnection();
  if (!mealsConnection.readyState) {
    await mealsConnection.openUri(process.env.NEXT_PUBLIC_MONGODB_MEALS);
  }
}

export async function POST(req) {
  await ensureConnection();

  const data = await req.json();
  const mealsConnection = await getMealsConnection();
  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const meal = await MealModel.create({ ...data });

  return new Response(JSON.stringify(meal), { status: 201 });
}

// import { mealsConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
// import { Meal } from '../models/CreateMealModel';

// export async function POST(req) {
//   const data = await req.json();

//   // Ensure the mealsConnection is ready to be used
//   if (!mealsConnection.readyState) {
//     await mealsConnection.openUri(process.env.NEXT_PUBLIC_MONGODB_MEALS);
//   }

//   // Using the existing connection to perform the operation
//   const MealModel = mealsConnection.model('Meal', Meal.schema);
//   const meal = await MealModel.create({ ...data });

//   return new Response(JSON.stringify(meal), { status: 201 });
// }

// import mongoose from 'mongoose';
// import { Meal } from '../models/CreateMealModel';
// export async function POST(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB_MEALS);
//   const data = await req.json();
//   // console.log('data', data);
//   const meal = await Meal.create({ ...data });
//   return Response.json(meal);
// }
