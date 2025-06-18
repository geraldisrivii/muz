"use client";

import { logout, selectIsAuth } from "#/redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { fetchAuthMe } from "#/redux/slices/auth";

import "./header.css";
import Link from "next/link";

export function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <>
      <header className="header">
        <div className="container2">
          <div className="header_row">
            <div className="header__logo">
            <img src="/logo/NewLogo4.png" alt="Logo" />
              <Link href="/">
                {" "}
                <span>
                  <a>AC</a>CORD
                </span>
              </Link>
            </div>

            <nav className="header_nav">
              <ul>
                <li>
                  <Link href="/new">НОВИНКИ</Link>
                </li>
                <li>
                  <Link href="/catalog">КАТАЛОГ</Link>
                </li>
                <li>
                  <Link href="/aboutUs">МАГАЗИНЫ</Link>
                </li>
              </ul>
            </nav>

            <div className="header_nav_right">
              <ul>
                {isAuth ? (
                  <>
                  <Link href="/favourite">
                      <button className="trash_can">
                        Избранное
                        <img src="/icons/favourite.svg" alt="can" />
                      </button>
                    </Link>

                    <Link href="/cart">
                      <button className="trash_can">
                        Корзина
                        <img src="/icons/cartIcon.png" alt="can" />
                      </button>
                    </Link>
                    <div className="user_profile">
                      <button onClick={onClickLogout}>
                        <Link href="/">
                          <button>Выйти</button>
                        </Link>
                      </button>
                      <Link href="/profile">
                        <img src="/icons/profile.png" alt="can" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                  <Link href="/favourite">
                      <button className="trash_can">
                        Избранное
                        <img src="/icons/favourite.svg" alt="can" />
                      </button>
                    </Link>
                    <button className="trash_can">
                      <Link href="/cart">Корзина </Link>
                      <img src="/icons/cartIcon.png" alt="can" />
                    </button>

                    <div className="user_profile">
                      <button>
                        <Link href="/login">Войти</Link>
                      </button>
                      <img src="/icons/profile.png" alt="can" />
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
