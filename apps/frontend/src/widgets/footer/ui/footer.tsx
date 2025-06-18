import "./footer.css";
import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__logo">
              <img src="/icons/LogoFooter.svg" alt="Akcord Logo" />
            </div>
            <div className="footer__links">
              <div className="footer__section">
                <h4>Сотрудничество</h4>
                <ul>
                  <li>
                    <a href="#">Юридическим лицам</a>
                  </li>
                  <li>
                    <a href="#">Поставщикам</a>
                  </li>
                  <li>
                    <a href="#">Дилерам</a>
                  </li>
                  <li>
                    <a href="#">Арендодателям</a>
                  </li>
                </ul>
              </div>
              <div className="footer__section">
                <h4>С нами выгодно</h4>
                <ul>
                  <li>
                    <a href="#">Акции и скидки</a>
                  </li>
                  <li>
                    <a href="#">Рассрочка</a>
                  </li>
                  <li>
                    <a href="#">Программа лояльности</a>
                  </li>
                  <li>
                    <a href="#">Подарочные карты</a>
                  </li>
                </ul>
              </div>
              <div className="footer__section">
                <h4>Покупателям</h4>
                <ul>
                  <li>
                    <a href="#">Доставка и оплата</a>
                  </li>
                  <li>
                    <a href="#">Горячая линия</a>
                  </li>
                  <li>
                    <a href="#">Гарантии</a>
                  </li>
                  <li>
                    <a href="#">Обмен и возврат</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__social">
              <h4>Наши социальные сети</h4>
              <div className="messagers">
                <a
                  href="https://vk.com/lix1s"
                  target="_blank"
                  className="footer__vk"
                >
                  <img src="/icons/VKicon.svg" alt="VK" />
                </a>
                <a
                  href="https://t.me/Lix1sBtw"
                  target="_blank"
                  className="footer__vk"
                >
                  <img src="/icons/TGicon.svg" alt="TG" />
                </a>
              </div>
              <a href="tel:+79605732352" className="footer__phone">
                +7 960 517 32 52
              </a>
              <div className="footer__bottom">
                <p>
                  © 2024–2025 «Аккорд» — музыкальные инструменты,
                  интернет-магазин. Все права защищены.
                </p>
                <p>
                  Копирование материалов с сайта без ссылки на этот ресурс
                  запрещено.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
