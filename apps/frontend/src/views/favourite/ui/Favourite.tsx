"use client"
import React from 'react';
import Link from 'next/link';
import { useAppContext } from '#/widgets/context';
import { GuitarCard } from '#/entities/guitar';
import './favourite.css';

export function FavoritesPage() {
  const { favorites, removeFromFavorites } = useAppContext();

  if (!favorites) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Избранные товары</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>В избранном пока нет товаров</p>
          <Link href="/catalog">
            <button className="btn-primary">Перейти в каталог</button>
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={`fav-${item.id}`} className="favorite-item">
              <GuitarCard 
                id={item.id}
                imageUrl={item.imageUrl}
                category={item.category}
                title={item.title}
                price={item.price}
              />
              {/* <button 
                onClick={() => removeFromFavorites(item.id)}
                className="remove-favorite"
              >
                Удалить из избранного
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;