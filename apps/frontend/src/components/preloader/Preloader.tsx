// import { useEffect, useRef } from 'react';

// function Preloader() {
//   // Создаем ref для хранения интервала
//   const fadeOutInterval = useRef(null);

//   // Функция для скрытия прелоадера
//   const hidePreloader = () => {
//     clearTimeout(fadeOutInterval.current);
//     document.body.style.overflow = '';
//     const preloader = document.getElementById('preloader');
//     if (!preloader) return; // Если элемента нет, ничего не делаем

//     fadeOutInterval.current = setInterval(() => {
//       const opacity = window.getComputedStyle(preloader).opacity;
//       if (opacity > 0) {
//         preloader.style.opacity = parseFloat(opacity) - 0.05;
//       } else {
//         clearInterval(fadeOutInterval.current);
//         preloader.remove();
//       }
//     }, 15);
//   };

//   // Массив для отслеживания загрузки элементов
//   const loadingArray = useRef(new Array());

//   // Проверка готовности страницы
//   const pageReady = () => {
//     const conditionDom = loadingArray.current.includes('dom');
//     const conditionShop = document.querySelectorAll('-store-grid-cont').length ?
//       loadingArray.current.includes('store') :
//       true;
//     const conditionZero = document.querySelectorAll('.t396__artboard').length ?
//       loadingArray.current.includes('zero') :
//       true;

//     if (conditionDom && conditionShop && conditionZero) {
//       hidePreloader();
//     }
//   };

//   // Эффекты для добавления событий и проверки состояния
//   useEffect(() => {
//     // Добавляем событие DOMContentLoaded
//     const domLoadHandler = () => {
//       loadingArray.current.push('dom');
//       pageReady();
//     };
//     document.addEventListener('DOMContentLoaded', domLoadHandler);
//     return () => document.removeEventListener('DOMContentLoaded', domLoadHandler);
//   }, []);

//   useEffect(() => {
//     // Обработчик события tStoreRendered
//     const storeRenderedHandler = () => {
//       loadingArray.current.push('store');
//       pageReady();
//     };
//     document.querySelectorAll('-store-grid-cont').forEach(grid => grid.addEventListener('tStoreRendered', storeRenderedHandler));
//     return () => {
//       document.querySelectorAll('-store-grid-cont').forEach(grid => grid.removeEventListener('tStoreRendered', storeRenderedHandler));
//     };
//   }, []);

//   useEffect(() => {
//     // Обработчик события artBoardRendered
//     const artBoardRenderedHandler = () => {
//       loadingArray.current.push('zero');
//       pageReady();
//     };
//     document.querySelectorAll('.t396__artboard').forEach(board => board.addEventListener('artBoardRendered', artBoardRenderedHandler));
//     return () => {
//       document.querySelectorAll('.t396__artboard').forEach(board => board.removeEventListener('artBoardRendered', artBoardRenderedHandler));
//     };
//   }, []);

//   return (
//     <div id="loading-screen"></div>
//   );
// }

// export default Preloader;
