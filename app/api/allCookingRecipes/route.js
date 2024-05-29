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
