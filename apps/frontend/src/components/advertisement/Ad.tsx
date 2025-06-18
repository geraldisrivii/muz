import './ad.css';
import React from 'react';

const Ad = () => {
  return (
    <section className="advert">
      <div className="container">
        {/* <span>Наши бренды</span>
                <img src='img/pic/brands.svg' alt="banner"></img>  */}

        <img src="/pic/ad-takamine.svg" alt="banner"></img>
      </div>
    </section>
  );
};

export default Ad;
