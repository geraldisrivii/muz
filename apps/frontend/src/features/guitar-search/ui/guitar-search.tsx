import React from "react";

interface GuitarSearchProps {}

export const GuitarSearch = ({}: GuitarSearchProps) => {
  return (
    <>
      <div className="search">
        <input type="text" placeholder="Введите текст..."></input>

        <div className="searchbt">
          <img src="/icons/searchIcon.png" alt="search" />
          <button type="submit"></button>
        </div>
      </div>
    </>
  );
};
