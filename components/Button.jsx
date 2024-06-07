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
          '  my-3 text-white text-nowrap bg-five hover:bg-one rounded-full hover:scale-[101%] w-full '
        }
      >
        {title}
      </button>
    </Link>
  );
}
