import mongoose from 'mongoose';
import { Meal } from '../models/CreateMealModel';

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const allCookingRecipes = await Meal?.find();
  return Response.json(allCookingRecipes.reverse());
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const { _id } = await req.json();
  const deleteRecipe = await Meal?.findByIdAndDelete({ _id });
  return Response.json(deleteRecipe);
}
export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const { _id, numberOfLikes, numberOfEmojis, numberOfHearts } =
    await req.json();
  // console.log(
  //   'this is _id',
  //   '***************************************************',
  //   _id,
  //   numberOfLikes,
  //   numberOfEmojis,
  //   numberOfHearts
  // );
  const updateLikes = await Meal?.findByIdAndUpdate(
    { _id },
    {
      numberOfLikes: numberOfLikes,
      numberOfEmojis: numberOfEmojis,
      numberOfHearts: numberOfHearts,
    }
  );
  // console.log(updateLikes);
  return Response.json(updateLikes);
}
