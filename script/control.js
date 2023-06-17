import {showSum} from './view.js';
import {renderGoods} from './render.js';
import getElement from './getElement.js';

const {
  modalId,
  modalForm,
  modalDiscountInput,
  modalTotalCost,
  modalOpen,
  modal,
  list,
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
  });
};

// добавление из формы в data
const addProduct = (arrayGoods) => {
  console.log('БД до добавления: ', arrayGoods);
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('formData: ', formData);
    console.log('Object.fromEntries(formData): ', Object.fromEntries(formData));
    arrayGoods.push(Object.fromEntries(formData));
    console.log('БД после добавления: ', arrayGoods)
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
};

// удалить из БД товар
const deleteProduct = (arrayGoods) => {
  // БД до удаления
  console.log('БД до удаления: ', arrayGoods);
  // удалить строки из верстки по событию
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__delete')) {
      // удалить объект из БД arrayGoods по событию
      // 1. получаем все кнопки delete в NodeList и спредим их в массив
      const arr = [...document.querySelectorAll('.table__delete')];
      // 2. методом массива indexOf находим индекс кнопки, содержащей target
      // 3. методом splice удаляем из массива БД объект по индексу
      const res = arr.indexOf(target);
      arrayGoods.splice(arr.indexOf(target), 1);
      // удалить из верстки 
      target.closest('.table__row').remove();
      // 3.1. поменять общую сумму
      showSum();
      // 4. выводит в консоль БД
      console.log('БД после удаления: ', arrayGoods);
    }
  });
};

export default {
  modalControl,
  addProduct,
  deleteProduct,
};
