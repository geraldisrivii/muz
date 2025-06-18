"use client";
import React, { useContext, useState, useEffect } from "react";

import "./catalog-items.css";
import axios from "axios";
import { GuitarCard } from "#/entities/guitar";
import { CartContext, useAppContext } from "#/widgets/context";

export const CatalogItems = () => {
  const { items } = useAppContext();
  const { cartItems, onAddToCart } = useAppContext();
  const { activeCategory, setActiveCategory } = useAppContext();

  // Фильтрация карточек по категории
  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  return (
    <section className="Products">
      <div className="container">
        <span>Популярные товары</span>
        {/* Карточки товаров */}
        <div className="tovary">
          {filteredItems.map((item) => (
            <GuitarCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
