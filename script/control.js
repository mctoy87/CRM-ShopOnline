import {showSum} from './view.js';
import {renderGoods} from './render.js';
import {getRenderGoods} from './render.js';
import {fetchRequest} from './render.js';
import getElement from './getElement.js';
import {URL} from './render.js';

const {
  modalForm,
  modalDiscountInput,
  modalTotalCost,
  modalOpen,
  modal,
  list,
  modalError,
} = getElement;

const modalControl = () => {
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
    // закрытие окна с ошибкой "Что-то пошло не так"
    if ((target === modal) ||
        target.closest('.modal__error-close')) {
      // скрыть окошко об ошибке с сервера
      modalError.classList.add('visually-hidden');
    }
  });
};

// добавление из формы в data
const addProduct = (arrayGoods) => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    // запрос к серверу
    fetchRequest(URL, {
      method: 'POST',
      body: {
        title: modalForm.title.value,
        description: modalForm.description.value,
        price: modalForm.price.value,
        count: modalForm.count.value,
        units: modalForm.units.value,
        category: modalForm.category.value,
      },
      callback(err, data) {
        if (err || data === null) {
          console.warn(err, data);
          const modalDisplay = document.querySelector('.modal');
          modalDisplay.classList.remove('modal_display-none');
          const modalError = document.querySelector('.modal__error');
          modalError.classList.remove('visually-hidden');
          return;
        }
        console.log(`Заявка успешно отправлена. Номер заявки ${data.id}`);
        getRenderGoods();
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const formData = new FormData(e.target);
    arrayGoods.push(Object.fromEntries(formData));

    renderGoods([Object.fromEntries(formData)]);
    // отображение корректной общей суммы в таблице
    showSum();
    modalForm.reset();
    modalDiscountInput.setAttribute('disabled', '');

    // закрытие модалки
    modal.classList.add('modal_display-none');
  });
};

// удалить из БД товар
const deleteProduct = (arrayGoods) => {
  // удалить строки из верстки по событию
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__delete')) {
      // удалить объект из БД arrayGoods по событию
      // 1. получаем все кнопки delete в NodeList и спредим их в массив
      const arr = [...document.querySelectorAll('.table__delete')];
      // 2. методом массива indexOf находим индекс кнопки, содержащей target
      // 3. методом splice удаляем из массива БД объект по индексу

      arrayGoods.splice(arr.indexOf(target), 1);
      // удалить из верстки
      target.closest('.table__row').remove();
      // 3.1. поменять общую сумму
      showSum();
      // 4. выводит в консоль БД
      console.log('БД после удаления: ', arrayGoods);
    }
    // открыть через кнопку добавления картинки
    if (target.closest('.table__picture')) {
      const topPic = (screen.height - 600) / 2;
      const widthPic = (screen.width - 600) / 2;
      window.open(target.dataset.pic, '', `
        width=600, height=600, top=${topPic}, left=${widthPic}`);
    }
  });
};

export default {
  modalControl,
  addProduct,
  deleteProduct,
};
