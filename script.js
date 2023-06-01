'use strict';

const modalTitle = document.querySelector('.modal__title');
console.log(modalTitle);

const modalId = document.querySelector('.modal__id');
console.log(modalId);

const modalClose = document.querySelector('.modal__close');
console.log(modalClose);

const modalForm = document.querySelector('.modal__form');
console.log(modalForm);

const modalCheckbox = document.querySelector('.form__checkbox-label');
console.log(modalCheckbox);

const modalDiscountInput = document.querySelector('.form__input_disabled');
console.log(modalDiscountInput);

const modalTotalCost = document.querySelector('.form__total-cost');
console.log(modalTotalCost);

const modalOpen = document.querySelector('.page__modal-open');
console.log(modalOpen);

const modal = document.querySelector('.modal');

// unit_5_3 . Создайте функцию createRow, которая будет получать объект
// и на основе объекта формировать элемент <tr> с <td> внутри

const arrayGoods = [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 215796548,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 246258248,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "v",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
]
// создает td в th, куда рендерятся свойства объекта
const createRow = (obj) => {
  const tableRow = document.createElement('tr');
  tableRow.classList.add('table__row')
  tableRow.insertAdjacentHTML ('afterbegin', 
    `<td>${obj.id}</td>
    <td>${obj.title}</td>
    <td>${obj.category}</td>
    <td class="table__measure">${obj.units}</td>
    <td class="table__quantity">${obj.count}</td>
    <td class="table__price">${obj.price}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    `
  )
  return tableRow;
};

// 2. Создайте функцию renderGoods, принимает один параметр массив с объектами
// Функция renderGoods перебирает массив и вставляет строки, созданные на основе 
// createRow, в таблицу (советую использовать метод map)
const renderGoods = (arr) => {
// рендерит массив объектов, перебирает(map) 
// возвращает объекты после функции createRow
  const makeRaw = arr.map(item => createRow(item));
  // получаем tbody
  const table = document.querySelector('.table__body');
  // append в tbody 
  table.append(...makeRaw);
};
// вызов функции
renderGoods(arrayGoods);


// открытие модалки
modalOpen.addEventListener('click', () => {
  modal.classList.remove('modal_display-none');
});

// закрытие модалки на крестик
modalClose.addEventListener('click', ()=> {
  modal.classList.add('modal_display-none');
});
// заблокирует всплытие на события формы
modalForm.addEventListener('click', event => {
  event.stopPropagation();
});
// закрытие модалки на overlay
modal.addEventListener('click', ()=> {
  modal.classList.add('modal_display-none');
});
