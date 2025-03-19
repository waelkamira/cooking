import axios from 'axios';
import Papa from 'papaparse';
import NodeCache from 'node-cache';

// إعداد التخزين المؤقت
const cache = new NodeCache({
  stdTTL: 60 * 10, // مدة التخزين المؤقت 10 دقائق
  checkperiod: 60,
  maxKeys: 1000,
});

function createCacheKey(params) {
  return `meals_${JSON.stringify(params)}`;
}

function invalidateCacheByPrefix(prefix) {
  const keys = cache.keys();
  keys.forEach((key) => {
    if (key.startsWith(prefix)) {
      cache.del(key);
    }
  });
}

export async function GET(req) {
  try {
    // إعداد الرابط للملف CSV
    const csvUrl =
      'https://raw.githubusercontent.com/waelkamira/cooking_csv/refs/heads/main/ar_recipes.csv';

    // تحليل المعاملات الواردة من الطلب
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 8; // تم تعيين الحد الأقصى للنتائج هنا
    const mealName = searchParams.get('mealName') || '';
    const selectedValue = searchParams.get('selectedValue') || '';
    const skip = (page - 1) * limit;

    // إنشاء مفتاح التخزين المؤقت
    const cacheKey = createCacheKey({ page, limit, mealName, selectedValue });

    // محاولة الحصول على البيانات من التخزين المؤقت
    let meals = cache.get(cacheKey);
    if (!meals) {
      // جلب البيانات من الرابط
      const response = await axios.get(csvUrl);
      const csvData = response.data;

      // تحليل البيانات باستخدام PapaParse
      const parsedData = Papa.parse(csvData, {
        header: true, // تحليل الرؤوس كأسماء أعمدة
        skipEmptyLines: true, // تخطي الصفوف الفارغة
      });

      // البيانات المحللة
      let allMeals = parsedData.data;

      // تصفية البيانات بناءً على معلمات البحث
      if (mealName) {
        allMeals = allMeals.filter(
          (meal) =>
            meal.mealName &&
            meal.mealName.toLowerCase().includes(mealName.toLowerCase())
        );
      }

      if (selectedValue) {
        allMeals = allMeals.filter(
          (meal) =>
            meal.selectedValue &&
            meal.selectedValue
              .toLowerCase()
              .includes(selectedValue.toLowerCase())
        );
      }

      // تقسيم البيانات للصفحة المطلوبة
      meals = allMeals.slice(skip, skip + limit);

      // تخزين البيانات في التخزين المؤقت
      cache.set(cacheKey, meals);
    }

    // مراقبة الأداء
    console.log('Cache Stats:', cache.getStats());

    return new Response(JSON.stringify(meals), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
