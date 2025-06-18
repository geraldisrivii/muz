import './aboutUs.css';


import React from 'react';

const AboutUs = () => {
  return (
    <>
      

      <section className="about">
        <div className="container">
          <div className="span">
            <span>Наше расположение</span>
          </div>
          <div className="map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A038f3149c35e15480a9716cc31b5cdb1e4102f7a8d0304706309a1918b4f316b&amp;source=constructor"
              width="1440"
              height="600"
            ></iframe>
          </div>
          <div className="aftermap">
            <p>Полный перечень наших магазинов находится в данном разделе.</p>
            <p>
              Для электронной почты наша компания использует доменное имя guitarhome.ru. Ссылки на
              любые другие домены говорят о незаконном использовании товарного знака GuitarHome.
            </p>
            <div className="last">
              <p>
                Если предлагают связаться с нами по email на другом домене – просим Вас сообщать нам
                о таких случаях. Товары, проданные таким образом могут быть ввезены в Россию
                неофициально и являться подделками, без гарантии и сервисной поддержки.
              </p>
            </div>
          </div>
          <span className="contact">Связаться с нами</span>
          <div className="messagers2">
            <a href="https://vk.com/lix1s" target="_blank" className="footer__vk">
              <img src="img/icons/VKicon.svg" alt="VK" />
            </a>
            <a href="https://t.me/Lix1sBtw" target="_blank" className="footer__vk">
              <img src="img/icons/TGicon.svg" alt="TG" />
            </a>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default AboutUs;
