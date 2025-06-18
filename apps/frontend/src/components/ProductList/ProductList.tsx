// import React, { useState } from 'react';
// import api from '../../services/api'; // Путь к файлу с axios

// const AddProduct = () => {
//   const [category, setCategory] = useState('');
//   const [title, setTitle] = useState('');
//   const [price, setPrice] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Отправляем запрос на MockAPI для добавления продукта
//       const response = await api.post('/items', {  // Используем /items как endpoint на MockAPI
//         category,
//         title,
//         price,
//         imageUrl
//       });

//       // Если запрос успешен, выводим сообщение
//       alert('Продукт добавлен успешно!');
//       // Очистка формы
//       setCategory('');
//       setTitle('');
//       setPrice('');
//       setImageUrl('');
//     } catch (error) {
//       // Если произошла ошибка
//       console.error('Ошибка при добавлении продукта:', error);
//       alert('Не удалось добавить продукт. Попробуйте еще раз.');
//     }
//   };

//   return (
//     <div>
//       <h2>Добавить новый продукт</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Категория:</label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Название:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Цена:</label>
//           <input
//             type="text"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Изображение (URL):</label>
//           <input
//             type="text"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//           />
//         </div>
//         <button type="submit">Добавить продукт</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
