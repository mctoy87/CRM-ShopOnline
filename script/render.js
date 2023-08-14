import {createRow} from './createElements.js';
import getElement from './getElement.js';
const {
  modalForm,
} = getElement;

const URL = 'https://guttural-flax-seatbelt.glitch.me/api/goods';

export const httpRequest = (url, {
  method = 'GET',
  callback,
  body = {},
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        callback(new Error(xhr.status), xhr.response);
        return;
      }

      const data = JSON.parse(xhr.response);
      if (callback) callback(null, data);
    });

    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.response);
    });

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(new Error(err));
  }
};

// 2. Создайте функцию renderGoods, принимает один параметр массив с объектами
// Функция renderGoods перебирает массив и вставляет строки, созданные
//  на основе createRow, в таблицу (советую использовать метод map)
export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  // рендерит массив объектов, перебирает(map)
  // возвращает объекты после функции createRow
  const makeRaw = data.map(item => createRow(item));
  // получаем tbody
  const table = document.querySelector('.table__body');
  // append в tbody
  table.append(...makeRaw);
};

export const getRenderGoods = () => {
  httpRequest(URL, {
    meyhod: 'get',
    callback: renderGoods,
  });
};

getRenderGoods();

