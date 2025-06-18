// import React, { useState, createContext, useEffect, useCallback } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// const API_URL = "https://673876654eb22e24fca800c5.mockapi.io";

// const Context = (props) => {
//   const [items, setItems] = useState([]); // Товары
//   const [cartItems, setCartItems] = useState([]); // Корзина
//   const [loading, setLoading] = useState(true); // Загрузка данных
//   const [error, setError] = useState(null); // Ошибки

//   // Преобразование данных корзины
//   const processedItems = cartItems?.map((item) => ({
//     ...item,
//     price: Number(item.price),
//   })) || [];

//   // Загрузка данных из API
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [itemsResponse, cartResponse] = await Promise.allSettled([
//         axios.get(`${API_URL}/items`),
//         axios.get(`${API_URL}/cart`),
//       ]);

//       if (itemsResponse.status === "fulfilled") setItems(itemsResponse.value.data);
//       if (cartResponse.status === "fulfilled") setCartItems(cartResponse.value.data);
//     } catch (err) {
//       setError("Ошибка при загрузке данных!");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Добавление товара
//   const addProduct = async (newProduct) => {
//     try {
//       const { data } = await axios.post(`${API_URL}/items`, newProduct);
//       setItems((prev) => [...prev, data]);
//     } catch (error) {
//       setError("Ошибка при добавлении товара.");
//     }
//   };

//   // Обновление товара
//   const updateProduct = async (id, updatedData) => {
//     try {
//       const { data } = await axios.put(`${API_URL}/items/${id}`, updatedData);
//       setItems((prev) =>
//         prev.map((item) => (item.id === id ? { ...item, ...data } : item))
//       );
//     } catch (error) {
//       setError("Ошибка при обновлении товара.");
//     }
//   };

//   // Удаление товара
//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/items/${id}`);
//       setItems((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       setError("Ошибка при удалении товара.");
//     }
//   };

//   // Добавление в корзину
//   const onAddToCart = useCallback((item) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((el) => el.title === item.title);
//       if (existingItem) {
//         const updated = { ...existingItem, quantity: existingItem.quantity + 1 };
//         axios.put(`${API_URL}/cart/${existingItem.id}`, updated);
//         return prev.map((el) => (el.id === existingItem.id ? updated : el));
//       } else {
//         const newItem = { ...item, quantity: 1 };
//         axios.post(`${API_URL}/cart`, newItem);
//         return [...prev, newItem];
//       }
//     });
//   }, []);

//   // Удаление из корзины
//   const onRemoveItem = useCallback((id) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((el) => el.id === id);
//       if (existingItem && existingItem.quantity > 1) {
//         const updated = { ...existingItem, quantity: existingItem.quantity - 1 };
//         axios.put(`${API_URL}/cart/${id}`, updated);
//         return prev.map((el) => (el.id === id ? updated : el));
//       } else {
//         axios.delete(`${API_URL}/cart/${id}`);
//         return prev.filter((el) => el.id !== id);
//       }
//     });
//   }, []);

//   // Проверка наличия товара в корзине
//   const isItemInCart = (title) => cartItems.some((cartItem) => cartItem.title === title);

//   const value = {
//     items,
//     cartItems,
//     processedItems,
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     onAddToCart,
//     onRemoveItem,
//     isItemInCart,
//     loading,
//     error,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {loading ? <p>Загрузка...</p> : props.children}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </CartContext.Provider>
//   );
// };

// export default Context;

// const onAddToCart = useCallback(async (item) => {
//     try {
//       const existingItem = cartItems.find((cartItem) => cartItem.title === item.title);

//       if (existingItem) {
//         // Обновляем количество на сервере
//         const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
//         await axios.put(`https://673876654eb22e24fca800c5.mockapi.io/cart/${existingItem.id}`, updatedItem);
//         setCartItems((prevItems) =>
//           prevItems.map((el) => (el.id === existingItem.id ? updatedItem : el))
//         );
//       } else {
//         // Добавляем новый товар
//         const newItem = { ...item, quantity: 1 };
//         const { data } = await axios.post('https://673876654eb22e24fca800c5.mockapi.io/cart', newItem);
//         setCartItems((prevItems) => [...prevItems, data]);
//       }
//     } catch (error) {
//       console.error("Ошибка при добавлении товара в корзину:", error);
//     }
//   }, [cartItems]);

//   // Функция для удаления товара из корзины
//   const onRemoveItem = async (id) => {
//     try {
//       // Находим товар по ID
//       const itemToUpdate = cartItems.find((item) => item.id === id);

//       if (!itemToUpdate) return;

//       if (itemToUpdate.quantity > 1) {
//         // Если количество больше 1, уменьшаем количество
//         const updatedItem = { ...itemToUpdate, quantity: itemToUpdate.quantity - 1 };
//         await axios.put(`https://673876654eb22e24fca800c5.mockapi.io/cart/${id}`, updatedItem);

//         // Обновляем локальное состояние
//         setCartItems((prevItems) =>
//           prevItems.map((item) => (item.id === id ? updatedItem : item))
//         );
//       } else {
//         // Если количество равно 1, удаляем товар полностью
//         await axios.delete(`https://673876654eb22e24fca800c5.mockapi.io/cart/${id}`);
//         setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//       }
//     } catch (error) {
//       console.error("Ошибка при обновлении количества товара:", error);
//     }
//   };

//   // Функция для проверки, добавлен ли товар в корзину
//   const isItemInCart = (title) => {
//     return cartItems.some((cartItem) => cartItem.title === title);
//   };

//   // Состояние для активной категории товаров
//   const [activeCategory, setActiveCategory] = useState('');
