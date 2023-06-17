  // получить элементы со страницы

  const modalId = document.querySelector('.modal__id');
  const modalForm = document.querySelector('.modal__form');
  const modalCheckbox = document.querySelector('.form__checkbox-label');
  const modalDiscountInput = document.querySelector('.form__input_disabled');
  const modalTotalCost = document.querySelector('.form__total-cost');
  const pageTotalCost = document.querySelector('.page__total-cost');
  const modalOpen = document.querySelector('.page__modal-open');
  const modal = document.querySelector('.modal');
  const list = document.querySelector('.table__body');

export default {
  modalId,
  modalForm,
  modalCheckbox,
  modalDiscountInput,
  modalTotalCost,
  pageTotalCost,
  modalOpen,
  modal,
  list,
}
