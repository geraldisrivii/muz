
import React from 'react';

import './banner.css';
import Link from 'next/link';

export const Banner = () => {
  return (
    <section className="banner">
      <div className="container">
        <div className="start-buy">
          <div className="banners">
            <img src='/pic/banner-unbutton.svg'></img>
               <button className='btn-start'>
                <Link href='/catalog' >
                   <img src='/pic/start-buy.svg' alt="banner" />
                   </Link>
                </button>
            {/* <img src="img/pic/rasprodazha1.svg" alt="banner" /> */}
            {/* <img src='img/pic/ad-takamine.svg' alt="banner" /> */}
          </div>
       
        </div>
      </div>
    </section>
  );
};
