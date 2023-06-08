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

const pageTotalCost = document.querySelector('.page__total-cost');
console.log(pageTotalCost);


const modalOpen = document.querySelector('.page__modal-open');
console.log(modalOpen);

const modal = document.querySelector('.modal');

const list = document.querySelector('.table__body');
console.log(list);

// unit_5_3 . Создайте функцию createRow, которая будет получать объект
// и на основе объекта формировать элемент <tr> с <td> внутри

const arrayGoods = [
  {
    'id': 253842678,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': `Смартфон Xiaomi 11T – это представитель флагманской линейки,
      выпущенной во второй половине 2021 года. И он полностью соответствует
      такому позиционированию, предоставляя своим обладателям возможность 
      пользоваться отличными камерами, ни в чем себя не ограничивать при запуске
      игр и других требовательных приложений.`,
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 296378448,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': `Внедорожник на дистанционном управлении. Скорость 25км/ч. 
      Возраст 7 - 14 лет`,
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 215796548,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': `Всего лишь один шаг сделает ваш телевизор умным, Быстрый
      и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный
      процессор Cortex-A53 с чипом Amlogic S905D`,
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 246258248,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': `Витая пара Proconnect 01-0043-3-25 является сетевым кабелем
      с 4 парами проводов типа UTP, в качестве проводника в которых используется
      алюминий, плакированный медью CCA. Такая неэкранированная витая пара с 
      одножильными проводами диаметром 0.50 мм широко применяется в процессе 
      сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание
      локальной сети в домашних условиях или на предприятии, объединить все
      необходимое вам оборудование в единую сеть.`,
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];
// создает td в th, куда рендерятся свойства объекта
const createRow = (obj) => {
  const tableRow = document.createElement('tr');
  tableRow.classList.add('table__row');
  tableRow.insertAdjacentHTML('afterbegin',
      `<td class ="table_id">${obj.id}</td>
    <td>${obj.title}</td>
    <td>${obj.category}</td>
    <td class="table__measure">${obj.units}</td>
    <td class="table__quantity">${obj.count}</td>
    <td class="table__price">$${obj.price}</td>
    <td class="table__total">$${obj.price * obj.count}</td>
    <td>
      <button class="table__picture" type="button"></button>
    </td>
    <td>
      <button class="table__edit" type="button"></button>
    </td>
    <td>
      <button class="table__delete" type="button"></button>
    </td>
    `,
  );
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

// показать общую сумму на таблице
const showSum = () => {
  pageTotalCost.textContent = '';
  const totalPrice = document.querySelectorAll('.table__total');

  const sum = [...totalPrice].reduce((total, amount) => {
    total += +amount.textContent.substring(1);
    return total;
  }, 0);

  pageTotalCost.textContent = `$ ${sum.toFixed(2)}`;
  return pageTotalCost.textContent;
};

// вызов функции отображение общей суммы
showSum();

// открытие модалки
modalOpen.addEventListener('click', () => {
  modal.classList.remove('modal_display-none');

  // вызов функции отображение общей суммы
  modalTotalCost.textContent = '';
  modalTotalCost.textContent = showSum();
});

// закрытие модалки на крестик и overlay
modal.addEventListener('click', e => {
  const target = e.target;
  if ((target === modal) ||
      (target.classList.contains('modal__body')) ||
      target.closest('.modal__close')) {
    modal.classList.add('modal_display-none');
    // сброс формы при выходе
    modalForm.reset();
    modalDiscountInput.setAttribute('disabled', '');
  }
});

// БД до удаления
console.log('БД до удаления: ', arrayGoods);

// удалить строки из верстки по событию
list.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.table__delete')) {
    target.closest('.table__row').remove();

    // удалить объект из БД arrayGoods по событию
    // 1. получаем все кнопки delete в NodeList и спредим их в массив
    const arr = [...document.querySelectorAll('.table__delete')];
    // 2. методом массива indexOf находим индекс кнопки, содержащей target
    // 3. методом splice удаляем из массива БД объект по индексу
    arrayGoods.splice(arr.indexOf('target'), 1);
    // 3.1. поменять общую сумму
    showSum();
    // 4. выводит в консоль БД
    console.log('БД после удаления: ', arrayGoods);
  }
});

// функционал работы с формой

// снимает disabled с input discount
modalCheckbox.addEventListener('click', e => {
  if (modalDiscountInput.hasAttribute('disabled')) {
    modalDiscountInput.removeAttribute('disabled');
  } else {
    // сброс введенного значения
    modalDiscountInput.value = '';
    modalDiscountInput.setAttribute('disabled', '');
  }
});

// добавление из формы в data
modalForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  renderGoods([Object.fromEntries(formData)]);

  // отображение корректной общей суммы в таблице
  showSum();
  modalForm.reset();
  modalDiscountInput.setAttribute('disabled', '');

  // рендер id
  const lastId = list.lastElementChild.firstElementChild;
  lastId.textContent = modalId.textContent.substring(4);

  // закрытие модалки
  modal.classList.add('modal_display-none');
});

// отображение корректной общей суммы в модалке
// при смене фокуса на price
modalForm.price.addEventListener('change', e => {
  const pageSum = +pageTotalCost.textContent.substring(1);
  const count = +modalForm.count.value;
  const price = +e.target.value;
  if ((modalForm.count.value !== '') && (modalDiscountInput.value !== '')) {
    modalTotalCost.textContent = '';
    const total = pageSum + count * price - (
      count * price * 0.01 * +modalDiscountInput.value);
    modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
  } else if (modalForm.count.value !== '') {
    modalTotalCost.textContent = '';
    const total = pageSum + count * price;
    modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
  }
});
// при смене фокуса на count
modalForm.count.addEventListener('change', e => {
  const pageSum = +pageTotalCost.textContent.substring(1);
  const price = +modalForm.price.value;
  const count = +e.target.value;
  if ((modalForm.price.value !== '') && (modalDiscountInput.value !== '')) {
    modalTotalCost.textContent = '';
    const total = pageSum + price * count - (
      price * count * 0.01 * +modalDiscountInput.value);
    modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
  } else if (modalForm.price.value !== '') {
    modalTotalCost.textContent = '';
    const total = pageSum + price * count;
    modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
  }
});


