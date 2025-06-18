"use client"
import './categories.css';

import { Component } from 'react';
import React, { useContext, useState } from 'react';
import { CartContext, useAppContext } from '../../widgets/context/ui/context';
import './categories.css';
import axios from 'axios';



const Categories = () => {
  const { activeCategory, setActiveCategory } = useAppContext();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <div className="container">
        <div className="catspan">
          <span>Категории</span>
        </div>
        <div className="categories">
          <button
            onClick={() => handleCategoryClick('')}
            className={activeCategory === '' ? 'active' : ''}
          >
            Все
          </button>

          <button
            onClick={() => handleCategoryClick('Акустическая гитара')}
            className={activeCategory === 'Акустическая гитара' ? 'active' : ''}
          >
            Акустические гитары
          </button>

          <button
            onClick={() => handleCategoryClick('Электрогитара')}
            className={activeCategory === 'Электрогитара' ? 'active' : ''}
          >
            Электрогитары
          </button>
          <button
            onClick={() => handleCategoryClick('Классическая гитара')}
            className={activeCategory === 'Классическая гитара' ? 'active' : ''}
          >
            Классические гитары
          </button>
          <button
            onClick={() => handleCategoryClick('Усилители для гитар')}
            className={activeCategory === 'Усилители для гитар' ? 'active' : ''}
          >
            Усилители для гитар
          </button>
          <button
            onClick={() => handleCategoryClick('Цифровое пианино')}
            className={activeCategory === 'Цифровое пианино' ? 'active' : ''}
          >
            Цифровое пианино
          </button>
          <button
            onClick={() => handleCategoryClick('Барабаны')}
            className={activeCategory === 'Барабаны' ? 'active' : ''}
          >
            Барабаны
          </button>
        </div>
      </div>
    </>
  );
};

export default Categories;
