import "./ex-header.css";

import React from "react";
import { GuitarSearch } from "#/features/guitar-search";

export const ExHeader = () => {
  return (
    <section className="ex_header">
      <div className="container">
        <div className="ex_content">
          <div className="ex_instruments">
            <div className="tuner">
              <img src="/icons/metronom.png" alt="Logo" />
              <span>Метроном</span>
            </div>

            <div className="metronom">
              <img src="/icons/tuner.png" alt="Logo" />
              <span>Тюнер</span>
            </div>
          </div>
          <GuitarSearch />
        </div>
      </div>
    </section>
  );
};
