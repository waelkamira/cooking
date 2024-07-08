// pages/editRecipe/generateStaticParams.js
export async function generateStaticParams() {
  const res = await fetch(
    'https://bahigarecipes.wuaze.com/api/allCookingRecipes'
  );
  const recipes = await res.json();

  const ids = recipes.map((recipe) => recipe._id);

  return ids.map((id) => {
    return {
      params: { id },
    };
  });
}
