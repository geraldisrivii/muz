// // src/components/ProductForm
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createProduct, getProductById, updateProduct  } from '../../services/api';

// const ProductForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     price: '',
//     imageUrl: '',
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       const fetchProduct = async () => {
//         try {
//           const { data } = await getProductById(id);
//           setFormData({
//             title: data.title,
//             category: data.category,
//             price: data.price,
//             imageUrl: data.imageUrl,
//           });
//         } catch (error) {
//           console.error('Ошибка при получении продукта:', error);
//         }
//       };

//       fetchProduct();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await updateProduct(id, formData); // Если id существует, обновляем продукт
//       } else {
//         await createProduct(formData); // Если id нет, создаем новый продукт
//       }
//       navigate('/'); // Перенаправляем на страницу со списком продуктов
//     } catch (error) {
//       console.error('Ошибка при сохранении продукта:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>{id ? 'Редактировать продукт' : 'Добавить новый продукт'}</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Название:</label>
//           <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Категория:</label>
//           <input type="text" name="category" value={formData.category} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Цена:</label>
//           <input type="number" name="price" value={formData.price} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Изображение URL:</label>
//           <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
//         </div>
//         <button type="submit">{id ? 'Обновить' : 'Добавить'}</button>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;
