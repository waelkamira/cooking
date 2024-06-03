import React from 'react';

export default function Button({ style, title, onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={
        style
          ? style
          : style +
            '  text-md md:text-lg text-white rounded-full shadow-lg bg-five hover:bg-one p-2 w-full'
      }
    >
      {title}
    </button>
  );
}
