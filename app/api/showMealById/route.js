import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API
);

export async function GET(req) {
  try {
    // Parse query parameters for filtering
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const id = searchParams.get('id'); // Keep as string

    // Fetch the meal from Supabase
    let { data: meals, error } = await supabase
      .from('Meal')
      .select('*')
      .eq('id', id);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(meals), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

// import prisma from '../../../lib/PrismaClient';

// export async function GET(req) {
//   try {
//     // Parse query parameters for pagination and filtering
//     const url = new URL(req.url);
//     const searchParams = url.searchParams;
//     const id = searchParams.get('id'); // Keep as string

//     // التأكد من أن Prisma جاهزة
//     await prisma.$connect();

//     const meal = await prisma.meal?.findMany({
//       where: { id },
//     });

//     return new Response(JSON.stringify(meal), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 500,
//     });
//   }
// }
