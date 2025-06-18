import Link from 'next/link';
import './checkout.css';



const CheckOut = () => {
  return (
    <>
      <section className="checkout">
        <div className="bye">
          <div className="text1">
            <p>Спасибо за покупку!</p>
            <p>Мы ждем вас!</p>
          </div>
          <Link href="/" className="back">
            Вернуться на сайт
          </Link>
        </div>
      </section>

    </>
  );
};

export default CheckOut;
