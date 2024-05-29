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
            '  text-lg md:text-xl text-white rounded-lg shadow-lg bg-five hover:bg-one p-2 md:p-3 my-4 w-full'
      }
    >
      {title}
    </button>
  );
}
