import Link from 'next/link';
import React from 'react';

export default function Button({ style, title, onClick, path = '' }) {
  return (
    <Link href={path}>
      <button
        type="submit"
        onClick={onClick}
        className={
          (style ? 'text-lg p-2' : 'text-sm p-0.5') +
          ' btn my-3 text-white text-nowrap bg-five hover:bg-one rounded-lg hover:scale-[101%] w-full hover:text-white hover:font-bold hover:outline hover:outline-one'
        }
      >
        {title}
      </button>
    </Link>
  );
}
