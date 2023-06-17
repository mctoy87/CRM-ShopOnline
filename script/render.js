import {createRow} from './createElements.js';



// 2. Создайте функцию renderGoods, принимает один параметр массив с объектами
// Функция renderGoods перебирает массив и вставляет строки, созданные
//  на основе createRow, в таблицу (советую использовать метод map)
export const renderGoods = (arr) => {
  // рендерит массив объектов, перебирает(map)
  // возвращает объекты после функции createRow
  const makeRaw = arr.map(item => createRow(item));
  // получаем tbody
  const table = document.querySelector('.table__body');
  // append в tbody
  table.append(...makeRaw);
};
