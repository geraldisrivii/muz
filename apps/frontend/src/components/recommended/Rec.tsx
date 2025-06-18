import Link from "next/link";

import "./rec.css";
import React from "react";

const Rec = () => {
  return (
    <>
      <section className="Recommendation">
        <div className="container">
          <span>Популярные категории</span>
          <Link href="/catalog">
            <ul className="rec-categories">
              <li>
                <button>
                  <img src="/pic/AcGuitars.svg" alt="AcGuitars" />
                </button>
              </li>
              <li>
                <button>
                  <img src="/pic/ElectroGuitars.svg" alt="ElectroGuitars" />
                </button>
              </li>
              <li>
                <button>
                  <img src="/pic/Drums.svg" alt="Drums" />
                </button>
              </li>
            </ul>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Rec;
