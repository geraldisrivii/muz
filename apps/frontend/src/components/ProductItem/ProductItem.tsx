// // src/components/ProductItem
// import React from 'react';
// import { Link } from 'react-router-dom';

// const ProductItem = ({ product, onDelete }) => {
//   return (
//     <li>
//       <h3>{product.title}</h3>
//       <img src={`http://localhost:4444${product.imageUrl}`} alt={product.title} width="100" />
//       <p>{product.category}</p>
//       <p>{product.price}</p>
//       <Link to={`/products/${product._id}/edit`}>Редактировать</Link>
//       <button onClick={() => onDelete(product._id)}>Удалить</button>
//     </li>
//   );
// };

// export default ProductItem;
