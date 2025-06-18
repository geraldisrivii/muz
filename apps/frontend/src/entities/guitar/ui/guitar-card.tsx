"use client"
import React from "react";
import { useAppContext } from "#/widgets/context";
import { Item } from "#/types";
import Link from "next/link";

interface GuitarCardProps extends Item {}

export function GuitarCard({
  id,
  imageUrl,
  category,
  title,
  price = 0, // Добавляем значение по умолчанию
}: GuitarCardProps) {
  const { 
    onAddToCart, 
    isItemInCart,
    addToFavorites,
    removeFromFavorites,
    isItemInFavorites
  } = useAppContext();

  const isAdded = isItemInCart(title);
  const isFavorite = isItemInFavorites(id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, imageUrl, category, title, price });
    }
  };

  const onAdd = () => {
    onAddToCart({ id, imageUrl, category, title, price });
  };

  // Добавляем проверку на undefined и преобразование к числу
  const safePrice = Number(price) || 0;
  const formattedPrice = safePrice.toLocaleString("ru-RU");

  return (
    <div className="card" key={id}>
      <Link href={`/tovar/${encodeURIComponent(title)}`}>
        <button className="img">
          <img src={imageUrl} alt="products" />
        </button>
      </Link>
      
      <button onClick={toggleFavorite} className="favorite-button">
        {isFavorite ? (
          <img className="img5" src="/icons/onFavourite.svg" alt="Remove from Favorites" />
        ) : (
          <img className="img5" src="/icons/favourite.svg" alt="Add to Favorites" />
        )}
      </button>
      
      <p>{category}</p>
      <a>{title}</a>
      <b>{formattedPrice} ₽.</b>
      <button className="add">
        {!isAdded ? (
          <button onClick={() => onAdd()}>
            <img className="img2" src="/pictures/toCart.svg" alt="Add to Cart" />
          </button>
        ) : (
          <Link href="/cart">
            <img className="img2" src="/pictures/inCart.svg" alt="In Cart" />
          </Link>
        )}
      </button>
    </div>
  );
}