"use client";

import React, { useState, createContext, useEffect, useCallback } from "react";
import axios from "axios";
import { Item, CartItem, ContextType } from "#/types";
import { createUseContext } from "#/shared/utils";
import Cookies from 'js-cookie'; 

export const CartContext = createContext<ContextType | null>(null);

const API_URL = "https://673876654eb22e24fca800c5.mockapi.io";

type Props = {
  children?: React.ReactNode;
};

export const Context: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Состояние для активной категории товаров
  const [activeCategory, setActiveCategory] = useState<string>("");

  const [favorites, setFavorites] = useState<Item[]>([]);

  // Преобразование данных корзины
  const processedItems =
    cartItems?.map((item) => ({
      ...item,
      price: Number(item.price),
    })) || [];

  useEffect(() => {
    const favoritesCookie = Cookies.get('favorites');
    if (favoritesCookie) {
      try {
        setFavorites(JSON.parse(favoritesCookie));
      } catch (error) {
        console.error('Ошибка при загрузке избранного:', error);
      }
    }
  }, []);

  // Сохранение избранного в куки при изменении
  useEffect(() => {
    if (favorites.length > 0) {
      Cookies.set('favorites', JSON.stringify(favorites), { expires: 30 });
    } else {
      Cookies.remove('favorites');
    }
  }, [favorites]);

  // Добавление в избранное
  const addToFavorites = useCallback((item: Item) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === item.id);
      return isAlreadyFavorite ? prev : [...prev, item];
    });
  }, []);

  // Удаление из избранного
  const removeFromFavorites = useCallback((id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  }, []);

  // Проверка, есть ли товар в избранном
  const isItemInFavorites = useCallback((id: string) => {
    return favorites.some(item => item.id === id);
  }, [favorites]);

  // Загрузка данных из API
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [itemsResponse, cartResponse] = await Promise.allSettled([
        axios.get(`${API_URL}/items`),
        axios.get(`${API_URL}/cart`),
      ]);

      if (itemsResponse.status === "fulfilled")
        setItems(itemsResponse.value.data);
      if (cartResponse.status === "fulfilled")
        setCartItems(cartResponse.value.data);
    } catch (err) {
      setError("Ошибка при загрузке данных!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  type NewItem = Omit<Item, "id">;

  // Добавление товара
  const addProduct = async (newProduct: NewItem): Promise<void> => {
    try {
      const { data } = await axios.post(`${API_URL}/items`, newProduct);
      setItems((prev) => [...prev, data]);
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
      // setError("Ошибка при добавлении товара.");
    }
  };

  // Обновление товара
  const updateProduct = async (
    id: string,
    updatedData: Partial<Item>
  ): Promise<void> => {
    try {
      const { data } = await axios.put(`${API_URL}/items/${id}`, updatedData);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    } catch (error) {
      setError("Ошибка при обновлении товара.");
    }
  };

  // Удаление товара
  const deleteProduct = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError("Ошибка при удалении товара.");
    }
  };

  const onAddToCart = useCallback(
    async (item: Item) => {
      try {
        const existingItem = cartItems.find(
          (cartItem) => cartItem.title === item.title
        );

        if (existingItem) {
          // Обновляем количество на сервере
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          await axios.put(
            `https://673876654eb22e24fca800c5.mockapi.io/cart/${existingItem.id}`,
            updatedItem
          );
          setCartItems((prevItems) =>
            prevItems.map((el) =>
              el.id === existingItem.id ? updatedItem : el
            )
          );
        } else {
          // Добавляем новый товар
          const newItem = { ...item, quantity: 1 };
          const { data } = await axios.post(
            "https://673876654eb22e24fca800c5.mockapi.io/cart",
            newItem
          );
          setCartItems((prevItems) => [...prevItems, data]);
        }
      } catch (error) {
        console.error("Ошибка при добавлении товара в корзину:", error);
      }
    },
    [cartItems]
  );

  // Функция для удаления товара из корзины
  const onRemoveItem = async (id: string): Promise<void> => {
    try {
      // Находим товар по ID
      const itemToUpdate = cartItems.find((item) => item.id === id);

      if (!itemToUpdate) return;

      if (itemToUpdate.quantity > 1) {
        // Если количество больше 1, уменьшаем количество
        const updatedItem = {
          ...itemToUpdate,
          quantity: itemToUpdate.quantity - 1,
        };
        await axios.put(
          `https://673876654eb22e24fca800c5.mockapi.io/cart/${id}`,
          updatedItem
        );

        // Обновляем локальное состояние
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? updatedItem : item))
        );
      } else {
        // Если количество равно 1, удаляем товар полностью
        await axios.delete(
          `https://673876654eb22e24fca800c5.mockapi.io/cart/${id}`
        );
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Ошибка при обновлении количества товара:", error);
    }
  };

  // Функция для проверки, добавлен ли товар в корзину
  const isItemInCart = (title: string): boolean => {
    return cartItems.some((cartItem) => cartItem.title === title);
  };

  const value = {
    items,
    cartItems,
    processedItems,
    addProduct,
    updateProduct,
    deleteProduct,
    onAddToCart,
    onRemoveItem,
    isItemInCart,
    activeCategory,
    setActiveCategory,
    loading,
    error,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isItemInFavorites,
  };

  return (
    <CartContext.Provider value={value}>
      {loading ? <span className="loader"></span> : children}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </CartContext.Provider>
  );
};

export const useAppContext = createUseContext(CartContext);
