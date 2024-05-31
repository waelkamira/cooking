'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import SelectComponent from './SelectComponent';
import { inputsContext } from '../components/Context';
import { useSession } from 'next-auth/react';

export default function CookingForm({ setIsVisible, isVisible }) {
  const session = useSession();
  const userName = session?.data?.user?.name;
  const userImage = session?.data?.user?.image;
  const [errors, setErrors] = useState({
    mealName: false,
    mealNameErrorMessage: 'حقل المقادير مطلوب',
    selectedValue: false,
    selectedValueErrorMessage: 'اختيار النوع مطلوب',
    ingredients: false,
    ingredientsErrorMessage: 'حقل المقادير مطلوب',
    theWay: false,
    theWayErrorMessage: 'حقل الطريقة مطلوب',
  });

  const [inputs, setInputs] = useState({
    mealName: '',
    selectedValue: '',
    image: '',
    ingredients: '',
    theWay: '',
    advise: '',
    link: '',
  });
  const { data, dispatch } = useContext(inputsContext);
  console.log('data?.modelName', data?.modelName);
  useEffect(() => {
    setInputs({
      ...inputs,
      selectedValue: data?.selectedValue?.label,
      image: data?.image,
    });
  }, [data?.selectedValue, data?.image]);

  if ((isVisible = false)) {
    setErrors({ mealName: false, ingredients: false, theWay: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      inputs.mealName &&
      inputs.ingredients &&
      inputs.theWay &&
      inputs.selectedValue &&
      inputs.image &&
      userImage &&
      userName
    ) {
      try {
        const response = await fetch('/api/createMeal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...inputs, userName, userImage }),
        });

        if (response.ok) {
          console.log('success');
          setIsVisible(false);
          toast.success('تم إنشاء وصفة جديدة');
          dispatch({ type: ' RECIPES', payload: inputs });
        } else {
          console.log('something went wrong!');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!inputs.image) {
        setErrors({ ...errors, image: true });
        toast.error('صورة الطبخة مطلوبة');
        dispatch({
          type: 'IMAGE_ERROR',
          payload: { imageError: true, message: 'صورة الطبخة مطلوبة' },
        });
      } else if (!inputs.mealName) {
        setErrors({ ...errors, mealName: true });
        toast.error('اسم الطبخة مطلوب');
      } else if (!inputs.selectedValue) {
        setErrors({ ...errors, selectedValue: true });
        toast.error('اختيار النوع مطلوب');
      } else if (!inputs.ingredients) {
        setErrors({ ...errors, ingredients: true });
        toast.error('حقل المقادير مطلوب');
      } else if (!inputs.theWay) {
        setErrors({ ...errors, theWay: true });
        toast.error('حقل الطريقة مطلوب');
      }
    }
  }
  return (
    <div className="w-full p-8 h-[1110px] ">
      <form
        className="flex flex-col justify-center items-start h-fit w-full mt-4 "
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <div className="flex flex-col gap-8 md:flex-row w-full ">
            <div className="flex flex-col items-center justify-center w-full my-2 ">
              {errors.mealName && (
                <h1 className="text-one text-2xl text-end my-2 w-full animate-bounce font-bold opacity-0">
                  اسم الطبخة مطلوب
                </h1>
              )}
              {errors.selectedValue && (
                <h1 className="text-one text-2xl text-end my-2 w-full animate-bounce font-bold">
                  اختيار الصنف مطلوب
                </h1>
              )}
              <div className="flex items-center gap-2 w-full justify-end">
                <h1 className="text-right text-xl text-white font-bold my-2">
                  :اختر الصنف
                </h1>
                <h1 className="text-one font-bold text-2xl">#</h1>
              </div>

              <SelectComponent />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              {errors.selectedValue && (
                <h1 className="text-one text-2xl text-end my-2 w-full animate-bounce font-bold opacity-0">
                  اختيار الصنف مطلوب
                </h1>
              )}
              {errors.mealName && (
                <h1 className="text-one text-2xl text-end my-2 w-full animate-bounce font-bold">
                  اسم الطبخة مطلوب
                </h1>
              )}
              <div className="flex items-center gap-2 w-full justify-end">
                <h1 className="text-right text-xl text-white font-bold my-2">
                  :اسم الطبخة
                </h1>
                <h1 className="text-one font-bold text-2xl">#</h1>
              </div>

              <input
                value={inputs.mealName}
                onChange={(e) =>
                  setInputs({ ...inputs, mealName: e.target.value })
                }
                type="text"
                id="اسم الطبخة"
                name="اسم الطبخة"
                placeholder="... شاورما الدجاج"
                autoFocus
                className="text-right w-full p-2 rounded-lg text-lg outline-2 focus:outline-one h-10"
              />
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <div className="relative w-full h-28">
            <Image
              src={'/vege1.png'}
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
          {errors.ingredients && (
            <h1 className="text-one text-2xl text-end my-2 w-full animate-bounce font-bold">
              حقل المقادير مطلوب
            </h1>
          )}
          <div className="flex items-center gap-2 w-full justify-end">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              :المقادير
            </h1>
            <h1 className="text-one font-bold text-2xl">#</h1>
          </div>

          <textarea
            value={inputs.ingredients}
            onChange={(e) =>
              setInputs({ ...inputs, ingredients: e.target.value })
            }
            dir="rtl"
            rows={'6'}
            name="المقادير"
            id="المقادير"
            className="scrollBar text-right w-full p-2 rounded-lg text-xl h-36 outline-2 focus:outline-one"
            placeholder={`١- خبز توست حسب الرغبة
٢- جبن شرائح
٣- ٥ بيضات مخفوقة
٤- ملح وفلفل
٥- بقدونس مفروم ناعماً للتزيين
                `}
          ></textarea>
        </div>
        <div className="w-full my-4">
          <div className="relative w-full h-28">
            <Image
              src={'/spices.png'}
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
          {errors.theWay && (
            <h1 className="text-one text-2xl text-end my-2 w-full animate-bounce font-bold">
              حقل الطريقة مطلوب
            </h1>
          )}
          <div className="flex items-center gap-2 w-full justify-end">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              :الطريقة
            </h1>
            <h1 className="text-one font-bold text-2xl">#</h1>
          </div>

          <textarea
            value={inputs.theWay}
            onChange={(e) => setInputs({ ...inputs, theWay: e.target.value })}
            dir="rtl"
            rows={'6'}
            name="المقادير"
            id="المقادير"
            placeholder={`١- يخفق البيض مع الملح والفلفل
٢- يوضع في آل خبزة شريحة من الجبن ثم تغطى بقطعة أخرى من الخبز على شكل
سندويتشات ثم تقطع على شكل مثلثات
٣- تغمس السندويتشات في البيض المخفوق من الجهتين وتوضع في الزيت وتضاف
الزبدة مع الزيت لإعطاء نكهة طيبة وذلك حسب الرغبة
٤- تحمر على نار هادئة إلى متوسطة
٥- توضع على شبك حتى تصفى من الزيت أو على ورق نشاف وتقدم مع الحليب أو
العصير
                `}
            className="text-right w-full p-2 rounded-lg text-xl h-36 outline-2 focus:outline-one"
          ></textarea>
        </div>
        <div className="w-full my-4">
          <div className="flex items-center gap-2 w-full justify-end">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              :نصائح لتحضير الطبخة
            </h1>
            <h1 className="text-one font-bold text-2xl">#</h1>
          </div>
          <textarea
            value={inputs.advise}
            onChange={(e) => setInputs({ ...inputs, advise: e.target.value })}
            dir="rtl"
            rows={'6'}
            name="المقادير"
            id="المقادير"
            placeholder={`اكتب بعض النصائح عن تحضير هذه الطبخة
                `}
            className="text-right w-full p-2 rounded-lg text-xl h-24 outline-2 focus:outline-one"
          ></textarea>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 w-full justify-end">
            {' '}
            <h1 className="text-right text-xl text-white font-bold my-2">
              أضف رابط الطبخة من يوتيوب
            </h1>
            <h1 className="text-one font-bold text-2xl">#</h1>
          </div>
          <input
            value={inputs.link}
            onChange={(e) => setInputs({ ...inputs, link: e.target.value })}
            type="text"
            id="رابط الفيديو"
            name="رابط الفيديو"
            placeholder="... رابط الفيديو"
            className="text-right w-full p-2 rounded-lg text-xl outline-2 focus:outline-one"
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center sm:flex-row-reverse gap-4 my-8 rounded-lg">
          <div className="w-full bg-four p-4 rounded-lg mb-4 border border-one">
            <h1 className="text-white font-sans w-full text-end md:text-xl">
              <span className="text-one md:text-xl font-bold w-full">
                {' '}
                لا تقم بنسخ الرابط مباشرة لأنه لن يعمل
              </span>
            </h1>
            <pre className="text-white font-sans w-full text-end md:text-xl select-none">
              لوضع الرابط من يوتيوب بشكل صحيح اتبع الخطوات التالية
            </pre>
            <pre className="text-white font-sans w-full text-end md:text-xl select-none">
              قم بالضغط على زر مشاركة أسفل الفيديو{' '}
            </pre>{' '}
            <pre className="text-white font-sans w-full text-end md:text-xl select-none">
              embed اضغط على كلمة{' '}
            </pre>
            <pre className="text-white font-sans w-full text-end md:text-xl select-none">
              نسخ copy ثم اضغط على كلمة
            </pre>
            <pre className="text-white font-sans w-full text-end md:text-xl select-none">
              ثم الصق الرابط في حقل رابط الفيديو
            </pre>
          </div>
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image src={'/info.png'} fill alt="photo" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-around items-center gap-8 w-full my-12">
          <button
            className="bg-five rounded-lg text-white shadow-lg hover:bg-one text-xl py-2 px-16 w-full"
            onClick={() => setIsVisible(false)}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-five rounded-lg text-white shadow-lg hover:bg-one text-xl py-2 px-16 w-full"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
}
