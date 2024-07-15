import { mealsConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
import { Meal } from '../models/CreateMealModel';

<<<<<<< HEAD
// Ensure the connection is ready before using it
=======
>>>>>>> 452540e6f5c7d4d1f1d9dbf2d365e824f206700b
async function ensureConnection() {
  if (!mealsConnection.readyState) {
    await mealsConnection.openUri(process.env.NEXT_PUBLIC_MONGODB_MEALS);
  }
}

export async function GET() {
  await ensureConnection();
<<<<<<< HEAD
=======

  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const allCookingRecipes = await MealModel.find();

  return new Response(JSON.stringify(allCookingRecipes.reverse()), {
    status: 200,
  });
}

export async function DELETE(req) {
  await ensureConnection();

  const { _id } = await req.json();

  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const deleteRecipe = await MealModel.findByIdAndDelete({ _id });

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

  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const updateLikes = await MealModel.findByIdAndUpdate(
    { _id },
    {
      usersWhoLikesThisRecipe,
      usersWhoPutEmojiOnThisRecipe,
      usersWhoPutHeartOnThisRecipe,
      ...rest,
    },
    { new: true }
  );

  return new Response(JSON.stringify(updateLikes), { status: 200 });
}

// import { mealsConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
// import { Meal } from '../models/CreateMealModel';
>>>>>>> 452540e6f5c7d4d1f1d9dbf2d365e824f206700b

  // Using the existing connection to perform the operation
  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const allCookingRecipes = await MealModel.find();

  return new Response(JSON.stringify(allCookingRecipes.reverse()), {
    status: 200,
  });
}

export async function DELETE(req) {
  await ensureConnection();

  const { _id } = await req.json();

  // Using the existing connection to perform the operation
  const MealModel = mealsConnection.model('Meal', Meal.schema);
  const deleteRecipe = await MealModel.findByIdAndDelete({ _id });

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

  return new Response(JSON.stringify(updateLikes), { status: 200 });
}

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
