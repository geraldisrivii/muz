"use client"
import React, { useContext } from 'react';
import { CartContext, useAppContext } from '../../widgets/context/ui/context';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

type CartItemProps = {};

const CartItem = ({}: CartItemProps) => {
  const { processedItems, onAddToCart, onRemoveItem } = useAppContext();
  const isAuth = useSelector(selectIsAuth);
  const router = useRouter();

  const handleBuyClick = () => {
    if (!isAuth) {
      router.push('/login');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="container">
      <div className="cart">
        {processedItems.length > 0 ? (
          <div className="cart-main">
            <div className="precart">
              <span>КОРЗИНА</span>
              <a onClick={() => onRemoveItem('all')}>Очистить всю корзину</a>
            </div>
            
            <div className="cart-content">
              <div className="items">
                {processedItems.map((obj) => (
                  <div className="cartItem" key={obj.id}>
                    <Link href={`/tovar/${encodeURIComponent(obj.title)}`}>
                      <div className="cartItemImg">
                        <img src={obj.imageUrl} alt={obj.title} width={50} height={50} />
                      </div>
                    </Link>
                    <div className="main">
                      <div className="descrip">
                        <div className="category">{obj.category}</div>
                        <div className="name">{obj.title}</div>
                      </div>
                      <div className="number">
                        <button
                          className="minus"
                          onClick={() => (obj.quantity > 1 ? onRemoveItem(obj.id) : onRemoveItem(obj.id))}
                        >
                          -
                        </button>
                        <span className="counter">{obj.quantity || 1}</span>
                        <button className="plus" onClick={() => onAddToCart(obj)}>
                          +
                        </button>
                      </div>
                      <div className="price">
                        {(obj.price * (obj.quantity || 1)).toLocaleString('ru-RU')} руб.
                      </div>
                      <button onClick={() => onRemoveItem(obj.id)} className="trashImg">
                        <img src="/products/TrashCan.svg" alt="Remove" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-block">
                <div className="total-menu">
                  <div className="main-total">
                    <div className="subtitle">
                      <span>ВАШ ЗАКАЗ</span>
                    </div>
                    <div className="basket-row-total">
                      <a>
                        {processedItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} товаров
                      </a>
                      <a>
                        {processedItems
                          .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
                          .toLocaleString('ru-RU')}{' '}
                        р.
                      </a>
                    </div>
                    <div className="basket-row-final">
                      <b>Итого</b>
                      <b>
                        {processedItems
                          .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
                          .toLocaleString('ru-RU')}{' '}
                        р.
                      </b>
                    </div>
                    <button className="buy" onClick={handleBuyClick}>
                      Купить
                    </button>
                  </div>
                </div>
                <div className="aftertitle">
                  <span>Только самовывоз!</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="cartEmpty">
            <div className="precart2">
              <span>КОРЗИНА</span>
            </div>
            <div className="center">
              <h1>В корзине пока нет товаров</h1>
              <p>Добавляйте понравившиеся товары и наслаждайтесь покупками️</p>
              <Link href="/catalog">
                <button className="toCatalog">
                  <img src="/pic/toCatalog.svg" alt="To Catalog" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;