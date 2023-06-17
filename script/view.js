import getElement from './getElement.js';

const {
  modalForm,
  modalDiscountInput,
  modalTotalCost,
  pageTotalCost,
} = getElement;

// показать общую сумму на таблице
export const showSum = () => {
  pageTotalCost.textContent = '';
  const totalPrice = document.querySelectorAll('.table__total');

  const sum = [...totalPrice].reduce((total, amount) => {
    total += +amount.textContent.substring(1);
    return total;
  }, 0);

  pageTotalCost.textContent = `$ ${sum.toFixed(2)}`;
  return pageTotalCost.textContent;
};
// отображение корректной общей суммы в модалке
// при смене фокуса на price
export const showModalSum = () => {
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
};