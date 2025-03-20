import Link from 'next/link';
import React from 'react';

export default function Button({ style, title, onClick, path = '' }) {
  // console.log('style: ', style);
  return (
    <Link href={path} className="w-full">
      <button
        type="submit"
        onClick={onClick}
        className={
          style +
          ' my-2 sm:text-lg sm:p-2 text-sm p-1 px-2 text-nowrap bg-five select-none rounded-full w-full max-h-12 hover:text-white'
        }
      >
        {title}
      </button>
    </Link>
  );
}
