import Link from 'next/link';
import React from 'react';

export default function Button({ style, title, onClick, path = '' }) {
  return (
    <Link href={path} className="w-full">
      <button
        type="submit"
        onClick={onClick}
        className={
          (style ? 'text-lg p-2 ' + style : 'text-sm p-0.5') +
          ' btn my-3 text-white text-nowrap bg-five select-none rounded-full hover:scale-[101%] w-full max-h-12 hover:text-white hover:font-bold border border-white hover:border-0'
        }
      >
        {title}
      </button>
    </Link>
  );
}
