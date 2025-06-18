"use client"
import './cart.css';

import CartItem from '../cartItem/CartItem';
import React, { useContext } from 'react';
import { CartContext } from '../../widgets/context/ui/context';


const Cart = () => {
  const data = useContext(CartContext);
  const cartdata = useContext(CartContext);

  console.log('data', data);

  return (
    <>
      
      <CartItem />

      
    </>
  );
};

export default Cart;
