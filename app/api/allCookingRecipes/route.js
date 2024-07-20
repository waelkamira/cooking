const initializeConnections = require('../../../lib/MongoDBConnections');

import { getServerSession } from 'next-auth';
// import { mealsConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
import { Meal } from '../models/CreateMealModel';
import { authOptions } from '../authOptions/route';
import NodeCache from 'node-cache';
const { mealsConnection } = await initializeConnections();

// إنشاء كاش بوقت انتهاء محدد
const cache = new NodeCache({ stdTTL: 600 }); // التخزين المؤقت لمدة 10 دقائق

// Ensure the connection is ready before using it
async function ensureConnection() {
  if (!mealsConnection.readyState) {
    await mealsConnection.openUri(process.env.NEXT_PUBLIC_MONGODB_MEALS);
  }
}

export async function GET(req) {
  await ensureConnection();

  // Parse query parameters for pagination and email filtering and selectedValue filtering
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || '';
  const selectedValue = searchParams.get('selectedValue');

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  // Build the query object
  const query = {};
  if (email && !selectedValue) {
    query.createdBy = email;
  }
  if (selectedValue) {
    query.selectedValue = selectedValue;
  }

  // Create a cache key based on the query parameters
  const cacheKey = `${JSON.stringify(query)}_${page}_${limit}`;

  // Check if the data is already in the cache
  let allCookingRecipes = cache.get(cacheKey);
  if (!allCookingRecipes) {
    // Using the existing connection to perform the operation
    const MealModel = mealsConnection.model('Meal', Meal.schema);
    allCookingRecipes = await MealModel.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    // Store the result in the cache
    cache.set(cacheKey, allCookingRecipes);
  }

  return new Response(JSON.stringify(allCookingRecipes), {
    status: 200,
  });
}

export async function DELETE(req) {
  await ensureConnection();

  const { _id } = await req.json();

  // Using the existing connection to perform the operation
  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const deleteRecipe = await MealModel.findByIdAndDelete({ _id });

  // Clear the cache since the data has changed
  cache.flushAll();

  return new Response(JSON.stringify(deleteRecipe), { status: 200 });
}

export async function PUT(req) {
  await ensureConnection();

  const {
    _id,
    usersWhoLikesThisRecipe,
    usersWhoPutEmojiOnThisRecipe,
    usersWhoPutHeartOnThisRecipe,
    ...rest
  } = await req.json();

  // Using the existing connection to perform the operation
  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const updateLikes = await MealModel.findByIdAndUpdate(
    { _id },
    {
      usersWhoLikesThisRecipe,
      usersWhoPutEmojiOnThisRecipe,
      usersWhoPutHeartOnThisRecipe,
      ...rest,
    },
    { new: true } // Return the updated document
  );

  // Clear the cache since the data has changed
  cache.flushAll();

  return new Response(JSON.stringify(updateLikes), { status: 200 });
}

// //! شغال لكن لا يحدث في البرودكشن

// import axios from 'axios';

// export async function GET(req) {
//   // 1. Retrieve API key securely:
//   const { NEXT_PUBLIC_MONGODB_ID_MEALS } = process.env;

//   if (!NEXT_PUBLIC_MONGODB_ID_MEALS) {
//     return new Response('Missing environment variable', { status: 500 });
//   }

//   // 3. Construct API request URL :
//   const url = `${process.env.NEXT_PUBLIC_MONGODB_DATA_API_URL_MEALS}/action/find`; // Assuming stored as an environment variable

//   // 4. Construct request body:
//   const body = JSON.stringify({
//     dataSource: 'Cluster0', // Replace with your actual data source name
//     database: 'test',
//     collection: 'meals',
//   });

//   // 5. Fetch data using Axios:

//   const config = {
//     method: 'post',
//     url,
//     data: body,
//     headers: {
//       Authorization: `Bearer ${NEXT_PUBLIC_MONGODB_ID_MEALS}`,
//       'Content-Type': 'application/json',
//     },
//   };

//   const response = await axios(config);
//   // console.log(
//   //   'res ********************************************',
//   //   response?.data
//   // );

//   return new Response(JSON.stringify(response?.data?.documents.reverse()));
// }

// // pages/api/users.js

// export async function GET() {
//   const apiKey = '669a4d49bec50c1daac43a29';
//   // 3. Construct API Request URL and Body:
//   const url = `https://eu-central-1.aws.data.mongodb-api.com/app/data-wbnnweq/endpoint/data/v1/action/find`;
//   const body = JSON.stringify({
//     dataSource: 'Cluster0', // Your data source
//     database: 'test', // Your database name
//     collection: 'meals', // Your collection name
//     filter: {}, // Your query filter if any
//   });

//   // 4. Fetch Data and Handle Errors:

//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//   });
//   console.log('response *****************************************', response);

//   return Response.json(response);
// }

//*********************************************************************************** */
// import mongoose from 'mongoose';
// import { Meal } from '../models/CreateMealModel';

// export async function GET() {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB_MEALS);
//   const allCookingRecipes = await Meal?.find();
//   return Response.json(allCookingRecipes.reverse());
// }

// export async function DELETE(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB_MEALS);
//   const { _id } = await req.json();
//   const deleteRecipe = await Meal?.findByIdAndDelete({ _id });
//   return Response.json(deleteRecipe);
// }
// export async function PUT(req) {
//   await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGODB_MEALS);
//   const {
//     _id,
//     usersWhoLikesThisRecipe,
//     usersWhoPutEmojiOnThisRecipe,
//     usersWhoPutHeartOnThisRecipe,
//     ...rest
//   } = await req.json();

//   const updateLikes = await Meal?.findByIdAndUpdate(
//     { _id },
//     {
//       usersWhoLikesThisRecipe: usersWhoLikesThisRecipe,
//       usersWhoPutEmojiOnThisRecipe: usersWhoPutEmojiOnThisRecipe,
//       usersWhoPutHeartOnThisRecipe: usersWhoPutHeartOnThisRecipe,
//       ...rest,
//     }
//   );
//   // console.log(updateLikes);
//   return Response.json(updateLikes);
// }
