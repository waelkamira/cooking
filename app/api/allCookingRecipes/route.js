import mongoose from 'mongoose';
import { Meal } from '../models/CreateMealModel';

const uri = process.env.NEXT_PUBLIC_MONGODB_MEALS; // Environment variable for meals DB

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      case 'PUT':
        await handlePut(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error connecting to meals database:', error);
    res.status(500).json({ error: 'Error connecting to meals database' });
  } finally {
    // Close connection after use (important)
    await mongoose.connection.close();
  }
}

async function handleGet(req, res) {
  const MealModel = mongoose.model('Meal', Meal.schema);
  const allCookingRecipes = await MealModel.find();

  res.status(200).json(allCookingRecipes.reverse());
}

async function handleDelete(req, res) {
  const { _id } = await req.body;

  const MealModel = mongoose.model('Meal', Meal.schema);
  const deleteRecipe = await MealModel.findByIdAndDelete(_id);

  res.status(200).json(deleteRecipe);
}

async function handlePut(req, res) {
  const {
    _id,
    usersWhoLikesThisRecipe,
    usersWhoPutEmojiOnThisRecipe,
    usersWhoPutHeartOnThisRecipe,
    ...rest
  } = await req.body;

  const MealModel = mongoose.model('Meal', Meal.schema);
  const updateLikes = await MealModel.findByIdAndUpdate(
    _id,
    {
      usersWhoLikesThisRecipe,
      usersWhoPutEmojiOnThisRecipe,
      usersWhoPutHeartOnThisRecipe,
      ...rest,
    },
    { new: true } // Return the updated document
  );

  res.status(200).json(updateLikes);
}

// import { mealsConnection } from '../../../lib/MongoDBConnections'; // Adjust the import path accordingly
// import { Meal } from '../models/CreateMealModel';

// // Ensure the connection is ready before using it
// async function ensureConnection() {
//   if (!mealsConnection.readyState) {
//     await mealsConnection.openUri(process.env.NEXT_PUBLIC_MONGODB_MEALS);
//   }
// }

// export async function GET() {
//   await ensureConnection();

//   // Using the existing connection to perform the operation
//   const MealModel = mealsConnection.model('Meal', Meal.schema);
//   const allCookingRecipes = await MealModel.find();

//   return new Response(JSON.stringify(allCookingRecipes.reverse()), {
//     status: 200,
//   });
// }

// export async function DELETE(req) {
//   await ensureConnection();

//   const { _id } = await req.json();

//   // Using the existing connection to perform the operation
//   const MealModel = mealsConnection.model('Meal', Meal.schema);
//   const deleteRecipe = await MealModel.findByIdAndDelete({ _id });

//   return new Response(JSON.stringify(deleteRecipe), { status: 200 });
// }

// export async function PUT(req) {
//   await ensureConnection();

//   const {
//     _id,
//     usersWhoLikesThisRecipe,
//     usersWhoPutEmojiOnThisRecipe,
//     usersWhoPutHeartOnThisRecipe,
//     ...rest
//   } = await req.json();

//   // Using the existing connection to perform the operation
//   const MealModel = mealsConnection.model('Meal', Meal.schema);
//   const updateLikes = await MealModel.findByIdAndUpdate(
//     { _id },
//     {
//       usersWhoLikesThisRecipe,
//       usersWhoPutEmojiOnThisRecipe,
//       usersWhoPutHeartOnThisRecipe,
//       ...rest,
//     },
//     { new: true } // Return the updated document
//   );

//   return new Response(JSON.stringify(updateLikes), { status: 200 });
// }

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
