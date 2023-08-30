import {createRow} from './createElements.js';
import {showSum} from './view.js';

export const URL = 'https://guttural-flax-seatbelt.glitch.me/api/goods';

// preloader

const showLoader = () => {
  // document.body.classList.add('loaded_hiding');
  // для скелетной загрузки
  const page = document.querySelector('.page');
  page.classList.add('page-hidden');
  console.log('Лоадер появился');
};

const hideLoader = () => {
  // для скелетной загрузки
  const skeleton = document.querySelector('.skeleton');
  skeleton.classList.add('skeleton-hidden');
  const page = document.querySelector('.page');
  page.classList.remove('page-hidden');
  console.log('Убрали лоадер');

  /* для прелоадера
  document.body.classList.add('loaded');
  document.body.classList.remove('loaded_hiding');
  */
};


// здесь для примера XML запрос, но приоритетней fetch
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

// fetch -запросы к серверу
export const fetchRequest = async (url, {
  // параметры объекта(не нужно отправлять body даже если пустой как в XML)
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    // прогружаем лоадер
    showLoader();
    // внутри try выполняем запрос по options
    // method - обязательный, остальные опциональные
    const options = {
      method,
    };
    // проверяем наличие опциональных параметров
    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;
    // выполняем запрос, передаем url и опции
    const response = await fetch(url, options);
    // проверяем  если код HTTP-статуса в диапазоне 200-299.

    if (response.ok) {
      // получаем из него данные
      const data = await response.json();
      // убираем лоадер
      hideLoader();
      // вызываем callback проверяя существует ли он
      if (callback) return callback(null, data);
      return;
    }
    // если что-то пошло не так
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    // убираем лоадер
    hideLoader();
    return callback(err);
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
  // затираем то что было в таблице
  table.textContent = '';
  // append в tbody
  table.append(...makeRaw);

  // вызов функции отображение общей суммы
  showSum();

  // убираем лоадер
  hideLoader();
};

export const getRenderGoods = async () => {
  await fetchRequest(URL, {
    method: 'get',
    callback: renderGoods,
  });
};


